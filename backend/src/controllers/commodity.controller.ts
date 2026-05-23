import { Request, Response } from 'express';
import CommodityRisk, { ICommodityRisk } from '../models/CommodityRisk';
import {
  calculateHedgingStrategy,
  calculateForwardPrice,
  calculateOptionsPremium,
  calculateRiskExposure,
} from '../services/hedging.service';

// ─── Get All Commodity Prices & Trends ───────────────────────────────────────
export const getCommodityPrices = async (req: any, res: Response) => {
  try {
    const { category, sortBy = 'name', sortOrder = 'asc' } = req.query;

    const filter: Record<string, any> = {};
    if (category) filter.category = category;

    const sort: Record<string, 1 | -1> = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };
    const commodities = await CommodityRisk.find(filter).sort(sort);

    // Enrich with computed trend data
    const enriched = commodities.map((c) => {
      const priceChange = c.currentPrice - c.previousPrice;
      const changePercent = c.previousPrice > 0
        ? Math.round((priceChange / c.previousPrice) * 10000) / 100
        : 0;

      return {
        _id: c._id,
        name: c.name,
        category: c.category,
        currentPrice: c.currentPrice,
        previousPrice: c.previousPrice,
        priceChange,
        changePercent,
        trendDirection: c.trendDirection,
        volatilityPercent: c.volatilityPercent,
        riskScore: c.riskScore,
        hedgingRecommendation: c.hedgingRecommendation,
        lastUpdated: c.lastUpdated,
      };
    });

    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Single Commodity Detail with Price History ──────────────────────────
export const getCommodityById = async (req: any, res: Response) => {
  try {
    const commodity = await CommodityRisk.findById(req.params.id);
    if (!commodity) {
      return res.status(404).json({ success: false, message: 'Commodity not found' });
    }
    res.json({ success: true, data: commodity });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Hedging Recommendations ─────────────────────────────────────────────────
export const getHedgingRecommendations = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { volume = 1000, horizonDays = 90 } = req.query;

    const commodity = await CommodityRisk.findById(id);
    if (!commodity) {
      return res.status(404).json({ success: false, message: 'Commodity not found' });
    }

    const strategy = calculateHedgingStrategy(commodity, Number(volume), Number(horizonDays));

    const forwardPrice = calculateForwardPrice(
      commodity.currentPrice,
      Number(horizonDays),
      commodity.volatilityPercent
    );

    const optionsPremium = calculateOptionsPremium(
      commodity.currentPrice,
      commodity.currentPrice * 1.05, // strike 5% above current
      Number(horizonDays),
      commodity.volatilityPercent
    );

    const exposure = calculateRiskExposure(
      commodity.currentPrice,
      Number(volume),
      commodity.volatilityPercent,
      Number(horizonDays)
    );

    res.json({
      success: true,
      data: {
        commodityId: commodity._id,
        commodityName: commodity.name,
        currentPrice: commodity.currentPrice,
        volume: Number(volume),
        horizonDays: Number(horizonDays),
        strategy,
        forwardContract: {
          forwardPrice: Math.round(forwardPrice * 100) / 100,
          totalCost: Math.round(forwardPrice * Number(volume) * 100) / 100,
          savingsVsSpot: Math.round((commodity.currentPrice - forwardPrice) * Number(volume) * 100) / 100,
        },
        optionsHedge: {
          premium: Math.round(optionsPremium * 100) / 100,
          totalPremiumCost: Math.round(optionsPremium * Number(volume) * 100) / 100,
          strikePrice: Math.round(commodity.currentPrice * 1.05 * 100) / 100,
        },
        riskExposure: exposure,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Price Forecast ──────────────────────────────────────────────────────────
export const getPriceForecast = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { days = 30 } = req.query;

    const commodity = await CommodityRisk.findById(id);
    if (!commodity) {
      return res.status(404).json({ success: false, message: 'Commodity not found' });
    }

    const forecastDays = Math.min(365, Math.max(7, Number(days)));

    // Generate Monte Carlo–style forecast bands using historical volatility
    const dailyVol = commodity.volatilityPercent / 100 / Math.sqrt(252); // annualised → daily
    const drift = commodity.trendDirection === 'up' ? 0.0002 :
                  commodity.trendDirection === 'down' ? -0.0002 : 0;

    const forecasts: { date: string; predicted: number; lower: number; upper: number }[] = [];

    let basePrice = commodity.currentPrice;
    for (let d = 1; d <= forecastDays; d++) {
      const t = d;
      const expectedMove = basePrice * (drift * t);
      const volatilityBand = basePrice * dailyVol * Math.sqrt(t) * 1.96; // 95% CI

      const predicted = Math.round((basePrice + expectedMove) * 100) / 100;
      const lower = Math.round((predicted - volatilityBand) * 100) / 100;
      const upper = Math.round((predicted + volatilityBand) * 100) / 100;

      const forecastDate = new Date();
      forecastDate.setDate(forecastDate.getDate() + d);

      forecasts.push({
        date: forecastDate.toISOString().split('T')[0],
        predicted,
        lower: Math.max(0, lower),
        upper,
      });
    }

    const lastForecast = forecasts[forecasts.length - 1];
    const priceChangePercent = Math.round(
      ((lastForecast.predicted - commodity.currentPrice) / commodity.currentPrice) * 10000
    ) / 100;

    res.json({
      success: true,
      data: {
        commodityId: commodity._id,
        commodityName: commodity.name,
        currentPrice: commodity.currentPrice,
        forecastDays,
        model: 'geometric_brownian_motion',
        confidence: '95%',
        summary: {
          predictedEndPrice: lastForecast.predicted,
          priceChangePercent,
          rangeLow: lastForecast.lower,
          rangeHigh: lastForecast.upper,
          trend: commodity.trendDirection,
        },
        forecasts,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Risk Analytics Dashboard ────────────────────────────────────────────────
export const getRiskAnalytics = async (req: any, res: Response) => {
  try {
    const commodities = await CommodityRisk.find().sort({ riskScore: -1 });

    const totalCommodities = commodities.length;
    const avgRiskScore = totalCommodities > 0
      ? Math.round(commodities.reduce((sum, c) => sum + c.riskScore, 0) / totalCommodities)
      : 0;

    const riskDistribution = {
      critical: commodities.filter((c) => c.riskScore > 75).length,
      high: commodities.filter((c) => c.riskScore > 50 && c.riskScore <= 75).length,
      medium: commodities.filter((c) => c.riskScore > 25 && c.riskScore <= 50).length,
      low: commodities.filter((c) => c.riskScore <= 25).length,
    };

    const trendBreakdown = {
      up: commodities.filter((c) => c.trendDirection === 'up').length,
      down: commodities.filter((c) => c.trendDirection === 'down').length,
      stable: commodities.filter((c) => c.trendDirection === 'stable').length,
    };

    // Category-level aggregation
    const categoryRisks = await CommodityRisk.aggregate([
      {
        $group: {
          _id: '$category',
          avgRiskScore: { $avg: '$riskScore' },
          avgVolatility: { $avg: '$volatilityPercent' },
          count: { $sum: 1 },
          maxRiskScore: { $max: '$riskScore' },
        },
      },
      { $sort: { avgRiskScore: -1 } },
    ]);

    // Top risk commodities
    const topRisks = commodities.slice(0, 5).map((c) => ({
      _id: c._id,
      name: c.name,
      category: c.category,
      riskScore: c.riskScore,
      volatilityPercent: c.volatilityPercent,
      trendDirection: c.trendDirection,
      hedgingRecommendation: c.hedgingRecommendation,
    }));

    res.json({
      success: true,
      data: {
        summary: {
          totalCommodities,
          avgRiskScore,
          riskDistribution,
          trendBreakdown,
        },
        categoryRisks,
        topRisks,
        generatedAt: new Date(),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

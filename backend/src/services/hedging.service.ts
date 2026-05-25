export class HedgingService {
  async calculateCommodityHedgingStrategy(commodityId: string) {
    return {
      recommendation: "Forward Contract",
      coverageRatio: 0.6,
      estimatedSavings: 150000,
      riskReduction: 0.8
    };
  }

  async getForwardContractPricing(commodityType: string, volume: number, deliveryDate: Date) {
    return {
      spotPrice: 100,
      forwardPrice: 105,
      premium: 5,
      currency: "USD"
    };
  }

  async getOptionsPricingMock(commodityType: string, strikePrice: number, expiryDate: Date) {
    return {
      callPremium: 2.5,
      putPremium: 2.8,
      impliedVolatility: 0.15
    };
  }

  async calculateRiskExposure(portfolioId: string) {
    return {
      valueAtRisk: 500000,
      confidenceLevel: 0.95,
      timeHorizon: "30 days"
    };
  }
}

export const hedgingService = new HedgingService();

export const calculateHedgingStrategy = (commodity: any, volume: number, horizonDays: number) => {
  let recommendation = "Hold / Spot Purchase";
  let targetCoverage = 0.0;
  let reason = "Low volatility and stable trend.";

  if (commodity.riskScore > 75) {
    recommendation = "Full Options Hedge (Put/Call)";
    targetCoverage = 0.9;
    reason = "Critical risk score. Highly volatile.";
  } else if (commodity.riskScore > 50) {
    recommendation = "Layered Forward Contracts";
    targetCoverage = 0.7;
    reason = "High risk score. Rising price trend.";
  } else if (commodity.riskScore > 25) {
    recommendation = "Partial Forward Contract";
    targetCoverage = 0.4;
    reason = "Moderate risk. Balanced market outlook.";
  }

  return {
    recommendation,
    targetCoverage,
    reason,
    estimatedSavings: Math.round(commodity.currentPrice * volume * 0.03),
    suggestedExecutionWindow: `${Math.round(horizonDays * 0.1)} to ${Math.round(horizonDays * 0.3)} days`,
  };
};

export const calculateForwardPrice = (currentPrice: number, horizonDays: number, volatilityPercent: number) => {
  const riskFreeRate = 0.05;
  const time = horizonDays / 365;
  const volatilityFactor = (volatilityPercent / 100) * 0.1;
  return currentPrice * Math.exp((riskFreeRate + volatilityFactor) * time);
};

export const calculateOptionsPremium = (currentPrice: number, strikePrice: number, horizonDays: number, volatilityPercent: number) => {
  const time = horizonDays / 365;
  const vol = volatilityPercent / 100;
  const intrinsicValue = Math.max(0, strikePrice - currentPrice);
  const timeValue = currentPrice * vol * Math.sqrt(time) * 0.4;
  return intrinsicValue + timeValue;
};

export const calculateRiskExposure = (currentPrice: number, volume: number, volatilityPercent: number, horizonDays: number) => {
  const totalValue = currentPrice * volume;
  const vol = volatilityPercent / 100;
  const time = horizonDays / 365;
  const zScore = 1.645;
  const valueAtRisk = totalValue * vol * Math.sqrt(time) * zScore;
  
  return {
    totalValue,
    valueAtRisk: Math.round(valueAtRisk * 100) / 100,
    confidenceLevel: "95%",
    varPercent: Math.round((valueAtRisk / totalValue) * 10000) / 100,
  };
};

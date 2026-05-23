import { useState, useEffect } from 'react';

export const useCommodity = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setPrices([
        { symbol: 'STEEL_HR', current: 58500, trend: 'up', changePercent: 1.2 },
        { symbol: 'COPPER_LME', current: 742000, trend: 'down', changePercent: -0.5 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { prices, loading };
};

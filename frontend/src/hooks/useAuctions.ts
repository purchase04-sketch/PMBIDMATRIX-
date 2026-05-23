import { useState, useEffect } from 'react';

export const useAuctions = () => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setAuctions([
        { id: 'AUC-001', title: 'Steel Coils', status: 'Active', bids: 24, currentLowest: 56000 },
        { id: 'AUC-002', title: 'IT Hardware', status: 'Scheduled', bids: 0, currentLowest: null },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { auctions, loading };
};

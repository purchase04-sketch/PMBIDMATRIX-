import { useState, useEffect } from 'react';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching data
    setTimeout(() => {
      setSuppliers([
        { id: 'SUP-001', name: 'Tata Steel', category: 'Metals', risk: 'Low', rating: 4.8 },
        { id: 'SUP-002', name: 'Asian Paints', category: 'Chemicals', risk: 'Low', rating: 4.7 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { suppliers, loading };
};

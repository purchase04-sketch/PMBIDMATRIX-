import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface KPICardProps {
  title: string;
  value: string | number;
  trend: string;
  isPositive: boolean;
  delay?: number;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, isPositive, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 shadow-lg"
    >
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-100">{value}</span>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
          )}
          {trend}
        </span>
      </div>
    </motion.div>
  );
};

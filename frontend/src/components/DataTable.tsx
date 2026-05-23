import React from 'react';

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-dark-950/50 text-gray-400 text-sm border-b border-dark-800">
            {columns.map(col => (
              <th key={col.key} className="p-4 font-medium">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((item, idx) => (
            <tr key={idx} className="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors text-gray-200">
              {columns.map(col => (
                <td key={col.key} className="p-4">
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

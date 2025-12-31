import React from "react";

export default function Table({ columns, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-blue-900 text-xl border-b font-bold">
            {columns.map((col, index) => (
              <th key={index} className="py-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

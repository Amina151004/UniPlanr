
import { Eye, MoreHorizontal } from "lucide-react";

export default function ExamTable() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#0C1B4D]">
          Exam Responsibilities
        </h2>

        <button className="text-gray-400 hover:text-[#0C1B4D]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm rounded-xl overflow-hidden">
          
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left py-3 px-4">Module</th>
              <th className="text-center py-3">Level</th>
              <th className="text-center py-3">Exam Type</th>
              <th className="text-center py-3">Date</th>
              <th className="text-center px-2">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr className="bg-white hover:bg-gray-50 border-b">
              <td className="py-3 px-4">English</td>
              <td className="text-center">L2</td>
              <td className="text-center">Final Exam</td>
              <td className="text-center">12/06/2025</td>
              <td className="py-3 px-4">
  <div className="flex justify-center">
    <button className="flex items-center gap-1 bg-[#0C1B4D] text-white px-3 py-1 rounded-full text-xs">
      <Eye size={14} /> View
    </button>
  </div>
</td>

            </tr>

            <tr className="bg-gray-50 hover:bg-gray-100 border-b">
              <td className="py-3 px-4">UX</td>
              <td className="text-center">M1</td>
              <td className="text-center">Continuous</td>
              <td className="text-center">18/05/2025</td>
              <td className="py-3 px-4">
  <div className="flex justify-center">
    <button className="flex items-center gap-1 bg-[#0C1B4D] text-white px-3 py-1 rounded-full text-xs">
      <Eye size={14} /> View
    </button>
  </div>
</td>

            </tr>

            <tr className="bg-white hover:bg-gray-50 border-b">
              <td className="py-3 px-4">IA</td>
              <td className="text-center">L3</td>
              <td className="text-center">Remplacement</td>
              <td className="text-center">25/06/2025</td>
              <td className="py-3 px-4">
  <div className="flex justify-center">
    <button className="flex items-center gap-1 bg-[#0C1B4D] text-white px-3 py-1 rounded-full text-xs">
      <Eye size={14} /> View
    </button>
  </div>
</td>

            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

import {
  ClipboardList,
  CheckCircle,
  Clock,
  FileCheck,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  { label: "Total Exams", value: 24, icon: ClipboardList, color: "#3B82F6" },
  { label: "Corrected", value: 12, icon: CheckCircle, color: "#10B981" },
  { label: "Pending", value: 6, icon: Clock, color: "#FACC15" },
  { label: "Completed", value: 18, icon: FileCheck, color: "#8B5CF6" },
];

export default function TotalExamsCard() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow w-full">
      {/* Card header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#0C1B4D]">Total Exams</h2>
        <button className="text-gray-400 hover:text-[#0C1B4D]">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-xl hover:shadow-md transition-shadow"
            >
              <Icon size={24} style={{ color: s.color }} className="mb-1" />
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

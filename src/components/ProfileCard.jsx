import { User, BadgeCheck, Mail, Building2, Calendar } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* Header row with grey background */}
      <div className="bg-gray-100 px-6 py-4 flex items-center gap-4">
        <img
          src="/src/assets/user.png"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="font-medium text-gray-700">Dr. Amina Benali</p>
          <p className="text-sm text-gray-500">Exams Manager</p>
        </div>
      </div>

      {/* Info list */}
      <ul className="text-sm text-gray-600 space-y-3 px-6 py-4">
        <li className="flex items-center gap-2">
          <BadgeCheck size={16} /> ID : RES-2024-015
        </li>
        <li className="flex items-center gap-2">
          <Mail size={16} /> amina.benali@univ.dz
        </li>
        <li className="flex items-center gap-2">
          <Building2 size={16} /> Computer Science
        </li>
        <li className="flex items-center gap-2">
          <Calendar size={16} /> 2024 – 2025
        </li>
      </ul>
    </div>
  );
}

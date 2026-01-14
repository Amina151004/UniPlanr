import React from "react";
import ProfileCard from "../components/ProfileCard";
import ExamTable from "../components/ExamTable";
import StatsCards from "../components/TotalExamsStatsCard";

export default function ResponsableProfile() {
  return (

      <div className="flex-1 p-8 overflow-auto">

        <div className="grid grid-cols-3 gap-6">
          {/* Left profile card */}
          <ProfileCard />

          {/* Exam responsibilities */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow">
            <ExamTable />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <StatsCards />
        </div>
      </div>
    
  );
}


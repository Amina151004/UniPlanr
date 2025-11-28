import React from 'react'

export const DashEtud = () => {
    const teachers = [
    { name: "Prof Fullname", email: "fullname.ne@gmail.com" },
    { name: "Prof Fullname", email: "fullname.ne@gmail.com" },
    { name: "Prof Fullname", email: "fullname.ne@gmail.com" },
    { name: "Prof Fullname", email: "fullname.ne@gmail.com" },
  ];
  const exams = [
    {
      subject: "English",
      date: "15 Oct 2025",
      status: "Controle continue",
      code: "S204",
      color: "bg-blue-500",
    },
    {
      subject: "UX",
      date: "2 Oct 2025",
      status: "Examen de remplacement",
      code: "N001",
      color: "bg-purple-500",
    },
    {
      subject: "AI",
      date: "11 Oct 2025",
      status: "Controle continue",
      code: "N001",
      color: "bg-gray-800",
    },
    {
      subject: "Sys Embarqué",
      date: "5 Oct 2025",
      status: "Test TP",
      code: "L001",
      color: "bg-cyan-400",
    },
  ];
  return (
    <div className="flex justify-between mt-6">
          {/* Teachers Section - Left Side */}
          <div className="w-[40rem] flex flex-col">
            <div className="flex mb-7 items-center  justify-between">
              <div className=" w-28">
                <h2 className="text-xl font-bold text-gray-900 ml-6">Teachers</h2>
              </div>
                <select className="font-semibold px-2 py-2 bg-white rounded-full shadow-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Ingénierie des exigences</option>
                <option>AI</option>
                <option>UX</option>
              </select>
            </div>

            {/* Teachers List */}
            <div className="h-[22rem] overflow-auto space-y-4 scroll-h overflow-y-scroll no-scrollbar">
              {teachers.map((teacher, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-3xl p-5 py-6 hover:shadow-lg hover:bg-white transition"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1500648767791 + i
                    }-42c80d8f8a69?w=100&h=100&fit=crop`}
                    className="h-14 w-14 rounded-full object-cover"
                    alt="teacher"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-900">
                      {teacher.name}
                    </p>
                    <a
                      href={`mailto:${teacher.email}`}
                      className="text-gray-600 text-sm font-medium underline hover:text-blue-600 transition"
                    >
                      {teacher.email}
                    </a>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 transition">
                    <img
                      src="src/assets/message-circle-lines.svg"
                      alt="message"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* My Exams Section - Right Side */}
          <div className="w-[21rem] bg-white rounded-2xl shadow-lg px-7">
            <h2 className="w-full text-xl font-bold mb-10">
              My Exams
            </h2>
            <div className="space-y-4 overflow-auto overflow-y-scroll no-scrollbar h-[23rem] mb-0">
              {exams.map((exam, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${exam.color} mt-3 flex-shrink-0`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-extrabold text-xs text-gray-900">
                          {exam.subject}
                        </h3>
                        <span className=" text-xs text-gray-500">
                          {exam.date}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <p className="mt-3 text-sm font-medium text-gray-400 mb-2">
                        {exam.status}
                      </p>
                      <span className="text-xs mt-5 text-gray-400">{exam.code}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}
export default DashEtud;

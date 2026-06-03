import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

export default function StatsCards() {
  const stats = [
    {
      title: "Total Defects",
      value: "1189",
      icon: <FiAlertCircle size={22} />,
    },
    {
      title: "Open Defects",
      value: "60",
      icon: <FiClock size={22} />,
    },
    {
      title: "Resolved",
      value: "1129",
      icon: <FiCheckCircle size={22} />,
    },
    {
      title: "Critical",
      value: "27",
      icon: <FiTrendingUp size={22} />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 p-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="
          bg-white
          rounded-3xl
          p-6
          border
          border-gray-100
          shadow-[0_10px_30px_rgba(99,102,241,0.08)]
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

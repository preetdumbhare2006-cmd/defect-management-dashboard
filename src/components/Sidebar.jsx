import {
  FiGrid,
  FiAlertCircle,
  FiFolder,
  FiUsers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

export default function Sidebar() {
  const menu = [
    { icon: <FiGrid />, name: "Dashboard" },
    { icon: <FiAlertCircle />, name: "Defects" },
    { icon: <FiFolder />, name: "Projects" },
    { icon: <FiUsers />, name: "Users" },
    { icon: <FiBarChart2 />, name: "Reports" },
    { icon: <FiSettings />, name: "Settings" },
  ];

  return (
    <div className="w-[250px] h-screen bg-white border-r border-gray-100 fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b">
        <h2 className="font-bold text-xl text-indigo-600">Info QA</h2>
      </div>

      <div className="mt-6 px-3">
        {menu.map((item) => (
          <div
            key={item.name}
            className="
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            mb-2
            hover:bg-indigo-50
            cursor-pointer
            transition
            "
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

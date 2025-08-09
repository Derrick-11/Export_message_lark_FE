import { FaRegRectangleList } from "react-icons/fa6";

const menus = [
  {
    label: "Quản lý nhóm chat",
    icon: <FaRegRectangleList className="text-lg min-w-max" />,
    link: "/group-chat",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#01214F] text-white p-4 space-y-4">
      {/* Profile Card */}
      <div className="bg-[#022b60] p-4 rounded-lg flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
          {/* Avatar placeholder */}
          <span className="text-2xl">👤</span>
        </div>
        <h3 className="mt-3 font-semibold text-lg">LARKSUITE</h3>
        <p className="text-sm text-gray-300">Admin</p>
      </div>

      {/* Menu List */}
      <nav className="space-y-2">
        {menus.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#03306B] cursor-pointer"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

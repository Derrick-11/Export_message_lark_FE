import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full bg-[#00327A] px-6 py-3 flex justify-end items-center shadow">
      <div className="flex items-center gap-2 bg-[#0E1B2C] px-3 py-1 rounded-lg border border-[#1e2d47]">
        <FaUserCircle className="text-3xl text-gray-300" />
        <span className="font-semibold text-white">Admin</span>
      </div>
    </header>
  );
}

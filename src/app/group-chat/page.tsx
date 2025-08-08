"use client";
import { LarkSuiteService } from "@/service/api.service";
import { useEffect, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { Chat } from "../interfaces/chat";

export default function ManageGroupChat() {
  const [filter, setFilter] = useState("");
  const [groups, setGroups] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await LarkSuiteService.getChatList();
        setGroups(data);
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleExport = async (chatId: string) => {
    try {
      await LarkSuiteService.exportMessageLark(chatId);
      alert("Xuất Excel thành công!");
    } catch (err) {
      console.error("Lỗi xuất Excel:", err);
      alert("Xuất Excel thất bại!");
    }
  };

  const filteredData = groups.filter((group) =>
    group.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h1>Quản lý nhóm chat</h1>

      {/* Filter */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm nhóm..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
            color: "#000",
          }}
        />
      </div>

      {/* Table */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          background: "#0a2a4d",
        }}
      >
        <thead>
          <tr style={{ background: "#103f66" }}>
            <th style={{ border: "1px solid #ccc" }}>STT</th>
            <th style={{ border: "1px solid #ccc" }}>Ảnh đại diện</th>
            <th style={{ border: "1px solid #ccc" }}>Tên nhóm</th>
            <th style={{ border: "1px solid #ccc" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((chat, index) => (
            <tr key={chat.chat_id}>
              <td style={{ ...tdStyle, justifyItems: "center" }}>
                <p> {index + 1}</p>
              </td>
              <td
                style={{
                  ...tdStyle,
                  justifyItems: "center",
                }}
              >
                <img
                  src={chat.avatar}
                  alt="avatar"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              </td>
              <td style={{ ...tdStyle, justifyItems: "center" }}>
                <p>{chat.name}</p>
              </td>
              <td style={{ ...tdStyle, justifyItems: "center" }}>
                <FaFileExcel
                  size={20}
                  style={{ cursor: "pointer", color: "#21a366" }}
                  onClick={() => handleExport(chat.chat_id)}
                  title="Xuất tin nhắn ra Excel"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

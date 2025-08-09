"use client";
import { LarkSuiteService } from "@/service/api.service";
import { useEffect, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { Chat } from "../interfaces/chat";
import ExportModal from "./components/popupSelectTime";

export default function ManageGroupChat() {
  const [filter, setFilter] = useState("");
  const [groups, setGroups] = useState<Chat[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

  const openModal = (chatId: string) => {
    setSelectedChatId(chatId);
    setShowModal(true);
    setStartTime("");
    setEndTime("");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedChatId(null);
  };

  const handleExport = async () => {
    if (!selectedChatId) return;
    setLoading(true);

    try {
      const data = {
        chatId: selectedChatId,
        startTime,
        endTime,
      };
      const response = await LarkSuiteService.exportMessageLark(data);

      if (response.status === 201) {
        window.open(response.data.sheetUrl, "_blank");
        alert("Xuất dữ liệu tin nhắn trong nhóm thành công!");
      } else {
        alert("Xuất dữ liệu tin nhắn trong nhóm thất bại!");
      }
    } catch (err) {
      console.error("Lỗi xuất Excel:", err);
      alert("Xuất Excel thất bại!");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const filteredData = groups.filter((group) =>
    group.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        backgroundColor: "#0662a9ff",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Danh sách nhóm chat</h1>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          background: "#0a2a4d",
        }}
      >
        <thead>
          <tr style={{ background: "#103f66" }}>
            <th style={thStyle}>STT</th>
            <th style={thStyle}>Ảnh đại diện</th>
            <th style={thStyle}>Tên nhóm</th>
            <th style={thStyle}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((chat, index) => (
            <tr key={chat.chat_id}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>
                <img
                  src={chat.avatar}
                  alt="avatar"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              </td>
              <td style={tdStyle}>{chat.name}</td>
              <td style={tdStyle}>
                <FaFileExcel
                  size={20}
                  style={{ cursor: "pointer", color: "#21a366" }}
                  onClick={() => openModal(chat.chat_id)}
                  title="Xuất tin nhắn ra Excel"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ExportModal
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onClose={closeModal}
          onExport={handleExport}
          loading={loading}
        />
      )}
    </div>
  );
}

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center" as const,
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  fontWeight: "bold",
  textAlign: "center" as const,
};

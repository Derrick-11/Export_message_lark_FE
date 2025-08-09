interface ExportModalProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onClose: () => void;
  onExport: () => void;
  loading?: boolean;
}

export default function ExportModal({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onClose,
  onExport,
  loading = false,
}: ExportModalProps) {
  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Chọn thời gian tải tin nhắn</h2>

        <label style={labelStyle}>
          Từ ngày:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
        </label>

        <label style={labelStyle}>
          Đến ngày:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
        </label>

        <div style={buttonGroupStyle}>
          <button onClick={onExport} style={buttonPrimary} disabled={loading}>
            {loading ? "Đang xuất..." : "Xuất Excel"}
          </button>
          <button onClick={onClose} style={buttonSecondary} disabled={loading}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const modalOverlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: "#ffffff",
  padding: "30px 40px",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  width: "320px",
  color: "#000",
  display: "flex",
  flexDirection: "column" as const,
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  marginBottom: "20px",
  fontSize: "20px",
  fontWeight: "bold",
};

const labelStyle = {
  marginBottom: "20px",
  fontWeight: "bold",
  display: "flex",
  flexDirection: "column" as const,
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

const buttonPrimary = {
  backgroundColor: "#21a366",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold" as const,
};

const buttonSecondary = {
  backgroundColor: "#ccc",
  color: "#000",
  padding: "8px 16px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold" as const,
};

// Dùng axios (khuyên dùng vì dễ cấu hình hơn fetch)
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
});

export const LarkSuiteService = {
  getChatList: async () => {
    const response = await api.get("/lark");
    return response.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportMessageLark: async (groupData: any) => {
    const response = await api.post("/lark", groupData, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers["content-disposition"];
    let fileName = `messages_${Date.now()}.xlsx`;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match?.[1]) {
        fileName = match[1];
      }
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

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

  exportMessageLark: async (groupData: any) => {
    const response = await api.post("/lark", groupData);
    return response.data;
  },
};

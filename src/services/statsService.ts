// src/services/statsService.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const headers = () => {
  const token = localStorage.getItem('haaflah_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getMyStats = async () => {
  const { data } = await axios.get(`${API_URL}/stats/my`, { headers: headers() });
  return data.stats;
};

export const getPlatformStats = async () => {
  const { data } = await axios.get(`${API_URL}/stats/platform`, { headers: headers() });
  return data.stats;
};

export const getEventStats = async (eventId: string) => {
  const { data } = await axios.get(`${API_URL}/stats/events/${eventId}`, { headers: headers() });
  return data.stats;
};

export const getEventsByDateRange = async (startDate: string, endDate: string) => {
  const { data } = await axios.get(`${API_URL}/stats/date-range`, {
    params: { startDate, endDate },
    headers: headers(),
  });
  return data;
};

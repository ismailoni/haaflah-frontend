// src/services/eventService.ts
import axios from "axios";
import type { Event } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";



export const createEvent = async (
  data: Partial<Event> | Record<string, unknown>,
  token?: string
) => {
  const res = await axios.post(`${API_URL}/events`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};

export const getMyEvents = async (token: string) => {
  const res = await axios.get(`${API_URL}/events/my/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.events;
};

export const getAllEvents = async () => {
  const res = await axios.get(`${API_URL}/events`);
  return res.data.events;
};

export const getEventById = async (id: string) => {
  const res = await axios.get(`${API_URL}/events/${id}`);
  return res.data.event;
}

export const updateEvent = async (
  id: string,
  data: Partial<Event> | Record<string, unknown>,
  token?: string
) => {
  const res = await axios.put(`${API_URL}/events/${id}`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};

export const deleteEvent = async (id: string, token?: string) => {
  const res = await axios.delete(`${API_URL}/events/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};

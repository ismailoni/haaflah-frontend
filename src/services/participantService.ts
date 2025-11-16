import axios from "axios";
import type { Participant } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// register a participant (public)
export const registerParticipant = async (
  eventId: string,
  data: Partial<Participant> | Record<string, unknown>
) => {
  const res = await axios.post(
    `${API_URL}/participants/events/${eventId}/register`,
    data
  );
  return res;
};

// get participants for an event (protected)
export const getEventParticipants = async (eventId: string, token?: string) => {
  const res = await axios.get(`${API_URL}/participants/events/${eventId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};

// get single participant by id (protected)
export const getParticipantById = async (id: string, token?: string) => {
  const res = await axios.get(`${API_URL}/participants/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};

// update participant (protected)
export const updateParticipant = async (
  id: string,
  data: Partial<Participant> | Record<string, unknown>,
  token?: string
) => {
  const res = await axios.put(`${API_URL}/participants/${id}`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};

// delete participant (protected)
export const deleteParticipant = async (id: string, token?: string) => {
  const res = await axios.delete(`${API_URL}/participants/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};

// check-in a participant (protected)
export const checkInParticipant = async (id: string, token?: string) => {
  const res = await axios.post(
    `${API_URL}/participants/${id}/check-in`,
    {},
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }
  );
  return res;
};

// bulk check-in (protected) - expects body like { participantIds: [...] } or similar
export const bulkCheckIn = async (
  payload: Record<string, unknown>,
  token?: string
) => {
  const res = await axios.post(`${API_URL}/participants/bulk-check-in`, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res;
};
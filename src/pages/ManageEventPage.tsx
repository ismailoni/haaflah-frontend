import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEventById,
  updateEvent,
  deleteEvent,
} from "../services/eventsService";
import {
  getEventParticipants,
  updateParticipant,
  deleteParticipant,
  checkInParticipant,
} from "../services/participantService";
import { getEventStats } from "../services/statsService";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Loader2,
  Trash2,
  CheckCircle,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Edit,
} from "lucide-react";
import type { EventStats, Event } from "../types";
import StatCard from "../components/StatsCard";

// 🆕 Import shadcn modal components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  checkedIn?: boolean;
}

export default function ManageEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("haaflah_token") || "";

  // 🆕 State for modal
  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data
  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const [eventRes, statsRes, participantsRes] = await Promise.all([
          getEventById(id),
          getEventStats(id),
          getEventParticipants(id, token),
        ]);
        setEvent(eventRes);
        setStats(statsRes);
        setParticipants(participantsRes.data.participants || participantsRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, token]);

  // Update event details
  const handleUpdateEvent = async () => {
    if (!event) return;
    setSaving(true);
    try {
      await updateEvent(event.id, event, token);
      toast.success("Event updated successfully");
    } catch {
      toast.error("Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  // Delete event
  const handleDeleteEvent = async () => {
    if (!event) return;
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(event.id, token);
      toast.success("Event deleted");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to delete event");
    }
  };

  // 🆕 Open edit modal
  const openEditModal = (participant: Participant) => {
    setEditingParticipant(participant);
    setIsModalOpen(true);
  };

  // 🆕 Save edited participant
  const handleSaveParticipant = async () => {
    if (!editingParticipant) return;
    try {
      await updateParticipant(editingParticipant.id, editingParticipant, token);
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === editingParticipant.id ? editingParticipant : p
        )
      );
      toast.success("Participant updated");
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to update participant");
    }
  };

  // Delete participant
  const handleDeleteParticipant = async (p: Participant) => {
    if (!confirm(`Delete ${p.firstName + p.lastName}?`)) return;
    try {
      await deleteParticipant(p.id, token);
      setParticipants((prev) => prev.filter((x) => x.id !== p.id));
      toast.success("Participant deleted");
    } catch {
      toast.error("Failed to delete participant");
    }
  };

  // Check in participant
  const handleCheckIn = async (p: Participant) => {
    try {
      await checkInParticipant(p.id, token);
      setParticipants((prev) =>
        prev.map((x) => (x.id === p.id ? { ...x, checkedIn: true } : x))
      );
      toast.success(`${p.firstName + p.lastName} checked in`);
    } catch {
      toast.error("Failed to check in participant");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="mr-2 animate-spin" /> Loading event...
      </div>
    );

  if (!event)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-2 text-xl font-semibold">Access Denied</h2>
          <p className="mb-6">
            You don't have access to manage this event or event not found
          </p>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Event Stats */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Event Statistics</CardTitle>
          </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              title="Total Registrations"
              value={stats.totalRegistrations}
              iconcolor="#8b5cf6"
              bgcolor="#f3e8ff"
            />
            <StatCard
              icon={<Users className="w-5 h-5" />}
              title="Attendees"
              value={stats.totalAttendees}
              iconcolor="#38bdf8"
              bgcolor="#ecfeff"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Status"
              value={stats.status}
              iconcolor="#4ade80"
              bgcolor="#f0fdf4"
            />
            <StatCard
              icon={<Calendar className="w-5 h-5" />}
              title="Days Until Event"
              value={
              stats.daysUntilEvent !== null
                ? stats.daysUntilEvent
                : "Event Passed"
              }
              iconcolor="#fdba74"
              bgcolor="#fff7ed"
            />
            </CardContent>
        </Card>
      )}

      {/* Event Details */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                value={event.name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={event.date.split("T")[0]}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
              />
            </div>
            <div>
              <Label>Time</Label>
              <Input
                type="time"
                value={event.time}
                onChange={(e) => setEvent({ ...event, time: e.target.value })}
              />
            </div>
            <div>
              <Label>Venue</Label>
              <Input
                value={event.venue}
                onChange={(e) => setEvent({ ...event, venue: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Input
              value={event.description || ""}
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Button onClick={handleUpdateEvent} disabled={saving}>
              {saving ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                "Update Event"
              )}
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete Event
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
        </CardHeader>
        <CardContent>
          {participants.length === 0 ? (
            <p>No participants registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-center">Check-in</th>
                    <th className="p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-2">{p.firstName + " " + p.lastName}</td>
                      <td className="p-2">{p.email}</td>
                      <td className="p-2 text-center">
                        {p.checkedIn ? (
                          <CheckCircle className="inline text-green-500" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleCheckIn(p)}
                            variant="secondary"
                          >
                            Check In
                          </Button>
                        )}
                      </td>
                      <td className="p-2 space-x-2 text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(p)}
                        >
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteParticipant(p)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🆕 Edit Participant Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Participant</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={(editingParticipant?.firstName + " " + editingParticipant?.lastName) || ""}
                onChange={(e) =>
                  setEditingParticipant((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  )
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editingParticipant?.email || ""}
                onChange={(e) =>
                  setEditingParticipant((prev) =>
                    prev ? { ...prev, email: e.target.value } : prev
                  )
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveParticipant}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

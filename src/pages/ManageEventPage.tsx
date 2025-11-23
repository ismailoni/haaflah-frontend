import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  bulkCheckIn,
} from "../services/participantService";
import { getEventStats } from "../services/statsService";
import { toast, Toaster } from "sonner";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  Loader2,
  Trash2,
  LayoutDashboard,
  Calendar,
  Users,
  Edit,
  Clipboard,
  Check,
  TrendingUp,
  FileText,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";

import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import type { Event, EventStats, Participant } from "../types";
import StatCard from "../components/StatsCard";

export default function ManageEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [participantSaving, setParticipantSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "overview" | "event-details" | "registrations"
  >("overview");
  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInFilter, setCheckInFilter] = useState<
    "all" | "checked" | "not-checked"
  >("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const token = localStorage.getItem("haaflah_token") || "";

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [eventRes, statsRes, participantsRes] = await Promise.all([
          getEventById(id),
          getEventStats(id),
          getEventParticipants(id, token),
        ]);

        setEvent(eventRes);
        setStats(statsRes);
        setParticipants(
          participantsRes.data.participants || participantsRes.data
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, token]);

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

  const openEditModal = (participant: Participant) => {
    setEditingParticipant(participant);
    setIsModalOpen(true);
  };

  const handleSaveParticipant = async () => {
    if (!editingParticipant) return;
    setParticipantSaving(true);
    try {
      await updateParticipant(editingParticipant.id, editingParticipant, token);
      setParticipants((prev) =>
        prev.map((p) => (p.id === editingParticipant.id ? editingParticipant : p))
      );
      toast.success("Participant updated");
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to update participant");
    } finally {
      setParticipantSaving(false);
    }
  };

  const handleDeleteParticipant = async (p: Participant) => {
    if (!confirm(`Delete ${p.firstName} ${p.lastName}?`)) return;

    try {
      await deleteParticipant(p.id, token);
      setParticipants((prev) => prev.filter((x) => x.id !== p.id));
      toast.success("Participant deleted");
    } catch {
      toast.error("Failed to delete participant");
    }
  };

  const handleCheckIn = async (p: Participant) => {
    try {
      await checkInParticipant(p.id, token);
      setParticipants((prev) =>
        prev.map((x) => (x.id === p.id ? { ...x, checkedIn: true } : x))
      );
      toast.success(`${p.firstName} ${p.lastName} checked in`);
    } catch {
      toast.error("Failed to check in participant");
    }
  };

  const exportParticipantsCSV = () => {
    if (!filteredParticipants || filteredParticipants.length === 0) {
      toast.error("No participants to export");
      return;
    }

    const headers = ["First Name","Last Name","Email","Checked In"];
    const rows = filteredParticipants.map((p) => [
      p.firstName,
      p.lastName,
      p.email,
      p.checkedIn ? "Yes" : "No",
    ]);

    const csvContent = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event?.name ?? "participants"}-participants.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("Export started");
  };

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      `${p.firstName} ${p.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCheckIn =
      checkInFilter === "all" ||
      (checkInFilter === "checked" && p.checkedIn) ||
      (checkInFilter === "not-checked" && !p.checkedIn);

    return matchesSearch && matchesCheckIn;
  });

  // Bulk selection helpers (only allow selecting not-yet checked-in participants)
  const allSelectableIds = filteredParticipants
    .filter((p) => !p.checkedIn)
    .map((p) => p.id);
  const isAllSelected =
    allSelectableIds.length > 0 &&
    allSelectableIds.every((id) => selectedIds.includes(id));

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(isAllSelected ? [] : allSelectableIds);
  };

  const handleBulkCheckIn = async () => {
    if (selectedIds.length === 0) return;
    setBulkLoading(true);
    try {
      const res = await bulkCheckIn(selectedIds, token);
      // backend returns result: updated count tuple (e.g., [affectedCount]) OR object; fallback to selectedIds length
      const affected = Array.isArray(res.data?.result)
        ? res.data.result[0]
        : res.data?.result?.affectedRows || selectedIds.length;
      setParticipants((prev) =>
        prev.map((p) =>
          selectedIds.includes(p.id) ? { ...p, checkedIn: true, checkedInAt: new Date().toISOString() } : p
        )
      );
      toast.success(`Checked in ${affected} participant(s)`);
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      toast.error("Bulk check-in failed");
    } finally {
      setBulkLoading(false);
    }
  };

  /* Tabs are used instead of the previous sidebar. Tabs are controlled
     by the `activeSection` state below. */

  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const link = event?.registrationLink;
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Registration link copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy registration link");
    }
  };

  // small note: sidebar close button removed because tabs are used instead

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 mr-3 animate-spin" />
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">Access Denied</h2>
          <p className="mb-8 text-muted-foreground">
            You don't have access to this event or it was not found.
          </p>
          <div className="flex justify-end gap-3">
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button variant="outline" onClick={() => navigate(-1)} className="bg-blue-600">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div>
        {/* Main Area */}
        <div className="w-full">
          <header className="flex flex-col gap-4 p-4 px-6 mt-6 sm:justify-between sm:items-center sm:flex-row bg-background">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.h1
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-2xl font-semibold"
              >
                {activeSection === "overview" && "Event Overview"}
                {activeSection === "event-details" && "Event Details"}
                {activeSection === "registrations" && "Registrations"}
              </motion.h1>
            </AnimatePresence>
            <Tabs
              value={activeSection}
              onValueChange={(v) =>
                setActiveSection(
                  v as "overview" | "event-details" | "registrations"
                )
              }
              className="mr-6"
            >
              <TabsList className="items-start justify-start gap-2 mt-2 sm:items-center">
                <TabsTrigger value="overview">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="event-details">
                  <Calendar className="w-4 h-4 mr-2" />
                  Event Details
                </TabsTrigger>
                <TabsTrigger value="registrations">
                  <Users className="w-4 h-4 mr-2" />
                  Registrations
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </header>

          <main className="flex w-full h-full p-6">
            <AnimatePresence mode="wait">
            {/* Overview Section */}
            {activeSection === "overview" && stats && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full h-full space-y-6"
              >
                <Card className="w-full">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="flex flex-col space-y-3 ">
                        <p className="text-2xl font-bold">{event.name}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">Date:</span>{" "}
                            {new Date(event.date).toLocaleDateString(
                              undefined,
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          <p>
                            <span className="font-medium">Venue:</span>{" "}
                            {event.venue}
                          </p>
                          {event.description && (
                            <p className="mt-4 text-base">
                              {event.description}
                            </p>
                          )}
                        </div>

                        {/* Copy Event Registration Link Button */}
                        <div className="mt-10">
                          <p>Event Registration Link:</p>
                          <div className="flex items-center gap-2 p-3 mt-2 border border-green-200 rounded-md bg-green-50">
                            <a
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-green-900 truncate hover:underline"
                              title={event.registrationLink}
                            >
                              {event.registrationLink}
                            </a>

                            <div className="flex items-center gap-2 ml-auto">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleCopyLink}
                                    aria-label="Copy registration link"
                                    className="focus-visible:ring-2"
                                  >
                                    {copied ? (
                                      <Check className="w-4 h-4 text-green-600 transition-transform duration-150 transform scale-100" />
                                    ) : (
                                      <Clipboard className="w-4 h-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  {copied ? "Copied!" : "Copy registration link"}
                                </TooltipContent>
                              </Tooltip>

                              <span className="sr-only" aria-live="polite">
                                {copied ? "Registration link copied" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: { staggerChildren: 0.05 }
                          }
                        }}
                      >
                        {[{
                          icon: <FileText className="w-5 h-5" />,
                          title: "Total Registrations",
                          value: stats.totalRegistrations,
                          iconcolor: "#8b5cf6",
                          bgcolor: "#f3e8ff"
                        }, {
                          icon: <Users className="w-5 h-5" />,
                          title: "Attendees",
                          value: stats.totalAttendees,
                          iconcolor: "#059669",
                          bgcolor: "#dcfce7"
                        }, {
                          icon: <TrendingUp className="w-5 h-5" />,
                          title: "Status",
                          value: stats.status,
                          iconcolor: "#4ade80",
                          bgcolor: "#f0fdf4"
                        }, {
                          icon: <TrendingUp className="w-5 h-5" />,
                          title: "Registration Rate",
                          value: `${stats.registrationRate}%`,
                          iconcolor: "#3b82f6",
                          bgcolor: "#eff6ff"
                        }, {
                          icon: <TrendingUp className="w-5 h-5" />,
                          title: "Attendance Rate",
                          value: `${stats.attendanceRate}%`,
                          iconcolor: "#f97316",
                          bgcolor: "#ffedd5"
                        }, {
                          icon: <Calendar className="w-5 h-5" />,
                          title: "Event Capacity",
                          value: stats.capacity ?? "Unlimited",
                          iconcolor: "#10b981",
                          bgcolor: "#d1fae5"
                        }, {
                          icon: <Users className="w-5 h-5" />,
                          title: "Remaining Seats",
                          value: stats.remainingSeats ?? "Unlimited",
                          iconcolor: "#2563eb",
                          bgcolor: "#e0e7ff"
                        }, {
                          icon: <Calendar className="w-5 h-5" />,
                          title: "Days Until Event",
                          value: (() => {
                            const d = stats.daysUntilEvent;
                            if (d === 0) return "Today";
                            if (typeof d === "number" && d < 0) return "Event Passed";
                            return typeof d === "number" ? `${d} days` : "Event Passed";
                          })(),
                          iconcolor: "#fdba74",
                          bgcolor: "#fff7ed"
                        }].map((s) => (
                          <motion.div
                            key={s.title}
                            variants={{
                              hidden: { opacity: 0, scale: 0.95 },
                              visible: { opacity: 1, scale: 1 }
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            whileHover={{ y: -4, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.12)" }}
                          >
                            <StatCard
                              icon={s.icon}
                              title={s.title}
                              value={s.value}
                              iconcolor={s.iconcolor}
                              bgcolor={s.bgcolor}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Event Details Section */}
            {activeSection === "event-details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full"
              >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Edit Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label>Event Name</Label>
                      <Input
                        value={event.name}
                        onChange={(e) =>
                          setEvent((prev) =>
                            prev ? { ...prev, name: e.target.value } : prev
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={event.description ?? ""}
                        onChange={(e) =>
                          setEvent((prev) =>
                            prev
                              ? { ...prev, description: e.target.value }
                              : prev
                          )
                        }
                        className="min-h-32"
                      />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={event.date?.split("T")[0] ?? ""}
                        className="block"
                        onChange={(e) =>
                          setEvent((prev) =>
                            prev ? { ...prev, date: e.target.value } : prev
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={event.time ?? ""}
                        className="block"
                        onChange={(e) =>
                          setEvent((prev) =>
                            prev ? { ...prev, time: e.target.value } : prev
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label>Venue</Label>
                      <Input
                        value={event.venue}
                        onChange={(e) =>
                          setEvent((prev) =>
                            prev ? { ...prev, venue: e.target.value } : prev
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button onClick={handleUpdateEvent} disabled={saving} className="bg-blue-600">
                      {saving ? (
                        <Loader2 className="mr-2 animate-spin" />
                      ) : (
                        "Update Event"
                      )}
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteEvent}>
                      <Trash2 className="w-4 h-4 mr-2" /> Delete Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            )}

            {/* Participants Section */}
            {activeSection === "registrations" && (
              <motion.div
                key="registrations"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full"
              >
              <Card className="w-full">
                <CardHeader>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        Participants ({filteredParticipants.length})
                      </CardTitle>
                      <Badge variant="outline">
                        {participants.length} total registered
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={exportParticipantsCSV} className="bg-blue-600">
                        Export CSV
                      </Button>
                      {filteredParticipants.length > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={toggleSelectAll}
                          disabled={allSelectableIds.length === 0}
                        >
                          {isAllSelected ? "Unselect All" : "Select All"}
                        </Button>
                      )}
                      {selectedIds.length > 0 && (
                        <Button
                          size="sm"
                          onClick={handleBulkCheckIn}
                          disabled={bulkLoading}
                          className="bg-green-600"
                        >
                          {bulkLoading ? (
                            <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Checking In...</span>
                          ) : (
                            `Bulk Check-In (${selectedIds.length})`
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative flex-1">
                        <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search by name or email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <Select
                        value={checkInFilter}
                        onValueChange={(v: string) =>
                          setCheckInFilter(
                            v as "all" | "checked" | "not-checked"
                          )
                        }
                      >
                        <SelectTrigger className="w-full sm:w-48">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Filter by check-in" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Participants</SelectItem>
                          <SelectItem value="checked">
                            Checked In Only
                          </SelectItem>
                          <SelectItem value="not-checked">
                            Not Checked In
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {filteredParticipants.length === 0 ? (
                    <div className="py-12 text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-muted-foreground">
                        {searchQuery || checkInFilter !== "all"
                          ? "No participants match your filters."
                          : "No participants registered yet."}
                      </p>
                    </div>
                  ) : (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-10 text-center">
                              <input
                                type="checkbox"
                                aria-label="Select all"
                                onChange={toggleSelectAll}
                                checked={isAllSelected}
                                disabled={allSelectableIds.length === 0}
                                className="cursor-pointer accent-blue-600 disabled:opacity-40"
                              />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-center">
                              Status
                            </TableHead>
                            <TableHead className="text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredParticipants.map((p, idx) => (
                            <motion.tr
                              key={p.id}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: idx * 0.02 }}
                              className="group"
                            >
                              <TableCell className="text-center">
                                <input
                                  type="checkbox"
                                  disabled={p.checkedIn}
                                  aria-label={`Select ${p.firstName} ${p.lastName}`}
                                  checked={selectedIds.includes(p.id)}
                                  onChange={(e) => toggleSelect(p.id, e.target.checked)}
                                  className="cursor-pointer accent-blue-600 disabled:opacity-40"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {p.firstName} {p.lastName}
                              </TableCell>
                              <TableCell>{p.email}</TableCell>
                              <TableCell className="text-center">
                                {p.checkedIn ? (
                                  <Badge
                                    variant="default"
                                    className="bg-green-600"
                                  >
                                    Checked In
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">Pending</Badge>
                                )}
                              </TableCell>
                              <TableCell className="space-x-2 text-center">
                                {!p.checkedIn && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleCheckIn(p)}
                                    className="cursor-pointer"
                                  >
                                    Check In
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openEditModal(p)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteParticipant(p)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
              </motion.div>
            )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Edit Participant Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <AnimatePresence mode="wait" initial={false}>
            {isModalOpen && (
              <motion.div
                key="participant-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4"
              >
                <DialogHeader>
                  <DialogTitle>Edit Participant</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <Label>First Name</Label>
                      <Input
                        value={editingParticipant?.firstName ?? ""}
                        onChange={(e) =>
                          setEditingParticipant((prev) =>
                            prev ? { ...prev, firstName: e.target.value } : null
                          )
                        }
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label>Last Name</Label>
                      <Input
                        value={editingParticipant?.lastName ?? ""}
                        onChange={(e) =>
                          setEditingParticipant((prev) =>
                            prev ? { ...prev, lastName: e.target.value } : null
                          )
                        }
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={editingParticipant?.email ?? ""}
                      onChange={(e) =>
                        setEditingParticipant((prev) =>
                          prev ? { ...prev, email: e.target.value } : null
                        )
                      }
                    />
                  </motion.div>
                </div>

                <DialogFooter className="pt-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={!participantSaving ? { scale: 1.02 } : {}} whileTap={!participantSaving ? { scale: 0.97 } : {}}>
                    <Button onClick={handleSaveParticipant} disabled={participantSaving} aria-busy={participantSaving} className="bg-blue-600">
                      {participantSaving ? (
                        <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</span>
                      ) : (
                        'Save changes'
                      )}
                    </Button>
                  </motion.div>
                </DialogFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Toaster richColors position="top-right" />
    </section>
  );
}

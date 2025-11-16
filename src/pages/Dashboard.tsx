import React, { useEffect, useState } from "react";
import StatCard from "../components/StatsCard";
import EventCard from "../components/EventCard";
import { StatCardSkeleton, EventCardSkeleton } from "../components/Skeleton";
import type { User } from "../types";
import { Calendar, Clock, LogOutIcon, Medal, Users2, Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getMyStats } from "../services/statsService";
import { useNavigate } from "react-router-dom";
import type { OrganizerStats } from "../types";
import { Link } from "react-router-dom";

interface DashboardEvent {
  id: string;
  name: string;
  date: string;
  venue?: string;
  totalRegistrations?: number;
  totalAttendees?: number;
  capacity?: number;
  organizerId?: string;
  status?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<OrganizerStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<DashboardEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await getMyStats();
        setStats(data);
        setRecentEvents(data.recentEvents || []);
        setUser(authUser);
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) loadStats();
  }, [authUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ---- Derived Metrics ----
  const totalEvents = recentEvents.length;
  const totalRegistrations = recentEvents.reduce(
    (s, e) => s + (e.totalRegistrations || 0),
    0
  );
  const today = new Date();
  const upcomingEvents = recentEvents.filter(
    (e) => new Date(e.date) >= new Date(today.toDateString())
  ).length;
  const totalAttendees = recentEvents.reduce(
    (s, e) => s + (e.totalAttendees || 0),
    0
  );
  const successRate =
    totalRegistrations === 0
      ? 0
      : Math.round((totalAttendees / totalRegistrations) * 100);

  // ---- Loading UI ----
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <header className="flex items-center justify-between px-8 py-5 mb-8 bg-white shadow-sm">
          <div>
            <h1 className="mb-1 text-xl font-semibold text-blue-700">Haaflah</h1>
            <div className="text-sm text-gray-800">Loading...</div>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:bg-gray-50">
            <LogOutIcon width={16} height={16} /> Logout
          </button>
        </header>

        <div className="px-6 py-8 mx-auto max-w-7xl">
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-9">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </section>

          <section className="space-y-5">
            {[...Array(3)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </section>
        </div>
      </div>
    );
  }

  // ---- Main UI ----
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 mb-8 bg-white shadow-sm">
        <div>
          <h1 className="mb-1 text-xl font-semibold text-blue-700">Haaflah</h1>
          <div className="text-sm text-gray-800">
            Welcome back, {authUser?.name || user?.name} 👋
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer"
        >
          <LogOutIcon width={16} height={16} /> Logout
        </button>
      </header>

      <div className="px-6 py-8 pb-16 mx-auto max-w-7xl">
        {/* Stats Cards */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-9">
          <StatCard
            icon={<Calendar />}
            title="Total Events"
            value={totalEvents}
            iconcolor="#2563eb"
            bgcolor="#eff6ff"
            delta={12}
          />
          <StatCard
            icon={<Users2 />}
            title="Total Registrations"
            value={totalRegistrations}
            iconcolor="#059669"
            bgcolor="#dcfce7"
            delta={28}
          />
          <StatCard
            icon={<Clock />}
            title="Upcoming Events"
            value={upcomingEvents}
            iconcolor="#8b5cf6"
            bgcolor="#f3e8ff"
            delta={5}
          />
          <StatCard
            icon={<Medal />}
            title="Success Rate"
            value={`${successRate}%`}
            iconcolor="#ea580c"
            bgcolor="#ffedd5"
            delta={-2}
          />
        </section>

        {/* Event List */}
        <section className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Your Events</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your events
            </p>
          </div>
          <Link to="/dashboard/create-event">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-md">
              <Plus width={16} height={16} /> Create Event
            </button>
          </Link>
        </section>

        <section className="space-y-5">
          {recentEvents.length === 0 ? (
            <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                No recent events
              </h3>
              <p className="mb-6 text-gray-500">
                Create your first event to get started
              </p>
              <Link to="/dashboard/create-event">
                <button className="inline-flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  Create Event
                </button>
              </Link>
            </div>
          ) : (
            recentEvents
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((ev) => (
                <EventCard
                  key={ev.id}
                  event={{
                    id: ev.id,
                    name: ev.name,
                    date: ev.date,
                    venue: ev.venue || "TBD",
                    totalRegistrations: ev.totalRegistrations || 0,
                    capacity: ev.capacity || 0,
                    organizerId: ev.organizerId || "",
                    status: ev.status as 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled',
                    isLive: new Date(ev.date).toDateString() === today.toDateString(),
                  }}
                />
              ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

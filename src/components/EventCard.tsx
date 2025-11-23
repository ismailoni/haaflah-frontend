import React from "react";
import type { Event } from "../types";
import { MapPin, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Partial<Event>;
}

const progressPercentage = (reg: number, cap: number): number => {
  if (!cap) return 0;
  return Math.min(100, Math.round((reg / cap) * 100));
};

const formatDate = (d?: string | Date | null): string => {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const pct = progressPercentage(event.totalRegistrations || 0, event.capacity || 0);

  return (
    <div className="flex flex-col items-start justify-between gap-5 p-4 mb-5 transition-shadow bg-white border border-gray-200 shadow-sm lg:flex-row lg:items-center rounded-xl lg:p-5 hover:shadow-md">
      <div className="flex flex-col justify-between flex-1 w-full gap-5">
        {/* Event Info */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="m-0 text-base font-semibold text-gray-900">
            {event.name}
          </h3>
          <span
            className={`text-xs font-medium rounded-full px-2.5 py-1 capitalize ${
              event.status === "completed"
                ? "bg-green-50 text-green-600"
                : "bg-blue-50 text-blue-600"}`}
          >
            {event.status}
          </span>
          {event.date === Date() && (
            <span className="text-xs font-medium rounded-full px-2.5 py-1 bg-red-50 text-red-600">
              ● Live
            </span>
          )}
        </div>

        {/* Event Meta */}
        <div className="flex flex-wrap items-center justify-between w-full gap-3 lg:w-4/5">
          <div className="flex items-center text-[13px] text-gray-500 gap-1">
            📅 {formatDate(event.date)}
          </div>
          <div className="flex items-center text-[13px] text-gray-500 gap-1">
            <MapPin width={16} height={16} /> {event.venue}
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
            <Users width={16} height={16} />
            {event.totalRegistrations} / {event.capacity === 0 ? "unlimited" : event.capacity}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5">
          <div className="h-2 overflow-hidden bg-gray-100 rounded-full">
            <div
              className="h-full transition-all duration-300 bg-blue-600 rounded-full"
              style={{ width: `${pct}%` }}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="mt-1.5 text-xs text-gray-500 text-right">
            {pct}% registration progress
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end w-full lg:w-auto lg:block">
        <Link
          to={`/dashboard/manage-event/${event.id ?? ""}`}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Settings width={16} height={16} />
          Manage
        </Link>
      </div>
    </div>
  );
};

export default EventCard;

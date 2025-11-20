import { useEffect, useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import RegistrationCards from "../components/RegistrationComponents/RegistrationCards";
import RegistrationForm from "../components/RegistrationComponents/RegistrationForm";
import { getEventById } from "../services/eventsService";
import { useParams } from "react-router-dom";

interface EventData {
  id: string;
  name: string;
  description?: string;
  date: string;
  time?: string;
  venue: string;
  capacity: number;
  totalRegistrations: number;
}

const Registration: React.FC = () => {
  const { eventId } = useParams(); // assumes route like /register/:eventId
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const event = await getEventById(eventId as string);
        setEvent(event);
      } catch (err) {
        console.error("Failed to fetch event:", err);
        setError("Unable to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen">
        <span className="border-4 border-blue-500 rounded-full size-8 border-t-transparent animate-spin"></span>
      </section>
    );
  }

  if (error || !event) {
    return (
      <section className="flex items-center justify-center h-screen text-gray-600">
        <p>{error || "Event not found."}</p>
      </section>
    );
  }

  const remainingSpots = event.capacity - event.totalRegistrations;

  return (
    <section className="min-h-screen px-5 py-8 font-nunito bg-blue-50 sm:px-8 lg:px-10">
      <section className="mx-auto space-y-6 md:space-y-2 lg:max-w-5xl">
        {/* Event Header */}
        <div className="p-5 space-y-3 bg-white rounded-lg shadow sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="font-medium text-xl sm:text-2xl lg:text-[28px]">
              {event.name}
            </h1>
            <button className="text-[10px] bg-green-200 py-1 px-1.5 rounded-md font-bold text-green-900">
              Registration Open
            </button>
          </div>

          <div className="grid space-y-2 text-xs text-gray-500 sm:text-sm md:flex md:items-center md:gap-8 md:space-y-0 md:my-4">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="sm:size-5" />
              {new Date(event.date).toLocaleDateString()} {event.time && `at ${event.time}`}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="sm:size-5" />
              {event.venue}
            </span>
            <span className="flex items-center gap-2">
              <Users size={14} className="sm:size-5" />
              {remainingSpots} spots remaining
            </span>
          </div>

          {event.description && (
            <p className="text-sm text-gray-500 md:text-base">{event.description}</p>
          )}
        </div>

        {/* Registration Form and Cards */}
        <div className="grid space-y-8 lg:flex lg:justify-between lg:gap-5">
          <RegistrationForm eventId={event.id} />
          <RegistrationCards event={event} />
        </div>
      </section>
    </section>
  );
};

export default Registration;

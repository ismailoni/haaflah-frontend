import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { Calendar, CircleCheckBig, User } from "lucide-react";

interface RegistrationCardsProps {
  event: {
    name: string;
    date: string;
    venue: string;
    capacity: number;
    totalRegistrations: number;
  };
}


const RegistrationCards: React.FC<RegistrationCardsProps> = ({ event }) => {
  const [progress, setProgress] = useState(0);

  // Example: Animate progress from 0 to 100
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);



    return (
      <section className="space-y-6 font-normal md:space-y-8 md:flex md:justify-between md:gap-6 lg:grid lg:mt-12 lg:space-y-1 lg:gap-0">
        {/* Event Details */}
        <div className="p-5 space-y-3 bg-white rounded-lg shadow sm:p-7 md:w-full lg:-mt-3 lg:h-86">
          <p className="flex items-center gap-2 mb-6 md:text-lg">
            <Calendar size={18} />
            Event Details
          </p>
          <div className="text-sm text-gray-500 space-y-0.5 md:text-base">
            <p className="text-gray-800">Date & Time</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
          <div className="text-sm text-gray-500 space-y-0.5 md:text-base">
            <p className="text-gray-800">Location</p>
            <p>{event.venue}</p>
          </div>
          <div className="text-sm text-gray-500 space-y-0.5 md:text-base">
            <p className="text-gray-800">Capacity</p>
            <div className="flex justify-between space-y-1">
              <p>{event.totalRegistrations} registered</p>
              <p>{event.capacity - event.totalRegistrations} spots left</p>
            </div>
            <ProgressBar value={progress} color="bg-blue-600" height="h-2.5" />
          </div>
        </div>

        {/* What to Expect */}
        <div className="p-5 space-y-3 bg-white rounded-lg shadow sm:p-7 md:w-full md:h-81 lg:h-68 lg:-mt-10">
          <p className="flex items-center gap-2 mb-6 md:text-lg">
            <User size={18} />
            What to Expect
          </p>
          <div className="space-y-3 text-sm md:text-base">
            <p className="flex items-center gap-2 ">
              <CircleCheckBig size={18} color="green" />
              Confirmation email with event details
            </p>
            <p className="flex items-center gap-2 ">
              <CircleCheckBig size={18} color="green" />
              QR Code for event check-in
            </p>
            <p className="flex items-center gap-2 ">
              <CircleCheckBig size={18} color="green" />
              Access to live stream (If available)
            </p>
            <p className="flex items-center gap-2 ">
              <CircleCheckBig size={18} color="green" />
              Fast Check-in with Face ID (optional)
            </p>
          </div>
        </div>
      </section>
    );
}
export default RegistrationCards;
import {
  MdEventAvailable,
  MdPeople,
  MdOutlineQrCodeScanner,
  MdNotificationsActive,
  MdInsights,
  MdGroupWork,
} from "react-icons/md";
import { motion } from "framer-motion";

const features = [
  {
    icon: <MdEventAvailable className="w-10 h-10 text-blue-500" />,
    title: "Event Creation & Scheduling",
    desc: "Plan and manage multiple events effortlessly — set dates, times, and details in one dashboard.",
  },
  {
    icon: <MdPeople className="w-10 h-10 text-green-500" />,
    title: "Attendee Management",
    desc: "Track, verify, and organize all participants with a smart attendee directory.",
  },
  {
    icon: <MdOutlineQrCodeScanner className="w-10 h-10 text-purple-500" />,
    title: "Ticketing & Check-In",
    desc: "Generate digital tickets and scan QR codes for fast, secure entry.",
  },
  {
    icon: <MdNotificationsActive className="w-10 h-10 text-red-500" />,
    title: "Announcements & Alerts",
    desc: "Send real-time updates, reminders, and announcements to attendees instantly.",
  },
  {
    icon: <MdInsights className="w-10 h-10 text-yellow-500" />,
    title: "Analytics Dashboard",
    desc: "View real-time event insights — attendance, engagement, and performance metrics.",
  },
  {
    icon: <MdGroupWork className="w-10 h-10 text-sky-500" />,
    title: "Team Collaboration",
    desc: "Assign roles, manage volunteers, and coordinate event staff in one platform.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      // use numeric bezier easing to satisfy TS framer-motion types
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
} as unknown as import("framer-motion").Variants;

function Features() {
  return (
    <section id="features" className="pt-24 bg-[#FFFFFF] space-y-3">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[#1F2937] text-center text-lg"
      >
        Open Source <span className="text-[#0C1421] font-semibold">Event Management</span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl font-bold text-center text-[#1F2937]"
      >
        Powerful Features for Organizing Events
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-[#4B5563] px-5 font-extralight"
      >
        Manage attendees, schedules, and operations with open collaboration.
      </motion.p>

      <div className="max-w-6xl mx-auto px-5 lg:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-start hover:scale-105 duration-300 space-y-4 bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <div className="p-4 rounded-2xl bg-white inline-flex shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import HaaflahLogo from "../../assets/logo.svg";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } as unknown as import("framer-motion").Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  } as unknown as import("framer-motion").Variants;

  return (
    <motion.footer
      className="bg-[#0B1220] text-gray-300 py-16 px-6 md:px-20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="max-w-7xl mx-auto FooterImage grid md:grid-cols-4 gap-10"
        variants={containerVariants}
      >
        {/* Left Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
              <img src={HaaflahLogo} alt="Haaflah logo" />
            </div>
            <h1 className="text-2xl font-bold text-white">Haaflah</h1>
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Haaflah – Where Every Event Begins With Insight.
          </p>

          <h2 className="text-white font-medium mb-3">Follow Us :</h2>
          <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" },
              ].map((s, idx) => (
                <motion.a
                  key={idx}
                  href={s.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-[#151B2A] hover:bg-white transition-colors rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-800"
                >
                  {s.icon}
                </motion.a>
              ))}
          </div>
        </motion.div>

        {/* Company */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-5">Company</h3>
          <ul className="space-y-3 text-gray-400">
            <li>About Haaflah</li>
            <li>Our Team</li>
            <li>Careers</li>
            <li>Partnerships</li>
            <li>Testimonials</li>
            <li>Contact Us</li>
          </ul>
        </motion.div>

        {/* Event Services */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-5">Event Services</h3>
          <ul className="space-y-3 text-gray-400">
            <li>Corporate Events</li>
            <li>Weddings & Celebrations</li>
            <li>Concerts & Festivals</li>
            <li>Venue Management</li>
            <li>Event Marketing</li>
            <li>Vendor Coordination</li>
          </ul>
        </motion.div>

        {/* Support & Policy */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-5">Support & Policy</h3>
          <ul className="space-y-3 text-gray-400">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Booking Policy</li>
            <li>Refund Policy</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Line */}
      <motion.div
        variants={itemVariants}
        className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} Haaflah. All Rights Reserved.
      </motion.div>
    </motion.footer>
  );
}

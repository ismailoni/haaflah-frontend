import React, { useEffect, useState } from "react";
import { createEvent } from "../services/eventsService";
import type { EventFormData, ValidationErrors } from "../types/event";
import { defaultEventFormData } from "../types/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faLocationDot,
  faShield,
  faVideo,
  faImage,
  faSpinner,
  faUsers,
  faInfoCircle,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CreateEvent: React.FC = () => {
  const [form, setForm] = useState<EventFormData>(defaultEventFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const validate = (data: EventFormData): ValidationErrors => {
    const e: ValidationErrors = {};
    if (!data.name.trim()) e.name = "Event name is required";
    if (!data.date) e.date = "Event date is required";
    if (!data.time) e.time = "Event time is required";
    if (!data.venue.trim()) e.venue = "Venue is required";
    if (data.capacity != null && data.capacity < 0)
      e.capacity = "Expected attendees cannot be negative";
    if (data.registrationDeadline && data.registrationDeadline > data.date)
      e.registrationDeadline =
        "Registration deadline must be on or before the event date";
    return e;
  };

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const minDate = new Date().toISOString().split("T")[0];

  const handleChange = <K extends keyof EventFormData>(
    key: K,
    value: EventFormData[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleBannerUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, bannerUrl: data.secure_url }));
        setBannerPreview(data.secure_url);
        toast.success("✅ Banner uploaded successfully!");
      } else toast.error("Upload failed. Please try again.");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem("haaflah_token") ?? undefined;
      const res = await createEvent(
        form as unknown as Record<string, unknown>,
        token
      );

      if (res.status === 201) {
        toast.success("🎉 Event created successfully!");
        navigate(`/dashboard/manage-event/${res.data.event.id}`);
        setForm(defaultEventFormData);
        setBannerPreview(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  const MAX_DESC = 500;
  const descLen = form.description ? form.description.length : 0;

  const formatPreviewDate = (date?: string, time?: string) => {
    if (!date) return "No date";
    try {
      const d = new Date(date + (time ? `T${time}` : ""));
      return d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: time ? "numeric" : undefined,
        minute: time ? "numeric" : undefined,
      });
    } catch {
      return `${date} ${time || ""}`.trim();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto my-10 overflow-hidden shadow-xl rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <Toaster position="top-right" richColors />

      {/* HEADER */}
      <div className="p-6 text-white bg-gradient-to-r from-indigo-600 to-purple-600">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create New Event
        </h1>
        <p className="mt-1 text-sm text-indigo-100">
          Fill in the details below to bring your event to life ✨
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="relative space-y-6 md:col-span-2 backdrop-blur-md"
        >
          {submitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-white rounded-lg backdrop-blur-sm"
            >
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-3xl text-indigo-600"
              />
            </motion.div>
          )}

          {/* BANNER UPLOAD */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faImage} className="mr-2 text-indigo-600" />
              Event Banner
            </label>
            <label
              htmlFor="banner-upload"
              className="flex flex-col items-center justify-center w-full transition-all duration-300 border-2 border-dashed rounded-lg cursor-pointer h-44 bg-white/70 hover:bg-indigo-50 hover:border-indigo-400"
            >
              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-sm text-gray-500">
                  <FontAwesomeIcon icon={faImage} className="mb-1 text-2xl" />
                  Click or drag an image to upload
                </div>
              )}
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleBannerUpload(file);
                }}
                disabled={uploading || submitting}
              />
            </label>
            {uploading && (
              <p className="flex items-center gap-2 mt-2 text-sm text-indigo-600">
                <FontAwesomeIcon icon={faSpinner} spin /> Uploading banner...
              </p>
            )}
          </div>

          {/* NAME */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faCalendar} className="mr-2 text-indigo-600" />
              Event Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Tech Summit 2025"
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              maxLength={MAX_DESC}
              placeholder="Describe your event..."
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-400">
                Brief description to help attendees understand your event.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    style={{
                      width: `${Math.min(100, (descLen / MAX_DESC) * 100)}%`,
                    }}
                    className="h-full transition-all bg-indigo-500"
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {descLen}/{MAX_DESC}
                </span>
              </div>
            </div>
          </div>

          {/* DATE / TIME */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faClock} className="mr-2 text-green-600" />
                Date
              </label>
              <input
                type="date"
                min={minDate}
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faClock} className="mr-2 text-green-600" />
                Time
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* REGISTRATION DEADLINE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Registration Deadline (optional)
            </label>
            <input
              type="date"
              value={form.registrationDeadline ?? ""}
              onChange={(e) =>
                handleChange(
                  "registrationDeadline",
                  e.target.value === "" ? (null) : e.target.value
                )
              }
              max={form.date || undefined}
              min={minDate}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {errors.registrationDeadline && (
              <p className="mt-1 text-xs text-red-600">
                {errors.registrationDeadline}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Deadline must be on or before the event date.
            </p>
          </div>

          {/* VENUE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-2 text-red-500"
              />
              Venue
            </label>
            <input
              type="text"
              placeholder="e.g. Grand Convention Center"
              value={form.venue}
              onChange={(e) => handleChange("venue", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EXPECTED ATTENDEES */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-yellow-600" />
              Expected Attendees (optional)
            </label>
            <input
              type="number"
              min={0}
              value={form.capacity ?? ""}
              onChange={(e) =>
                handleChange(
                  "capacity",
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
              placeholder="e.g. 150"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {errors.capacity && (
              <p className="mt-1 text-xs text-red-600">
                {errors.capacity}
              </p>
            )}
          </div>

          <div className="py-4 border-t border-gray-300">
            <div className="flex items-center justify-between bg-[#faf5ff] py-4 px-2 rounded-md border-1 border-solid border-gray-300">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faShield}
                  className="text-[#fff] text-lg bg-[#9810FA] p-2 rounded-md"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Face ID Check-In
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable Face ID for attendee check-in
                  </p>
                </div>
              </div>

              <label
                htmlFor="faceId"
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  id="faceId"
                  aria-label="Face ID Check-In"
                  type="checkbox"
                  checked={form.faceIdCheckIn}
                  onChange={(e) =>
                    handleChange("faceIdCheckIn", e.target.checked)
                  }
                  className="sr-only"
                />

                <span
                  className={`w-11 h-6 flex items-center rounded-full transition-colors duration-300 ${
                    form.faceIdCheckIn ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      form.faceIdCheckIn ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </span>
              </label>
            </div>

          <div className="mt-3 flex items-center justify-between bg-[#fef2f2] py-4 px-2 rounded-md border-1 border-solid border-gray-300">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faVideo}
                className="text-[#fff] text-lg bg-[#E7000B] p-2 rounded-md"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Live Streaming
                </p>
                <p className="text-xs text-gray-500">
                  Enable live stream for remote attendees
                </p>
              </div>
            </div>

            <label
              htmlFor="liveStreaming"
              className="inline-flex items-center cursor-pointer"
            >
              <input
                id="liveStreaming"
                aria-label="Live Streaming"
                type="checkbox"
                checked={form.liveStreaming}
                onChange={(e) =>
                  handleChange("liveStreaming", e.target.checked)
                }
                className="sr-only"
              />

              <span
                className={`w-11 h-6 flex items-center rounded-full transition-colors duration-300 ${
                  form.liveStreaming ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    form.liveStreaming ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </span>
            </label>
          </div>
        </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => setForm(defaultEventFormData)}
              className="flex-1 py-2 text-gray-700 transition-all duration-200 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex items-center justify-center flex-1 gap-2 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 hover:shadow-lg"
            >
              {submitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Creating...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>

        {/* LIVE PREVIEW + LINK */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border rounded-md shadow-sm bg-white/80 backdrop-blur-md"
        >
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Live Preview
          </h3>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="overflow-hidden bg-white border rounded-md shadow-sm"
          >
            {bannerPreview ? (
              <img
                src={bannerPreview}
                alt="Preview"
                className="object-cover w-full h-40"
              />
            ) : (
              <div className="flex items-center justify-center h-40 text-sm text-gray-400 bg-gray-100">
                Banner Preview
              </div>
            )}
            <div className="p-3 text-sm">
              <h4 className="font-semibold text-gray-800">
                {form.name || "Untitled Event"}
              </h4>

              <p className="mt-1 text-gray-600">
                {formatPreviewDate(form.date, form.time)}
              </p>

              {form.registrationDeadline && (
                <p className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-xs text-indigo-500" />
                  Registration by: <span className="ml-1 font-medium text-gray-700">{form.registrationDeadline}</span>
                </p>
              )}

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faUsers} className="text-yellow-600" />
                  <span>{form.capacity ?? "—"} expected</span>
                </div>

                <div className="flex gap-2 ml-auto">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${form.faceIdCheckIn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    <FontAwesomeIcon icon={form.faceIdCheckIn ? faCheck : faTimes} className="text-[10px]" />
                    {form.faceIdCheckIn ? "Face ID" : "Face ID Off"}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${form.liveStreaming ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    <FontAwesomeIcon icon={form.liveStreaming ? faCheck : faTimes} className="text-[10px]" />
                    {form.liveStreaming ? "Live" : "Live Off"}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-gray-600">
                {form.venue || "Venue not set"}
              </p>
            </div>
          </motion.div>

          <AnimatePresence>
            {/*
              registrationLink card previously handled here; unchanged
            */}
            { /* ...existing code for registrationLink block... */ }
          </AnimatePresence>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default CreateEvent;

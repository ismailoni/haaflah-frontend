import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerParticipant } from "../../services/participantService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Check } from "lucide-react";


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  organisation?: string;
  faceIdEnabled?: boolean;
}
interface RegisterFormProps {
  eventId: string;
}

const RegistrationForm: React.FC<RegisterFormProps> = ({ eventId }) => {

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organisation: "",
    faceIdEnabled: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [registeredName, setRegisteredName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFaceIdToggle = () => {
    setFormData((prev) => ({
      ...prev,
      faceIdEnabled: !prev.faceIdEnabled,
    }));
    toast.info(
      !formData.faceIdEnabled
        ? "Face ID check-in enabled"
        : "Face ID check-in disabled"
    );
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (formData.phoneNumber.length < 7)
      newErrors.phoneNumber = "Enter a valid phone number";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix all required fields");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    if (!eventId) {
      toast.error("Invalid event link");
      return;
    }

    setLoading(true);
    try {
      await registerParticipant(eventId, formData);

      // capture name before reset so modal can show it
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      setRegisteredName(name || null);
      setIsSuccessOpen(true);

      toast.success("🎉 Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        organisation: "",
        faceIdEnabled: false,
      });
      setErrors({});
    } catch (err: unknown) {
      // Safely extract an error message from different shapes (Axios, Error, string, etc.)
      const getErrorMessage = (error: unknown): string => {
        if (typeof error === "string") return error;
        if (error instanceof Error) return error.message;
        if (typeof error === "object" && error !== null && "response" in error) {
          const resp = (error as { response?: unknown }).response;
          if (typeof resp === "object" && resp !== null && "data" in resp) {
            const data = (resp as { data?: unknown }).data;
            if (typeof data === "object" && data !== null && "message" in data) {
              const msg = (data as { message?: unknown }).message;
              return typeof msg === "string" ? msg : String(msg);
            }
          }
        }
        return "Failed to register. Try again.";
      };

      const message = getErrorMessage(err);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen lg:w-3/5">
      <ToastContainer position="top-right" autoClose={2500} />

      <form
        onSubmit={handleSubmit}
        className="w-full p-5 bg-white shadow rounded-xl sm:p-7"
      >
        <div className="mb-8">
          <h2 className="font-semibold text-gray-800 md:text-lg">
            Event Registration
          </h2>
          <p className="text-sm text-gray-500 md:text-base">
            Fill in your details to register for this event
          </p>
        </div>

        <p className="mb-4 text-gray-700 semibold md:text-lg">
          Personal Information
        </p>

        {/* First + Last Name */}
        <div className="md:flex md:gap-4">
          <div className="mb-4 md:w-full">
            <label className="block mb-1 text-sm font-semibold">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
                errors.firstName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500 animate-pulse">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="mb-4 md:w-full">
            <label className="block mb-1 text-sm font-semibold">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
                errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500 animate-pulse">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.smith@example.com"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500 animate-pulse">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+234 801 234 5678"
            className={`w-full border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-lg text-sm p-2 focus:outline-none focus:ring ${
              errors.phoneNumber ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-red-500 animate-pulse">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Organisation */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">
            Organisation (Optional)
          </label>
          <input
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            placeholder="Your company or organisation"
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Face ID Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <label className="block mb-1 text-sm font-medium md:text-base">
              Face ID Check-in (Optional)
            </label>
            <p className="text-xs text-gray-500 md:text-sm">
              Enable fast and secure check-in at the venue
            </p>
          </div>

          <button
            type="button"
            onClick={handleFaceIdToggle}
            className={`relative w-8 h-4 rounded-full border border-gray-300 transition-colors md:h-4.5 ${
              formData.faceIdEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-[0.5px] left-0 size-3.5 bg-white rounded-full border border-gray-300 transition-transform md:size-4 ${
                formData.faceIdEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <span className="border-2 border-white rounded-full size-4 border-t-transparent animate-spin"></span>
              <span>Processing...</span>
            </>
          ) : (
            "Complete Registration"
          )}
        </button>
      </form>

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <DialogTitle>Registration Successful</DialogTitle>
            </div>
            <DialogDescription>
              {registeredName
                ? `Thanks ${registeredName}! You're registered for this event.`
                : "You're registered for this event."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="default" onClick={() => setIsSuccessOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RegistrationForm;

// Type definitions for Event form data
// Defines the shape of data used by the Create Event page and related components

export interface EventFormData {
  name: string;
  description: string;
  bannerUrl?: string;
  date: string; // ISO date (yyyy-mm-dd)
  time: string; // 24-hour time (HH:MM)
  venue: string;
  capacity?: number | null;
  registrationDeadline?: string | null; // ISO date
  faceIdCheckIn: boolean;
  liveStreaming: boolean;
}

// Basic validation result shape for form-level validation
// ValidationErrors maps form field keys to optional error messages.
export type ValidationErrors = Partial<Record<keyof EventFormData, string>>;

export const defaultEventFormData: EventFormData = {
  name: '',
  description: '',
  date: '',
  time: '',
  venue: '',
  capacity: null,
  registrationDeadline: null,
  faceIdCheckIn: false,
  liveStreaming: false,
};

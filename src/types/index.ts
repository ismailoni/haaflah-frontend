export interface User {
  id: string;
  name: string;
  email: string;
}

export interface EventCard {
  id: string;
  name: string;
  date: string;
  venue: string;
  totalRegistrations: number;
  capacity: number;
  organizerId: string;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  isLive: boolean;
}
export interface Event {
  id: string;
  name: string;
  description?: string;
  bannerUrl?: string;
  date: string;
  time: string;
  timezone?: string;
  venue: string;
  eventType: "physical" | "virtual" | "hybrid";
  capacity?: number;
  registrationLink?: string;
  registrationDeadline?: string;
  hasFaceIdCheckIn?: boolean;
  hasLiveStream?: boolean;
  liveStreamUrl?: string;
  status: "draft" | "published" | "ongoing" | "completed" | "cancelled";
  totalRegistrations: number;
  totalAttendees: number;
  organizerId: string;
  isLive?: boolean;
}


// src/types/stats.ts
export interface EventSummary {
  id: string;
  name: string;
  date: string;
  status: string;
  capacity: number;
  venue: string;
  totalRegistrations: number;
  totalAttendees: number;
}

export interface OrganizerStats {
  totalEvents: number;
  publishedEvents: number;
  draftEvents: number;
  completedEvents: number;
  upcomingEvents: number;
  totalRegistrations: number;
  totalAttendees: number;
  recentEvents: EventSummary[];
}

export interface EventStats {
  totalRegistrations: number;
  totalAttendees: number;
  registrationRate: number; // percentage
  attendanceRate: number; // percentage
  daysUntilEvent: number | null; // null if event is past
  capacity: number;
  remainingSeats: number;
  status: string;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface TypeCount {
  eventType: string;
  count: number;
}

export interface PlatformStats {
  totalEvents: number;
  totalUsers: number;
  totalOrganizers: number;
  activeEvents: number;
  completedEvents: number;
  upcomingEvents: number;
  totalRegistrations: number;
  totalAttendees: number;
  eventsByCategory: CategoryCount[];
  eventsByType: TypeCount[];
}

// src/types/participant.ts
export interface Participant {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  registrationDate: string;
  checkedIn: boolean;
  status: "registered" | "attended" | "no-show";
  ticketNumber?: string;

}


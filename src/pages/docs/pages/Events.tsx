import DocPage from "../DocPage";

const Events = () => {
  return (
    <DocPage
      title="Events API"
      description="Manage events through the API"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Overview
          </h2>
          <p>
            The Events API allows you to create, read, update, and delete events
            programmatically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            List All Events
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              GET /api/events
            </code>
          </div>
          <p className="mt-3">
            Retrieve a list of all events created by the authenticated user.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Create Event
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              POST /api/events
            </code>
          </div>
          <p className="mt-3">
            Create a new event with the provided details.
          </p>
          <div className="bg-gray-50 p-4 rounded-md mt-3">
            <p className="font-semibold text-sm mb-2">Request Body:</p>
            <code className="text-sm text-gray-700">
              {`{
  "name": "Tech Conference 2024",
  "description": "Annual tech conference",
  "startDate": "2024-06-15T09:00:00Z",
  "endDate": "2024-06-16T17:00:00Z",
  "location": "San Francisco, CA",
  "capacity": 500
}`}
            </code>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Get Event Details
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              GET /api/events/:eventId
            </code>
          </div>
          <p className="mt-3">
            Retrieve detailed information about a specific event.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Update Event
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              PUT /api/events/:eventId
            </code>
          </div>
          <p className="mt-3">
            Update an existing event with new information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Delete Event
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              DELETE /api/events/:eventId
            </code>
          </div>
          <p className="mt-3">
            Delete an event (this action cannot be undone).
          </p>
        </section>
      </div>
    </DocPage>
  );
};

export default Events;

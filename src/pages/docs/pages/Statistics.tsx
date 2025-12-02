import DocPage from "../DocPage";

const Statistics = () => {
  return (
    <DocPage
      title="Statistics API"
      description="Retrieve event statistics and analytics"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Overview
          </h2>
          <p>
            The Statistics API provides analytics and insights about your events
            and participants.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Event Statistics
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              GET /api/events/:eventId/statistics
            </code>
          </div>
          <p className="mt-3">
            Get comprehensive statistics for a specific event including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>Total registrations</li>
            <li>Approved participants</li>
            <li>Pending approvals</li>
            <li>Registration over time</li>
            <li>Attendance rate</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Dashboard Statistics
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              GET /api/statistics
            </code>
          </div>
          <p className="mt-3">
            Get aggregated statistics across all your events.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Participant Demographics
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              GET /api/events/:eventId/statistics/demographics
            </code>
          </div>
          <p className="mt-3">
            Retrieve demographic information about event participants.
          </p>
        </section>
      </div>
    </DocPage>
  );
};

export default Statistics;

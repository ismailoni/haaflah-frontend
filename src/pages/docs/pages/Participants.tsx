import DocPage from "../DocPage";

const Participants = () => {
  return (
    <DocPage
      title="Participants API"
      description="Manage event participants through the API"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Overview
          </h2>
          <p>
            The Participants API allows you to manage event registrations,
            approvals, and participant data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            List Participants
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              GET /api/events/:eventId/participants
            </code>
          </div>
          <p className="mt-3">
            Retrieve all participants for a specific event.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Register Participant
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              POST /api/events/:eventId/participants
            </code>
          </div>
          <p className="mt-3">
            Register a new participant for an event.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Approve Registration
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              PATCH /api/events/:eventId/participants/:participantId/approve
            </code>
          </div>
          <p className="mt-3">
            Approve a pending participant registration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Reject Registration
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              PATCH /api/events/:eventId/participants/:participantId/reject
            </code>
          </div>
          <p className="mt-3">
            Reject a pending participant registration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Remove Participant
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              DELETE /api/events/:eventId/participants/:participantId
            </code>
          </div>
          <p className="mt-3">
            Remove a participant from an event.
          </p>
        </section>
      </div>
    </DocPage>
  );
};

export default Participants;

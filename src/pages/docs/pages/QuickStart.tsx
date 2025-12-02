import DocPage from "../DocPage";

const QuickStart = () => {
  return (
    <DocPage
      title="Quick Start"
      description="Create your first event in 5 minutes"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 1: Navigate to Dashboard
          </h2>
          <p>
            After logging in, you'll see your dashboard. Click the "Create
            Event" button to get started.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 2: Fill Event Details
          </h2>
          <p>Enter the following information:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>
              <strong>Event Name:</strong> Give your event a descriptive name
            </li>
            <li>
              <strong>Date & Time:</strong> Set when your event will occur
            </li>
            <li>
              <strong>Location:</strong> Add the event location
            </li>
            <li>
              <strong>Description:</strong> Write a brief description
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 3: Configure Registration
          </h2>
          <p>
            Set up registration settings such as capacity limits, required
            fields, and whether approval is needed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 4: Publish Your Event
          </h2>
          <p>
            Click "Publish" to make your event live. Share the registration
            link with potential participants.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 5: Manage Participants
          </h2>
          <p>
            As participants register, you can view them in the "Participants"
            section, approve registrations, and send communications.
          </p>
        </section>
      </div>
    </DocPage>
  );
};

export default QuickStart;

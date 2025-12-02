import DocPage from "../DocPage";

const CreateEvent = () => {
  return (
    <DocPage
      title="How to Create an Event"
      description="Step-by-step guide to creating your first event"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Before You Start
          </h2>
          <p>
            Make sure you have a Haaflah account and are logged in to your
            dashboard.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 1: Access Event Creation
          </h2>
          <p>
            From your dashboard, click the "Create Event" button in the top
            right corner.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 2: Fill in Basic Information
          </h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-semibold text-sm mb-3">Required Fields:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Event Name:</strong> Enter a clear, descriptive name
              </li>
              <li>
                <strong>Start Date & Time:</strong> Choose when your event
                begins
              </li>
              <li>
                <strong>End Date & Time:</strong> Set the event end time
              </li>
              <li>
                <strong>Location:</strong> Enter the physical or virtual location
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 3: Add Description and Details
          </h2>
          <p>
            Write a compelling event description that tells participants what
            to expect. You can use formatting to highlight important details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 4: Configure Registration Settings
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Capacity:</strong> Set maximum number of participants
            </li>
            <li>
              <strong>Approval Required:</strong> Enable if you need to approve
              registrations
            </li>
            <li>
              <strong>Custom Fields:</strong> Add additional information to
              collect from participants
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 5: Add Event Image (Optional)
          </h2>
          <p>
            Upload an image that represents your event. This will be displayed
            on the event listing page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Step 6: Publish Your Event
          </h2>
          <p>
            Click "Publish" to make your event live. You'll receive a unique
            registration link that you can share with participants.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Next Steps
          </h2>
          <p>
            Now that your event is live, you can:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>Share the registration link with potential participants</li>
            <li>Monitor registrations in real-time</li>
            <li>Send communications to registered participants</li>
            <li>View event analytics and statistics</li>
          </ul>
        </section>
      </div>
    </DocPage>
  );
};

export default CreateEvent;

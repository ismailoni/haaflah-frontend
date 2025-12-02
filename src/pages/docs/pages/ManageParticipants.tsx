import DocPage from "../DocPage";

const ManageParticipants = () => {
  return (
    <DocPage
      title="How to Manage Participants"
      description="Learn how to handle participant registrations"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Accessing Participants
          </h2>
          <p>
            From your event details page, click on the "Participants" tab to
            view all registrations for that event.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Participant List Overview
          </h2>
          <p>The participants list shows:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>Participant name and contact information</li>
            <li>Registration date</li>
            <li>Registration status (Approved, Pending, Rejected)</li>
            <li>Custom field responses</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Approving Registrations
          </h2>
          <p>
            If you have approval enabled for your event:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 mt-2">
            <li>Find the registration with "Pending" status</li>
            <li>Review the participant information</li>
            <li>Click "Approve" to accept the registration</li>
            <li>The participant will receive a confirmation email</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Rejecting Registrations
          </h2>
          <p>
            To reject a registration:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 mt-2">
            <li>Click on the participant entry</li>
            <li>Click "Reject" button</li>
            <li>Optionally add a reason for rejection</li>
            <li>Confirm the rejection</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Bulk Actions
          </h2>
          <p>
            You can perform actions on multiple participants at once:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>Select multiple participants using checkboxes</li>
            <li>Choose bulk action (Approve, Reject, Send Email, Export)</li>
            <li>Confirm the action</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Removing Participants
          </h2>
          <p>
            To remove a participant from your event:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 mt-2">
            <li>Click on the participant</li>
            <li>Click "Remove" button</li>
            <li>Confirm the removal</li>
            <li>They will receive a notification email</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Sending Communications
          </h2>
          <p>
            You can send emails to participants:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>Select participants or use "All" for everyone</li>
            <li>Click "Send Email"</li>
            <li>Compose and send your message</li>
          </ul>
        </section>
      </div>
    </DocPage>
  );
};

export default ManageParticipants;

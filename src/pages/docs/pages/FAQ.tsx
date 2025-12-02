import DocPage from "../DocPage";

const FAQ = () => {
  return (
    <DocPage
      title="Frequently Asked Questions"
      description="Find answers to common questions about Haaflah"
    >
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            How much does Haaflah cost?
          </h3>
          <p>
            Haaflah offers a free tier with essential features. Premium plans
            are available for advanced features and higher participant limits.
            Contact our sales team for custom enterprise pricing.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Can I customize the registration form?
          </h3>
          <p>
            Yes! You can add custom fields to your registration form, including
            text fields, dropdowns, checkboxes, and more.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            How do I export participant data?
          </h3>
          <p>
            You can export participant data in CSV or Excel format from the
            Participants tab. Click the "Export" button and choose your preferred
            format.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Can I duplicate an event?
          </h3>
          <p>
            Yes, you can clone an existing event from the event details page.
            This copies all settings but starts with zero participants.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Is there a limit to the number of events I can create?
          </h3>
          <p>
            No, there's no limit to the number of events. The number of
            participants per event depends on your plan.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Can I schedule emails to participants?
          </h3>
          <p>
            Yes, you can schedule reminder emails to be sent to participants at
            specific times before or after your event.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            What payment methods do you accept?
          </h3>
          <p>
            We accept all major credit cards (Visa, Mastercard, American
            Express) and bank transfers for enterprise accounts.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Is my data secure?
          </h3>
          <p>
            Yes, all data is encrypted in transit and at rest. We comply with
            GDPR and other data protection regulations.
          </p>
        </section>
      </div>
    </DocPage>
  );
};

export default FAQ;

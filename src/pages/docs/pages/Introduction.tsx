import DocPage from "../DocPage";

const Introduction = () => {
  return (
    <DocPage
      title="Contributing to Haaflah"
      description="Welcome to the Haaflah contributor guide"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            What is Haaflah?
          </h2>
          <p>
            Haaflah is an open-source event management platform designed to
            simplify the process of creating, managing, and tracking events.
            This project welcomes contributions from developers, designers, and
            community members who want to help build a better event management
            solution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Why Contribute?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Help build a powerful, open-source event management platform</li>
            <li>Learn and improve your coding skills</li>
            <li>Collaborate with a growing developer community</li>
            <li>Make an impact on real-world event management</li>
            <li>Build your portfolio with meaningful contributions</li>
            <li>Shape the future of the project through your ideas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            How to Get Started
          </h2>
          <p>
            Getting started is easy! Follow these high-level steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mt-2">
            <li>Read the <strong>Local Setup for Contributors</strong> guide to set up your environment</li>
            <li>Find an issue to work on or propose a new feature</li>
            <li>Create a feature branch and make your changes</li>
            <li>Test your changes locally and ensure all tests pass</li>
            <li>Submit a Pull Request with a clear description</li>
            <li>Engage with reviewers and iterate on feedback</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Types of Contributions
          </h2>
          <p className="text-gray-700 mb-3">We welcome all kinds of contributions:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Code:</strong> Bug fixes, features, refactoring, performance improvements</li>
            <li><strong>Documentation:</strong> Improving guides, adding examples, fixing typos</li>
            <li><strong>Testing:</strong> Writing tests, identifying bugs, improving test coverage</li>
            <li><strong>Design:</strong> UI/UX improvements, mockups, accessibility enhancements</li>
            <li><strong>Community:</strong> Answering questions, helping other contributors, feedback</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Community Guidelines
          </h2>
          <p>
            We're committed to providing a welcoming and inclusive environment. Please review our
            <a href="/CODE_OF_CONDUCT.md" className="text-blue-600 hover:text-blue-700"> Code of Conduct</a> and
            <a href="/CONTRIBUTING.md" className="text-blue-600 hover:text-blue-700"> Contributing Guidelines</a> before
            participating.
          </p>
        </section>
      </div>
    </DocPage>
  );
};

export default Introduction;

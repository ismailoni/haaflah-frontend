import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const DocsHome = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Haaflah Contributor Docs
        </h1>
        <p className="text-xl text-gray-600">
          Everything you need to know to contribute to and develop Haaflah.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Getting Started Card */}
        <Link
          to="/doc/getting-started/introduction"
          className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            Getting Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-gray-600">
            Set up your development environment and start contributing to Haaflah.
          </p>
        </Link>

        {/* Development Card */}
        <Link
          to="/doc/development/structure"
          className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            Development
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-gray-600">
            Understand the project structure and development workflow.
          </p>
        </Link>

        {/* API Reference Card */}
        <Link
          to="/doc/api/authentication"
          className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            API Reference
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-gray-600">
            Learn about the APIs and backend integration for feature development.
          </p>
        </Link>

        {/* Contributing Card */}
        <Link
          to="/doc/contributing/code-style"
          className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            Contributing
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-gray-600">
            Follow code style guidelines and contribution process.
          </p>
        </Link>
      </div>

      {/* Popular Topics */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Topics</h2>
        <div className="space-y-3">
          <Link
            to="/doc/getting-started/installation"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowRight size={16} className="mr-2" />
            Local Setup for Contributors
          </Link>
          <Link
            to="/doc/development/structure"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowRight size={16} className="mr-2" />
            Project Structure
          </Link>
          <Link
            to="/doc/contributing/code-style"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowRight size={16} className="mr-2" />
            Code Style Guidelines
          </Link>
          <Link
            to="/doc/api/authentication"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowRight size={16} className="mr-2" />
            Authentication API Reference
          </Link>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Contribute?
        </h2>
        <p className="text-gray-700 mb-4">
          Start with the "Local Setup for Contributors" guide and join our growing community of developers.
          We welcome all levels of experience!
        </p>
        <a
          href="/CODE_OF_CONDUCT.md"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Contribution Guidelines
        </a>
      </section>
    </div>
  );
};

export default DocsHome;

import DocPage from "../DocPage";

const ProjectStructure = () => {
  return (
    <DocPage
      title="Project Structure"
      description="Understand the Haaflah project layout"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Directory Overview
          </h2>
          <p className="text-gray-700">
            The Haaflah frontend project is organized to separate concerns and
            promote maintainability. Here's a breakdown of the key directories:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Root Level
          </h2>
          <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
            <p><code>src/</code> - Main source code</p>
            <p><code>public/</code> - Static assets</p>
            <p><code>vite.config.ts</code> - Vite build configuration</p>
            <p><code>tsconfig.json</code> - TypeScript configuration</p>
            <p><code>package.json</code> - Project dependencies</p>
            <p><code>tailwind.config.js</code> - Tailwind CSS configuration</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            src/ Directory Structure
          </h2>
          <div className="bg-gray-50 p-4 rounded-md space-y-3 text-sm font-mono">
            <div>
              <strong>components/</strong> - Reusable React components
              <div className="ml-4 text-gray-600 mt-1">
                <p>ui/ - Shadcn/ui components</p>
                <p>RegistrationComponents/ - Registration form components</p>
              </div>
            </div>
            <div>
              <strong>pages/</strong> - Page components (routes)
              <div className="ml-4 text-gray-600 mt-1">
                <p>docs/ - Documentation pages</p>
                <p>Dashboard.tsx, CreateEvent.tsx, etc.</p>
              </div>
            </div>
            <div>
              <strong>contexts/</strong> - React Context for state management
              <div className="ml-4 text-gray-600 mt-1">
                <p>AuthContext.ts - Authentication state</p>
              </div>
            </div>
            <div>
              <strong>hooks/</strong> - Custom React hooks
              <div className="ml-4 text-gray-600 mt-1">
                <p>useAuth.ts - Authentication hook</p>
              </div>
            </div>
            <div>
              <strong>services/</strong> - API communication
              <div className="ml-4 text-gray-600 mt-1">
                <p>api.ts - Base API setup</p>
                <p>eventsService.ts, participantService.ts, etc.</p>
              </div>
            </div>
            <div>
              <strong>types/</strong> - TypeScript type definitions
              <div className="ml-4 text-gray-600 mt-1">
                <p>event.ts, index.ts</p>
              </div>
            </div>
            <div>
              <strong>lib/</strong> - Utility functions
              <div className="ml-4 text-gray-600 mt-1">
                <p>utils.ts - Common helper functions</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Key Conventions
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Components:</strong> Use `.tsx` for React components with TypeScript</li>
            <li><strong>Exports:</strong> Always use named exports for components</li>
            <li><strong>Types:</strong> Define and organize types in the `types/` directory</li>
            <li><strong>Services:</strong> Keep API calls in dedicated service files</li>
            <li><strong>Hooks:</strong> Create custom hooks in the `hooks/` directory for reusable logic</li>
            <li><strong>Styling:</strong> Use Tailwind CSS for component styling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Important Files
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><code>src/App.tsx</code> - Main app component and routing setup</li>
            <li><code>src/main.tsx</code> - Entry point</li>
            <li><code>src/contexts/AuthProvider.tsx</code> - Wraps app with auth context</li>
            <li><code>.env.example</code> - Environment variable template</li>
            <li><code>components.json</code> - Shadcn/ui configuration</li>
          </ul>
        </section>
      </div>
    </DocPage>
  );
};

export default ProjectStructure;

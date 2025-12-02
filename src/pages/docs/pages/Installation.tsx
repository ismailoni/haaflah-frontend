import DocPage from "../DocPage";

const Installation = () => {
  return (
    <DocPage
      title="Local Setup for Contributors"
      description="How to fork, clone, run, and contribute to Haaflah locally"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Git (version 2.0 or higher)</li>
            <li>Node.js (LTS) and npm or pnpm/yarn</li>
            <li>Modern web browser for testing (Chrome/Edge/Firefox)</li>
            <li>Optional: VS Code and recommended extensions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Fork &amp; Clone</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Fork</strong> the repository on GitHub (top-right "Fork").
            </li>
            <li>
              <strong>Clone</strong> your fork to your machine (PowerShell example):
              <pre className="bg-gray-100 p-3 rounded mt-2"><code>git clone https://github.com/haaflah/haaflah-frontend</code></pre>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Install Dependencies</h2>
          <p className="text-gray-700">Install project dependencies. We recommend npm</p>
          <pre className="bg-gray-100 p-3 rounded mt-2"><code>npm install</code></pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Environment</h2>
          <p className="text-gray-700">Create a local environment file from the example and update values as needed:</p>
          <pre className="bg-gray-100 p-3 rounded mt-2"><code>cp .env.example .env.local
            # then edit .env.local to fit your local setup</code></pre>
          <p className="text-sm text-gray-600 mt-2">Common variables: API base URL, feature flags, analytics keys. Keep secrets out of the repo.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Run Locally</h2>
          <p className="text-gray-700">Start the dev server and open the app in your browser.</p>
          <pre className="bg-gray-100 p-3 rounded mt-2"><code>pnpm dev
            # or
            npm run dev
            # or
            yarn dev</code></pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Testing &amp; Linting</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Run tests:</strong>
              <pre className="bg-gray-100 p-3 rounded mt-2"><code>pnpm test
                # or
                npm test
                # or
                yarn test</code></pre>
            </li>
            <li>
              <strong>Lint &amp; format:</strong>
              <pre className="bg-gray-100 p-3 rounded mt-2"><code>pnpm lint
                pnpm format</code></pre>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Branching &amp; Pull Requests</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Create a feature branch from the main branch: <code>git checkout -b feat/my-change</code></li>
            <li>Make changes and run tests/lint locally before committing.</li>
            <li>Commit with a clear message: <code>git commit -m "feat: add X"</code></li>
            <li>Push to your fork: <code>git push origin feat/my-change</code></li>
            <li>Open a Pull Request to <code>haaflah/haaflah-frontend</code> and follow the PR template.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Code Review &amp; Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Follow the repository coding style and lint rules.</li>
            <li>Write clear, focused PRs and link any relevant issues.</li>
            <li>Include tests for new behavior where applicable.</li>
            <li>Respond to review comments and keep PRs up to date with main.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Need Help?</h2>
          <p className="text-gray-700">If you run into issues while setting up the project, open an issue or reach out on the project's discussion channels (see the README for contact info).</p>
        </section>
      </div>
    </DocPage>
  );
};

export default Installation;

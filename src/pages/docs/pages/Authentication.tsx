import DocPage from "../DocPage";

const Authentication = () => {
  return (
    <DocPage
      title="Authentication API for Developers"
      description="Understand the authentication implementation for contributing to Haaflah"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Overview
          </h2>
          <p>
            This guide covers the Authentication API endpoints and their implementation
            for frontend developers. Understanding the auth flow is essential when contributing
            to login, signup, or session management features.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Key Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Token-based auth:</strong> The system uses JWT tokens for authentication</li>
            <li><strong>Access Token:</strong> Short-lived token used for API requests</li>
            <li><strong>Refresh Token:</strong> Long-lived token used to obtain new access tokens</li>
            <li><strong>Session Management:</strong> Handled by the AuthContext</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Sign Up Endpoint
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">POST /api/auth/sign-up</code>
          </div>
          <p className="mt-3">
            Creates a new user account. When contributing, ensure validation,
            error handling, and proper response codes.
          </p>
          <div className="bg-gray-50 p-4 rounded-md mt-3">
            <p className="font-semibold text-sm mb-2">Request Body:</p>
            <code className="text-sm text-gray-700">
              {`{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe"
}`}
            </code>
          </div>
          <p className="text-sm text-gray-600 mt-2">Related code: <code>src/auth/SignUpPage.tsx</code>, <code>src/contexts/AuthContext.ts</code></p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Sign In Endpoint
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">POST /api/auth/sign-in</code>
          </div>
          <p className="mt-3">
            Authenticates a user and returns access and refresh tokens.
          </p>
          <div className="bg-gray-50 p-4 rounded-md mt-3">
            <p className="font-semibold text-sm mb-2">Request Body:</p>
            <code className="text-sm text-gray-700">
              {`{
  "email": "user@example.com",
  "password": "securePassword123"
}`}
            </code>
          </div>
          <p className="text-sm text-gray-600 mt-2">Related code: <code>src/pages/SignInPage.tsx</code>, <code>src/hooks/useAuth.ts</code></p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Refresh Token Flow
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">POST /api/auth/refresh</code>
          </div>
          <p className="mt-3">
            When an access token expires, use the refresh token to obtain a new one.
            This is handled automatically in the AuthContext.
          </p>
          <p className="text-sm text-gray-600 mt-2">When contributing, ensure token refresh logic doesn't cause infinite loops or race conditions.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Sign Out
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">POST /api/auth/sign-out</code>
          </div>
          <p className="mt-3">
            Invalidates the current session. Clears tokens from localStorage and resets auth state.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Testing Auth Changes
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Test sign up with valid and invalid inputs</li>
            <li>Verify token storage and retrieval in localStorage</li>
            <li>Test protected routes redirect unauthenticated users</li>
            <li>Verify token refresh happens transparently</li>
            <li>Test logout clears all auth state</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Storing sensitive tokens in plain localStorage</li>
            <li>Not handling token expiration gracefully</li>
            <li>Missing error handling for failed auth requests</li>
            <li>Not validating input before sending to API</li>
            <li>Forgetting to clear tokens on logout</li>
          </ul>
        </section>
      </div>
    </DocPage>
  );
};

export default Authentication;

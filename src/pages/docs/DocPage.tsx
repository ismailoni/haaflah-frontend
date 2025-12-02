import React from "react";

interface DocPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const DocPage: React.FC<DocPageProps> = ({ title, description, children }) => {
  return (
    <article className="prose prose-sm max-w-none">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-gray-600">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="text-gray-700 space-y-4">
        {children}
      </div>
    </article>
  );
};

export default DocPage;

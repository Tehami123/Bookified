'use client';

import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  progress?: Array<{
    label: string;
    completed: boolean;
  }>;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, progress }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-(--bg-card)">
        <div className="loading-shadow">
          <svg
            className="loading-animation w-16 h-16 text-(--accent-warm)"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>

          <h2 className="loading-title">Preparing Your Book...</h2>

          {progress && progress.length > 0 && (
            <div className="loading-progress">
              {progress.map((item, index) => (
                <div key={index} className="loading-progress-item">
                  <span className={`loading-progress-status ${item.completed ? 'bg-(--success)' : ''}`} />
                  <span className="text-sm text-(--text-secondary)">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;

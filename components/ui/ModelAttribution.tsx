'use client';

import { useState } from 'react';
import { infoContent } from '@/content/site-config.json';

export interface InfoIconContent {
  content: string;
}

export default function ModelAttribution() {
  const content: InfoIconContent = infoContent;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Info Icon Button */}
      <button
        className="group relative p-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border hover:bg-surface hover:border-accent transition-all duration-200"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="3D Model Attribution"
      >
        <svg
          className="w-5 h-5 text-foreground-secondary group-hover:text-accent transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Tooltip */}
      {isOpen && (
        <div className="absolute bottom-2 right-full mr-2 w-64 sm:w-72 z-50 animate-in fade-in slide-in-from-right-2 duration-200">
          <div className="bg-surface border border-border rounded-lg shadow-lg p-4">
            <div className="text-sm text-foreground-secondary space-y-2">
              <p className="font-medium text-foreground">
                3D Model Attribution
              </p>
              <p>
                Base room model by{' '}
                <a
                  href="https://www.artstation.com/oleaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Olha Kovtun
                </a>{' '}
                from ArtStation.
              </p>
              <p>{content.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

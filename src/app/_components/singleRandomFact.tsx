"use client";

import { Shuffle } from "lucide-react";
import { api } from "~/trpc/react";

export function SingleRandomFact() {
  const {
    data: randomFact,
    isLoading,
    refetch,
  } = api.randomFact.getRandom.useQuery();

  const handleGetNewFact = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-gray-500">Loading random fact...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">Random Fact</h2>
        <button
          onClick={handleGetNewFact}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Shuffle className="h-4 w-4" />
          New Fact
        </button>
      </div>

      {randomFact ? (
        <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900 text-lg">
                Q: {randomFact.question}
              </h3>
            </div>
            <div>
              <p className="text-gray-700 text-lg">A: {randomFact.answer}</p>
            </div>
            {randomFact.reference && (
              <div className="pt-2 border-t border-gray-200">
                <a
                  href={randomFact.reference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  View Source
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No random fact available.
        </div>
      )}
    </div>
  );
}

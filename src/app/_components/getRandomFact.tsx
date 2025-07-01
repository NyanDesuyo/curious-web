"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { api } from "~/trpc/react";

export function GetRandomFact() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getRandomFactData = api.randomFact.getAll.useQuery({
    page,
    limit,
  });

  const data = getRandomFactData.data?.data;

  if (getRandomFactData.isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-gray-500">Loading facts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {[5, 10, 20, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!data || data.length < limit}
            className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Facts List */}
      <div className="space-y-4">
        {data?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No facts found.
          </div>
        ) : (
          data?.map((item, index) => (
            <div
              key={item.id || index}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="space-y-2">
                <div>
                  <h3 className="font-medium text-gray-900">Q: {item.question}</h3>
                </div>
                <div>
                  <p className="text-gray-700">A: {item.answer}</p>
                </div>
                {item.reference && (
                  <div>
                    <a
                      href={item.reference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Source
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

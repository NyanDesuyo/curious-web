"use client";

import { useState } from "react";
import { GetRandomFact } from "~/app/_components/getRandomFact";
import { CreateRandomFact } from "~/app/_components/postRandomfact";
import { SingleRandomFact } from "~/app/_components/singleRandomFact";
import { List, Plus } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Random Facts
          </h1>
          <p className="text-gray-600">Discover and create interesting facts</p>
        </div>

        {/* Featured Random Fact */}
        <div className="mb-8 rounded-lg bg-white shadow-sm p-6">
          <SingleRandomFact />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-gray-200 p-1">
            <button
              onClick={() => setActiveTab("list")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="h-4 w-4" />
              View Facts
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "create"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Plus className="h-4 w-4" />
              Create Fact
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-lg bg-white shadow-sm">
          {activeTab === "list" && (
            <div className="p-6">
              <GetRandomFact />
            </div>
          )}
          {activeTab === "create" && (
            <div className="p-6">
              <div className="mx-auto max-w-md">
                <h2 className="mb-4 text-xl font-medium text-gray-900">
                  Create New Fact
                </h2>
                <CreateRandomFact />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateRandomFact() {
  const utils = api.useUtils();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reference, setReference] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const createRandomFact = api.randomFact.create.useMutation({
    onSuccess: async () => {
      setModalMessage("Successfully create data");
      setShowModal(true);

      await utils.randomFact.invalidate();

      setQuestion("");
      setAnswer("");
      setReference("");
    },
    onError: (error) => {
      setModalMessage("Failed create data");
      setShowModal(true);
    },
  });

  return (
    <div className="w-full max-w-xs">
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute left-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 transform">
            <div className="rounded bg-white p-4">
              <p className="text-center text-black">{modalMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRandomFact.mutate({ question, answer, reference });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <input
          type="text"
          placeholder="Answers"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <input
          type="text"
          placeholder="Remarks"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createRandomFact.isPending}
        >
          {createRandomFact.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

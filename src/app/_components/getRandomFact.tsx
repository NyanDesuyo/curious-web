"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function GetRandomFact() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const getRandomFactData = api.randomFact.getAll.useQuery({
    page,
    limit,
  });

  const data = getRandomFactData.data?.data;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-4 text-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center p-2">
            <span className="text-base font-semibold text-white">Limit:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value, 10))}
              className="mx-2 rounded-full bg-white/20 px-4 py-2 text-base font-semibold text-white transition hover:bg-white/30"
            >
              {[5, 10, 20, 50].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full bg-white/20 p-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/30"
            >
              Previous
            </button>
            <span className="text-base font-semibold text-white">
              Page {page}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/30"
            >
              Next
            </button>
          </div>
        </div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="bg-[#A6AEBF] p-2">Question</th>
              <th className="bg-[#A6AEBF] p-2">Answer</th>
              <th className="bg-[#A6AEBF] p-2 text-xs">Reference</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.ID} className="odd:bg-slate-100">
                <td className="bg-[#C6E7FF] p-2">{item.Question}</td>
                <td className="bg-white p-4">{item.Answer}</td>
                <td className="bg-white p-1 text-xs">{item.Reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

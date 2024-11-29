import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Mocked DB
export interface randomFactInterface {
  data: randomFactData[];
  limit: number;
  message: string;
  page: number;
  total: number;
}

export interface randomFactData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  Question: string;
  Answer: string;
  Reference: string;
}

export const randomFactRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.optional(z.coerce.number().min(1)),
        limit: z.optional(z.coerce.number().min(1)),
      }),
    )
    .query(async ({ input }) => {
      const data = await fetch(
        `http://192.168.1.101:8080/random-fact/?page=${input.page}&limit=${input.limit}`,
      );
      const randomFact: randomFactInterface =
        (await data.json()) as randomFactInterface;

      return randomFact;
    }),

  create: publicProcedure
    .input(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
        reference: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const data = await fetch("http://192.168.1.101:8080/random-fact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input.question,
          answer: input.answer,
          reference: input.reference,
        }),
      });
      const randomFact: randomFactInterface =
        (await data.json()) as randomFactInterface;

      return randomFact;
    }),
});

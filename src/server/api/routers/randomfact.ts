import { z } from "zod";
import { env } from "../../../env.js";

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
  id: number;
  question: string;
  answer: string;
  reference: string;
  created_at: string;
  updated_at: string;
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
        `${env.SERVER_URL}/random-fact/?page=${input.page}&limit=${input.limit}`,
      );
      const randomFact: randomFactInterface =
        (await data.json()) as randomFactInterface;

      return randomFact;
    }),

  getRandom: publicProcedure.query(async () => {
    const response = await fetch(`${env.SERVER_URL}/random-fact/random`);
    const result = (await response.json()) as { data: randomFactData };

    return result.data;
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
      const data = await fetch(`${env.SERVER_URL}/random-fact/`, {
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

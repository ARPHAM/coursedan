import { z } from "zod";

export const CourseSchema = z.object({
  name: z.string().trim().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.coerce.boolean(),
});

export const GroupSchema = z.object({
  name: z.string().trim().min(1),
  status: z.coerce.boolean(),
});

export type GroupDto = z.infer<typeof GroupSchema>;

import { z } from "zod";

export const HubvisorSchema = z
  .object({
    name: z.string({
      required_error: "Ce champ est obligatoire",
    }),
    firstName: z.string(),
    age: z.number().int().min(18).max(99),
    email: z
      .string()
      .email()
      .regex(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim),
    practice: z.enum(["epic", "atom", "source"], {
      required_error: "Ce champ est obligatoire",
    }),
    // practice: z.union([
    //   z.literal("epic"),
    //   z.literal("atom"),
    //   z.literal("source"),
    // ]),
    manager: z
      .enum(["none", "Dimitri", "Ada", "Antoine", "Charles", "Alvin"], {
        required_error: "Ce champ est obligatoire",
      })
      .transform((val) => val.toLowerCase()),
    seniority: z.number().int().min(0).max(50),
    skills: z.array(
      z.object({
        name: z.string(),
        level: z.number().int().min(1).max(10),
      })
    ),
  })
  .required({
    name: true,
    firstName: true,
    email: true,
    practice: true,
    manager: true,
    seniority: true,
  });

export type ZodHubvisor = z.infer<typeof HubvisorSchema>;

export function Zod() {
  //   console.log(
  //     HubvisorSchema.parse({
  //       name: 12,
  //     })
  //   );

  //   console.log(
  //     HubvisorSchema.safeParse({
  //       firstName: "John",
  //       name: "Doe",
  //       age: 18,
  //       email: "john.doe@hubvisory.com",
  //       manager: "Charles",
  //       practice: "source",
  //       seniority: 5,
  //       skills: [
  //         {
  //           name: "Java",
  //           level: 8,
  //         },
  //         {
  //           name: "React",
  //           level: 7,
  //         },
  //       ],
  //     })
  //   );

  return null;
}

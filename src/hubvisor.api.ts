import { ZodHubvisor } from "./Zod";

export function createHubvisor(hubvisor: ZodHubvisor) {
  return new Promise(() =>
    setTimeout(() => alert(JSON.stringify(hubvisor)), 1000)
  );
}

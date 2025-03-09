import { Hubvisor } from "./hubvisor.types";

export function createHubvisor(hubvisor: Hubvisor) {
  return new Promise(() =>
    setTimeout(() => alert(JSON.stringify(hubvisor)), 1000)
  );
}

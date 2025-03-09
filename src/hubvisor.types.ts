type BaseHubvisor = {
  name: string;
  firstName: string;
  age: number;
  email: string;
  seniority: number;
  skills: Skill[];
};

type EpicHubvisor = {
  practice: "epic";
  manager: "none" | "Dimitri" | "Ada";
} & BaseHubvisor;

type AtomHubvisor = {
  practice: "atom";
  manager: "none" | "Antoine";
} & BaseHubvisor;

type SourceHubvisor = {
  practice: "source";
  manager: "none" | "Charles" | "Alvin";
} & BaseHubvisor;

export type Hubvisor = EpicHubvisor | AtomHubvisor | SourceHubvisor;

type Skill = {
  name: string;
  level: number;
};

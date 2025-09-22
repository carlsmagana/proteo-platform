export interface RDProject {
  id: number;
  name: string;
  status: string;
  progress: number;
  team: string;
  startDate: string;
  estimatedCompletion: string;
}

export interface Patents {
  filed: number;
  approved: number;
  pending: number;
}

export interface ResearchArea {
  area: string;
  budget: number;
  researchers: number;
}

export interface Publication {
  title: string;
  journal: string;
  date: string;
}

export interface Innovations {
  patents: Patents;
  researchAreas: ResearchArea[];
  publications: Publication[];
}

export interface Experiment {
  id: number;
  name: string;
  hypothesis: string;
  status: string;
  startDate: string;
  researcher: string;
  results: string;
}

export interface BudgetUtilization {
  totalBudget: number;
  utilized: number;
  remaining: number;
  utilizationRate: number;
}

export interface TeamPerformance {
  totalResearchers: number;
  activeProjects: number;
  completedProjects: number;
  successRate: number;
}

export interface InnovationIndex {
  score: number;
  ranking: string;
  improvementAreas: string[];
}

export interface RDMetrics {
  budgetUtilization: BudgetUtilization;
  teamPerformance: TeamPerformance;
  innovationIndex: InnovationIndex;
}

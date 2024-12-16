export type JiraPanelState = {
  [k in PanelStatus]: {
    [s in JiraStatus]?: Jira[];
  };
};
export interface Jira {
  id: string;
  title: string;
  description: string;
  image_url: string;
  assignee: { name: string; color: string };
  storyPoint: string;
  epic: { id: string; title: string; color: string };
  status: JiraStatus;
}
export enum PanelStatus {
  'PENDING' = 'PENDING',
  'IN_PROGRESS' = 'IN_PROGRESS',
  'COMPLETED' = 'COMPLETED',
}

export type JiraStatus =
  | 'PENDING'
  | 'DEV_IN_PROGRESS'
  | 'IN_REVIEW'
  | 'IN_TESTING'
  | 'PENDING_ROLLOUT'
  | 'COMPLETED'
  | 'CLOSED';

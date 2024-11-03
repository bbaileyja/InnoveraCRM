export type DealStage = 
  | 'potential'
  | 'quote_requested'
  | 'emergency'
  | 'planning'
  | 'site_visit'
  | 'quoting'
  | 'waiting_approval'
  | 'closed';

export type DealPipeline = 
  | 'pre_approval'
  | 'quoting'
  | 'active'
  | 'post_work';

export type ActivityType = 
  | 'note'
  | 'activity'
  | 'job'
  | 'reminder';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  pipeline: DealPipeline;
  stage: DealStage;
  owner: string;
  lastUpdated: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  activities: Activity[];
}
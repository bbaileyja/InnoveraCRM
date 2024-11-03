export const PIPELINES = {
  pre_approval: {
    name: 'Pre-Approval Admin',
    color: '#E5F6FD',
    stages: ['potential', 'quote_requested', 'work_requested', 'planning', 'assessment']
  },
  quoting: {
    name: 'Quoting Stage',
    color: '#FDF6E5',
    stages: ['quoting', 'waiting_approval']
  },
  active: {
    name: 'Active Projects',
    color: '#E5FDF6',
    stages: ['in_progress']
  },
  post_work: {
    name: 'Post Work',
    color: '#F6E5FD',
    stages: ['completed']
  }
};

export const STAGES = {
  potential: {
    name: 'Potential Project',
    color: '#E8F5E9', // Light green
    pipeline: 'pre_approval'
  },
  quote_requested: {
    name: 'Quote Requested',
    color: '#FFF3E0', // Light yellow
    pipeline: 'pre_approval'
  },
  work_requested: {
    name: 'Work Requested (Emergency)',
    color: '#FFEBEE', // Light red
    pipeline: 'pre_approval'
  },
  planning: {
    name: 'Planning',
    color: '#E3F2FD',
    pipeline: 'pre_approval'
  },
  assessment: {
    name: 'Assessment/Site Visit',
    color: '#F3E5F5',
    pipeline: 'pre_approval'
  },
  quoting: {
    name: 'Quoting Stage',
    color: '#FFF8E1',
    pipeline: 'quoting'
  },
  waiting_approval: {
    name: 'Waiting PO/Approval',
    color: '#E0F7FA',
    pipeline: 'quoting'
  },
  in_progress: {
    name: 'In Progress',
    color: '#E8F5E9',
    pipeline: 'active'
  },
  completed: {
    name: 'Completed',
    color: '#F1F8E9',
    pipeline: 'post_work'
  }
};

export const getStageColor = (stageId: string): string => {
  return STAGES[stageId]?.color || '#ffffff';
};
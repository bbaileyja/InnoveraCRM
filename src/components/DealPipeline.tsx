import React from 'react';
import { Activity, FileCheck, FileSearch, FileSpreadsheet, FileText, Timer } from 'lucide-react';

const stages = [
  { id: 'potential', name: 'Potential Project', icon: FileText },
  { id: 'quote', name: 'Quote Requested', icon: FileSpreadsheet },
  { id: 'work', name: 'Work Requested', icon: Activity },
  { id: 'planning', name: 'Planning', icon: Timer },
  { id: 'assessment', name: 'Assessment/Site Visit', icon: FileSearch },
  { id: 'quoting', name: 'Quoting Stage', icon: FileSpreadsheet },
  { id: 'waiting', name: 'Waiting PO/Approval', icon: Timer },
  { id: 'closed', name: 'Close Deal', icon: FileCheck },
];

interface DealPipelineProps {
  currentStage?: string;
  onStageChange: (stage: string) => void;
}

export default function DealPipeline({ currentStage = 'potential', onStageChange }: DealPipelineProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => onStageChange(stage.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{stage.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
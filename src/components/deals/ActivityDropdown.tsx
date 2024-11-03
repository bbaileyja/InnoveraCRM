import React, { useState } from 'react';
import { 
  MessageSquare, 
  CheckSquare, 
  MapPin, 
  Calendar,
  ChevronDown,
  Plus
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface Activity {
  id: string;
  type: 'comment' | 'task' | 'site-visit' | 'schedule';
  title: string;
  description: string;
  timestamp: string;
  completed?: boolean;
}

interface ActivityDropdownProps {
  activities: Activity[];
  onAddActivity: (type: Activity['type']) => void;
}

export default function ActivityDropdown({ activities, onAddActivity }: ActivityDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activityIcons = {
    comment: MessageSquare,
    task: CheckSquare,
    'site-visit': MapPin,
    schedule: Calendar,
  };

  const activityTypes = [
    { type: 'comment' as const, label: 'Add Comment' },
    { type: 'task' as const, label: 'Add Task' },
    { type: 'site-visit' as const, label: 'Schedule Site Visit' },
    { type: 'schedule' as const, label: 'Add to Schedule' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
      >
        <Plus className="w-4 h-4 mr-1" />
        Activity
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2 space-y-1">
            {activityTypes.map(({ type, label }) => {
              const Icon = activityIcons[type];
              return (
                <button
                  key={type}
                  onClick={() => {
                    onAddActivity(type);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 flex items-center"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              );
            })}
          </div>

          {activities.length > 0 && (
            <>
              <div className="border-t my-2" />
              <div className="p-2 max-h-48 overflow-y-auto">
                {activities.map((activity) => {
                  const Icon = activityIcons[activity.type];
                  return (
                    <div
                      key={activity.id}
                      className="px-3 py-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="flex items-start">
                        <Icon className="w-4 h-4 mt-1 mr-2 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Phone, Mail, Calendar, MessageSquare, Plus } from 'lucide-react';

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
  onAddActivity: () => void;
}

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: MessageSquare,
};

export default function ActivityTimeline({ activities, onAddActivity }: ActivityTimelineProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Activity Timeline</h3>
        <button
          onClick={onAddActivity}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Activity
        </button>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => {
            const Icon = activityIcons[activity.type];
            return (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-900">{activity.title}</p>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {activity.description}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
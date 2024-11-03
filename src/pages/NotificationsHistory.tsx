import React from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { formatDate } from '../utils/formatters';

export default function NotificationsHistory() {
  const { notifications, clearNotifications } = useNotificationStore();

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = formatDate(new Date(notification.timestamp));
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, typeof notifications>);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notification History</h1>
        <button
          onClick={clearNotifications}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
        >
          Clear All
        </button>
      </div>

      {Object.entries(groupedNotifications).map(([date, notifications]) => (
        <div key={date} className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{date}</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white rounded-lg shadow-sm p-4"
              >
                <h3 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
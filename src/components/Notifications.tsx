import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../store/notificationStore';

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, clearNotifications } = useNotificationStore();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Only show the notification bell if there are unread notifications
  if (unreadCount === 0) return null;

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      markAsRead();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNotificationClick}
        className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      </button>

      {isOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium">Notifications</h3>
            <button
              onClick={clearNotifications}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-200 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <h4 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { useNotificationStore } from './store/notificationStore';

// Add a demo notification on app start
const addDemoNotification = () => {
  const notificationStore = useNotificationStore.getState();
  notificationStore.addNotification({
    title: 'Welcome to Innovera CRM',
    message: 'This is a demo notification. You can view all notifications by clicking the bell icon.',
  });
};

// Add demo notification
addDemoNotification();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
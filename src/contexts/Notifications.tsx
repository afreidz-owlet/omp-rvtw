import { createContext, useContext, useState, useCallback } from "react";

import Notification from "../components/Notification";

const NotificationsContext = createContext<((message: string) => void) | undefined>(undefined);

export default function Provider({ children }: { children: JSX.Element }) {
  const [notifications, setNotifications] = useState<string[]>([]);

  const notify = useCallback((message: string) => {
    setNotifications(notifications => [...notifications, message])
  },[]);

  const dismiss = useCallback(() => {
    setNotifications(notifications => {
      const [_, ...rest] = notifications;
      return [...rest];
    })
  }, []);

  return (
    <NotificationsContext.Provider value={notify}>
      <>
      {notifications[0] && (
        <Notification data-testid="current-notification" onClick={() => dismiss()}>
          <>
            <span>{notifications[0]}</span>
            {notifications.length > 1 && (
              <small>and {notifications.length - 1} more</small>
            )}
          </>
        </Notification>
      )}
      {children}
      </>
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationsContext);

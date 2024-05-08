"use client";

export const NoticesList = ({notifications}) => { 
 return (
    <div className="text-sm text-navbaraction bg-white">
      {notifications.map((notification) => (
        <div key={notification.messageId} className="p-2 border rounded">
          {notification.notification.body}
        </div>
      ))}
    </div>
  );
};

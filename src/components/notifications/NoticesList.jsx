"use client";

export const NoticesList = () => {
  const notices = [
    { id: 1, message: "Your monthly report is ready to view." },
    { id: 2, message: "New updates are available for your software." },
    { id: 3, message: "Reminder: Team meeting tomorrow at 10 AM." }
  ];

  return (
    <div className="text-sm text-navbaraction">
      {notices.map((notice) => (
        <div key={notice.id} className={`p-2 border rounded`}>
          {notice.message}
        </div>
      ))}
    </div>
  );
};

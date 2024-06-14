const ActivitiesList = ({ notifications }) => {

    return (
        <div className="text-sm text-navbaraction bg-white">
            {/* {mentions.map(mention => (
                <div key={mention.id} className="flex items-center p-2 border rounded space-x-4">
                    <img src={mention.profilePic} alt="Profile" className="w-[46px] h-[46px] rounded-full" />
                    <div className="flex-grow">
                        <strong>{mention.user}</strong> {mention.message}
                    </div>
                    <img src={mention.postImage} alt="Post" className="w-[33px] h-[33px] rounded" />
                    <button className={"px-3 py-1 text-white rounded bg-brandprimary"}>
                        {mention.followType}
                    </button>
                </div>
            ))} */}
            <div className="text-sm text-navbaraction bg-white">
                {notifications.map((notification) => (
                    <div key={notification.messageId} className="p-2 border rounded">
                        {notification.notification.body}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivitiesList;

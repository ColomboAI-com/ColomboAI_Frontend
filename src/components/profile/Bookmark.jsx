import NoDataFound from "../NoDataFound";
import BookmarkCard from "./cards/BookmarkCard";

const Bookmark = ({ username }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 h-[calc(100dvh-725px)] min-h-[200px]">
        <img src={`/images/home/no-saved.svg`} />
        <p className="text-center text-sm text-gray-500">Nothing saved yet.</p>
      </div>
      {/* <div className="grid grid-cols-3 overflow-auto max-h-screen border-brandprimary border-2 ">
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
      </div> */}
    </>
  );
};

export default Bookmark;

import NoDataFound from "../NoDataFound";
import BookmarkCard from "./cards/BookmarkCard";

const Bookmark = ({username}) => {
  return (
    <>
    <div className="border-y-2 py-4 border-gray-300">
      <NoDataFound/>
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

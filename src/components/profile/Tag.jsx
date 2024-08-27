import NoDataFound from "../NoDataFound";
import TagCard from "./cards/TagCard";

const Tag = ({username}) => {
  return (
    <>
    <div className="border-y-2 py-4 border-gray-300">
      <NoDataFound/>
    </div>
      {/* <div className="grid grid-cols-3 overflow-auto max-h-screen border-brandprimary border-2">
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
      </div> */}
    </>
  );
};

export default Tag;

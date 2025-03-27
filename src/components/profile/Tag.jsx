import NoDataFound from "../NoDataFound";
import TagCard from "./cards/TagCard";

const Tag = ({ username }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 h-[calc(100dvh-725px)] min-h-[200px]">
        <img src={`/images/home/no-tagged.svg`} />
        <p className="text-center text-sm text-gray-500">No tags yet.</p>
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

import React from "react";
import SuggestionCard from "./SuggestionCard";
import RightSidebar from "../layouts/RightSidebar";

const Suggestions = () => {
  return (
    <div>
      <div className="text-center text-brandplaceholder mb-4">Some Suggestions For You</div>
      <div className={`overflow-y-auto no-scrollbar md:hidden self-start sm:w-[100%] pt-[13px] px-2 relative`}>
        <RightSidebar />
      </div>
      <div className="grid grid-cols-3 overflow-auto max-h-screen">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
      <div className="grid grid-cols-3 overflow-auto max-h-screen">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
      <div className="grid grid-cols-3 overflow-auto max-h-screen">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
      <div className="grid grid-cols-3 overflow-auto max-h-screen">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
      <div className="grid grid-cols-3 overflow-auto max-h-screen">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
    </div>
  );
};

export default Suggestions;

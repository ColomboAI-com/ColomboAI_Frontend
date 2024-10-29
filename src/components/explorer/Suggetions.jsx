import React from "react";
import SuggestionCard from "./SuggestionCard";
import SuggestedVibes from "../layouts/SuggestedVibes";

const Suggestions = () => {
  return (
    <div>
      <div className="text-center text-brandplaceholder mb-4">Some Suggestions For You</div>
      <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between py-[12px]">
        <SuggestedVibes />
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

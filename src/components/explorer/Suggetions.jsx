import React from 'react';
import SuggestionCard from "./SuggestionCard";

const Suggestions = () => {
    return (
        <div>
            <div className="text-center text-brandplaceholder mb-4">
                Some Suggestions For You
            </div>
            <div className="grid grid-cols-3 overflow-auto max-h-screen border-brandprimary border-2">
                <SuggestionCard/>
                <SuggestionCard/>
                <SuggestionCard/>
                <SuggestionCard/>
                <SuggestionCard/>
                <SuggestionCard/>
            </div>
        </div>
    );
}

export default Suggestions;

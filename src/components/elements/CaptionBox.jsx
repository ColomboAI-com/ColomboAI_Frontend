import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { SendIcon } from "../Icons";

const CaptionBox = ({
  postInput,
  setPostInput,
  promptInput,
  setPromptInput,
  isMagicPenInputVisible,
  handleGenerateVibe,
  loadings,
}) => {
  const wordCount = postInput.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <textarea
            value={postInput}
            placeholder="Write your caption here"
            onChange={(e) => setPostInput(e.target.value)}
            className="w-full p-3 rounded-md text-gray-700 bg-white placeholder-gray-400 text-sm resize-none outline-none mb-1"
            rows={3}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {wordCount}/300
          </div>
        </div>

        {isMagicPenInputVisible && (
          <div className="relative">
            <div className="border border-blue-300 rounded-md">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask or create anything"
                className="w-full p-3 pr-12 rounded-md text-gray-700 bg-gray-50 placeholder-gray-400 text-sm resize-none outline-none"
                rows={2}
              />
              <button
                className="absolute right-2 bottom-2"
                onClick={handleGenerateVibe}
              >
                {loadings.generatePost ? (
                  <ThreeDots
                    visible={true}
                    height="85"
                    width="20"
                    color="#3B82F6"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  <SendIcon
                    w={20}
                    h={85}
                    fill={promptInput !== "" ? "#3B82F6" : "#E5E7EB"}
                  />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptionBox;

// import React from "react";
// import { ThreeDots } from "react-loader-spinner";
// import { SendIcon } from "../Icons";

// const CaptionBox = ({
//   postInput,
//   setPostInput,
//   promptInput,
//   setPromptInput,
//   isMagicPenInputVisible,
//   handleGenerateVibe,
//   loadings,
// }) => {
//   const wordCount = postInput.trim().split(/\s+/).filter(Boolean).length;

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <textarea
//           value={postInput}
//           placeholder="Write your caption here"
//           onChange={(e) => setPostInput(e.target.value)}
//           className="w-full p-3 rounded-md text-gray-700 bg-white placeholder-gray-400 text-sm resize-none outline-none mb-4"
//           rows={3}
//         />

//         {isMagicPenInputVisible && (
//           <div className="relative">
//             <div className="border border-blue-300 rounded-md">
//               <textarea
//                 value={promptInput}
//                 onChange={(e) => setPromptInput(e.target.value)}
//                 placeholder="Ask or create anything"
//                 className="w-full p-3 pr-12 rounded-md text-gray-700 bg-gray-50 placeholder-gray-400 text-sm resize-none outline-none"
//                 rows={2}
//               />
//               <button
//                 className="absolute right-2 bottom-2"
//                 onClick={handleGenerateVibe}
//               >
//                 {loadings.generatePost ? (
//                   <ThreeDots
//                     visible={true}
//                     height="85"
//                     width="20"
//                     color="#3B82F6"
//                     radius="9"
//                     ariaLabel="three-dots-loading"
//                   />
//                 ) : (
//                   <SendIcon
//                     w={20}
//                     h={85}
//                     fill={promptInput !== "" ? "#3B82F6" : "#E5E7EB"}
//                   />
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CaptionBox;

import { FeedContext } from "@/context/FeedContext";
import Button from "@/elements/Button";
import { useContext, useState } from "react";

const AIMessageGenerator = ({ onConfirm }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");

  const { generateComment: generateCommentContext } = useContext(FeedContext);

  const genetate = async () => {
    setLoading(true);
    const { generatedComment } = await generateCommentContext({
      prompt: prompt,
    });
    setGeneratedMessage(generatedComment);
    setLoading(false);
  };

  const onChange = (e) => {
    setPrompt(e.target.value);
  };

  const changePrompt = (e) => {
    setPrompt("");
    setGeneratedMessage("");
  };

  const handleConfirmMessage = () => {
    onConfirm(generatedMessage);
  };

  return (
    <div>
      {generatedMessage ? (
        <p>
          {generatedMessage}
          <br />
          <br />
        </p>
      ) : (
        <textarea
          onChange={onChange}
          value={prompt}
          placeholder="Write your AI prompt"
          className="w-full h-[100px] p-4 rounded-lg border border-px border-gray outline-none"
        />
      )}
      <div className="flex justify-center mt-4 gap-4">
        {!generatedMessage && (
          <Button
            onClick={genetate}
            title={"Generate"}
            className={
              "w-fit text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-2 px-4"
            }
            loading={loading}
          />
        )}
        {generatedMessage && (
          <>
            <Button
              onClick={changePrompt}
              title={"Change Prompt"}
              className={
                "w-fit text-brandprimary rounded-full bg-white py-2 px-4 border border-px border-brandprimary"
              }
              loading={loading}
            />
            <Button
              onClick={handleConfirmMessage}
              title={"Use this message"}
              className={
                "w-fit text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-2 px-4"
              }
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIMessageGenerator;

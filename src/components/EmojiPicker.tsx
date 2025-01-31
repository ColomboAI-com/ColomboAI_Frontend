import Picker from "emoji-picker-react";
import React from "react";
import useToggle from "../hooks/useToggle";
import useClickOutside from "../hooks/useClickOutside";

const EmojiPicker = ({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: any;
}) => {
  const [show, toggle, hide] = useToggle(false);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const onEmojiClick = (event, emojiObject) => {
    onSelect(event);
    hide();
  };
  const clickRef = React.useRef<any>();

  useClickOutside(clickRef, () => hide());

  const calculatePosition = () => {
    const rect = clickRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Check if there's enough space below the input
    if (spaceBelow < 300) {
      // Adjust this value based on the height of the Picker
      return "top"; // Not enough space below, open above
    }
    return "bottom"; // Enough space below, open below
  };

  return (
    <div className="relative" ref={clickRef}>
      <span onClick={toggle}>{children}</span>
      {show && (
        <div className={`fixed bottom-[100px] z-50 ${calculatePosition()}`}>
          <Picker native={true} onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;

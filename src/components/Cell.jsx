import { useLongPress } from "use-long-press";
import { useRef } from "react";

export default function Cell({
  isMine,
  neighborMines,
  isRevealed,
  isFlagged,
  onClick,
  onRightClick,
  onLongPress,
}) {
  let classN;
  const longPressTriggered = useRef(false);

  const bind = useLongPress(
    () => {
      longPressTriggered.current = true;
      onLongPress();
    },
    {
      threshold: 500,
      captureEvent: true,
      cancelOnMovement: true,
    }
  );

  const handleClick = () => {
    if (longPressTriggered.current) {
      longPressTriggered.current = false;
      return;
    }
    onClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onRightClick();
  };

  let content = null;
  if (!isRevealed && isFlagged) {
    content = "🚩";
    classN = "flag";
  } else if (isRevealed) {
    classN = "revealed";
    if (isMine) {
      content = "💣";
      classN += " mine";
    } else if (neighborMines > 0) {
      content = neighborMines;
    }
  }

  return (
    <td
      {...bind()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      className={classN}
    >
      {content}
    </td>
  );
}

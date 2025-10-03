export default function Cell({
  isMine,
  neighborMines,
  isRevealed,
  isFlagged,
  onClick,
  onRightClick,
}) {
  let classN;

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
    <td onClick={onClick} onContextMenu={handleRightClick} className={classN}>
      {content}
    </td>
  );
}

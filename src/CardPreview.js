import { useDragLayer } from "react-dnd";

import Card from "./Card";

const cardPreviewStyles = ({ width = 0, top = 0, left = 0 }) => ({
  position: "absolute",
  top,
  left,
  width,
  zIndex: 3090,
  pointerEvents: "none"
});

const CardPreview = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  if (!item || !item.cardRef || !isDragging || !currentOffset) {
    return null;
  }

  const { x: left, y: top } = currentOffset;
  const width = item.cardRef.clientWidth;

  return (
    <div style={cardPreviewStyles({ width, top, left })}>
      <Card {...item} />
    </div>
  );
};

export default CardPreview;

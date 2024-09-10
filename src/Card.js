import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export const cardStyles = ({ opacity = 1 }) => ({
  padding: 16,
  background: "#2C2C2E",
  color: "#fff",
  cursor: "pointer",
  borderRadius: 4,
  opacity
});

const Card = ({ id, index, note, enableDnd = false, onSort }) => {
  const cardRef = useRef(null);

  const [opacity, drag, preview] = useDrag({
    type: "item",
    canDrag: enableDnd,
    item: () => {
      document.body.classList.add("dragging");
      return { id, index, note, cardRef: cardRef.current };
    },
    collect: (monitor) => (monitor.isDragging() ? 0 : 1),
    end: () => document.body.classList.remove("dragging")
  });

  const [, drop] = useDrop({
    accept: "item",
    canDrop: () => enableDnd,
    hover: (item, monitor) => {
      if (!cardRef.current || item.index === index || item.id === id) {
        return;
      }

      const hoverRect = cardRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const hoverClientY = (monitor.getClientOffset()?.y || 0) - hoverRect.top;

      if (item.index < index && hoverClientY < hoverMiddleY) {
        return;
      }
      if (item.index > index && hoverClientY > hoverMiddleY) {
        return;
      }

      onSort(item.index, index);
      item.index = index;
    }
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, [preview]);

  drag(drop(cardRef));

  return (
    <div ref={cardRef} key={id} style={cardStyles({ opacity })}>
      {note}
    </div>
  );
};

export default Card;

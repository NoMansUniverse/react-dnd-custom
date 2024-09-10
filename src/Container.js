import { useEffect, useRef, useState } from "react";
import { useDragDropManager } from "react-dnd";
import { loremIpsum } from "lorem-ipsum";

import "./styles.css";
import Card from "./Card";

const SCROLL_SPEED = 5;
const BOUND_HEIGHT = 70;

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 350,
  height: 500,
  background: "#F2F3F6",
  overflow: "auto",
};

const CARDS = Array.from({ length: 20 }).map((_, idx) => ({
  id: Date.now() + idx * 1000,
  note: loremIpsum({ count: ~~(Math.random() * 2) }),
}));

const Container = () => {
  const [cards, setCards] = useState(CARDS);
  const containerRef = useRef(null);

  const dndManager = useDragDropManager();
  const monitor = dndManager.getMonitor();

  useEffect(() => {
    const unsubscribe = monitor.subscribeToOffsetChange(() => {
      handleScroll(monitor.getSourceClientOffset()?.y);
    });
    return unsubscribe;
  }, [monitor]);

  const handleScroll = (offsetY) => {
    if (!!containerRef.current && !!offsetY) {
      const scrollTop = containerRef.current.scrollTop;
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      if (offsetY > bottom - BOUND_HEIGHT) {
        return (containerRef.current.scrollTop = scrollTop + SCROLL_SPEED);
      }
      if (offsetY < top + BOUND_HEIGHT) {
        return (containerRef.current.scrollTop = scrollTop - SCROLL_SPEED);
      }
    }
  };

  const handleSort = (dragIdx, hoverIdx) => {
    setCards((prev) => {
      const newCards = prev.slice();
      const removed = newCards.splice(dragIdx, 1);
      newCards.splice(hoverIdx, 0, removed[0]);
      return newCards;
    });
  };

  return (
    <div ref={containerRef} style={containerStyles}>
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          index={idx}
          {...card}
          enableDnd
          onSort={handleSort}
        />
      ))}
    </div>
  );
};

export default Container;

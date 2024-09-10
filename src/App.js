import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import "./styles.css";
import Container from "./Container";
import CardPreview from "./CardPreview";

export default function App() {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Container />
      <CardPreview />
    </DndProvider>
  );
}

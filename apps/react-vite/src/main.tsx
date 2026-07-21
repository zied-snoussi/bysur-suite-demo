// Library stylesheet imported ONCE, at the app entry.
import "@zied-snoussi/ui/styles.css";
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("#root not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);

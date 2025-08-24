import React from "react";
import { TabsBar, TabButton, PlusIcon } from "./CategoryTabs.styles";

export default function CategoryTabs({ tabs = [], activeId, onChange, onAdd }) {
  return (
    <TabsBar>
      {tabs.map((tab) => (
        <TabButton
          type="button"        
          key={tab.id}
          $active={activeId === tab.id}
          onClick={() => onChange?.(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}

      {typeof onAdd === "function" && (
      <button
        onClick={onAdd}
        style={{ all: "unset", cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
      >
          <PlusIcon />
        </button>
      )}
    </TabsBar>
  );
}

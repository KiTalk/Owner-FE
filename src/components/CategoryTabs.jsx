import React from "react";
import { TabsBar, TabButton } from "./CategoryTabs.styles";

export default function CategoryTabs({ tabs = [], activeId, onChange }) {
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
    </TabsBar>
  );
}

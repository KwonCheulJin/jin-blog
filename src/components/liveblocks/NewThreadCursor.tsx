"use client";

import { useEffect, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
// NewThreadCursor.module.css migrated to TailwindCSS

export function NewThreadCursor({ display }: { display: boolean }) {
  const [coords, setCoords] = useState({
    x: -10000,
    y: -10000,
  });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", updatePosition, false);
    document.addEventListener("mouseenter", updatePosition, false);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  useEffect(() => {
    if (display) {
      document.documentElement.classList.add("hide-cursor");
    } else {
      document.documentElement.classList.remove("hide-cursor");
    }
  }, [display]);

  if (!display) {
    return null;
  }

  return (
    <Portal.Root>
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 select-none w-9 h-9 shadow-md rounded-tl rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%] cursor-grab bg-white"
        style={{
          transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
      />
    </Portal.Root>
  );
}

"use client";
import { useEffect, useCallback } from "react";
import { useInspectorStore } from "@/lib/store";

function InspectIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M2.46969 2.46969C2.67056 2.26882 2.96769 2.19867 3.23719 2.28851L21.2372 8.28851C21.5434 8.39059 21.75 8.6772 21.75 9.00002C21.75 9.32284 21.5434 9.60945 21.2372 9.71153L12.5929 12.5929L9.71153 21.2372C9.60945 21.5434 9.32284 21.75 9.00002 21.75C8.6772 21.75 8.39059 21.5434 8.28851 21.2372L2.28851 3.23719C2.19867 2.96769 2.26882 2.67056 2.46969 2.46969Z'
        fill='#141B34'
      />
    </svg>
  );
}

export default function InspectorTool() {
  const { isInspecting, toggleInspecting, setSelectedElement, setHoveredElement } =
    useInspectorStore();

  // handle hover
  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      if (!isInspecting) return;
      e.stopPropagation();
      const target = e.target as HTMLElement;
      setHoveredElement(target);
    },
    [isInspecting, setHoveredElement]
  );

  // handle click
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!isInspecting) return;
      e.preventDefault();
      e.stopPropagation();
      const target = e.target as HTMLElement;
      setSelectedElement(target);
      setHoveredElement(null);
      toggleInspecting();
    },
    [isInspecting, setSelectedElement, setHoveredElement, toggleInspecting]
  );

  // add right click handler
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      if (!isInspecting) return;
      e.preventDefault();
      toggleInspecting();
      setHoveredElement(null);
    },
    [isInspecting, toggleInspecting, setHoveredElement]
  );

  useEffect(() => {
    if (isInspecting) {
      document.body.style.cursor = "crosshair";
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("click", handleClick);
      document.addEventListener("contextmenu", handleContextMenu);
    } else {
      document.body.style.cursor = "default";
      setHoveredElement(null);
    }

    // removing event listeners when inspect mode is off
    return () => {
      document.body.style.cursor = "default";
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [isInspecting, handleMouseOver, handleClick, handleContextMenu, setHoveredElement]);

  const handleClear = () => {
    setSelectedElement(null);
    setHoveredElement(null);
  };

  const handleStartInspecting = () => {
    handleClear();
    toggleInspecting();
  }

  return (
    <div className='flex gap-2'>
      <button
        onClick={handleStartInspecting}
        className={`p-2 rounded flex ml-auto gap-2 tracking-tighter ${
          isInspecting ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
        }`}
        title='Select an element to inspect'>
        Inspect
        <span>
          <InspectIcon />
        </span>
      </button>
      <button
        className='p-2 rounded flex tracking-tighter bg-gray-100 hover:bg-gray-200'
        onClick={handleClear}
        title='Clear'>
        Clear
      </button>
    </div>
  );
}

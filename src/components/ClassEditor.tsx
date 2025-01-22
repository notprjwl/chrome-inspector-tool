"use client";
import { useState, useEffect } from "react";
import { useInspectorStore } from "@/lib/store";

export default function ClassEditor() {
  const { selectedElement } = useInspectorStore();
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState("");

  // getting classes of the selected element from the store
  useEffect(() => {
    if (selectedElement) {
      setClasses(Array.from(selectedElement.classList)); // converting DOMTokenList to an array
    }
  }, [selectedElement]);

  // update classes
  const updateClasses = (newClasses: string[]) => {
    if (selectedElement) {
      selectedElement.className = newClasses.join(" ");
      setClasses(newClasses);
    }
  };

  // adding a new class
  const addClass = (classNames: string) => {
    const newClasses = classNames
      .split(" ") // split by space
      .map((cls) => cls.trim())
      .filter((cls) => cls && !classes.includes(cls)); 

    if (newClasses.length > 0) {
      updateClasses([...classes, ...newClasses]);
    }
    setNewClass("");
  };

  // removing a class
  const removeClass = (className: string) => {
    updateClasses(classes.filter((c) => c !== className));
  };

  if (!selectedElement) return null;

  // console.log(classes);

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Element Classes</label>
        <div className='flex flex-wrap gap-2'>
          {classes.map((cls) => (
            <span
              key={cls}
              className='inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm'>
              {cls}
              <button
                onClick={() => removeClass(cls)}
                className='text-gray-500 hover:text-gray-700'>
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className='flex gap-2'>
        <input
          type='text'
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addClass(newClass)}
          placeholder='Add new tailwind class'
          className='flex-1 px-3 py-2 border rounded-md text-sm'
        />
        <button
          onClick={() => addClass(newClass)}
          className='px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600'>
          Add
        </button>
      </div>
    </div>
  );
}

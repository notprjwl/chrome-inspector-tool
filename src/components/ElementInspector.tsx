"use client";
import { useEffect, useState } from "react";
import { useInspectorStore } from "@/lib/store";

// dimensions type
interface Dimensions {
  top: number;
  left: number;
  width: number;
  height: number;
}

// spacing type
interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// elementMetrics type
interface ElementMetrics {
  dimensions: Dimensions;
  padding: Spacing;
  margin: Spacing;
  elementInfo: string;
}

export default function ElementInspector() {
  const { hoveredElement, selectedElement } = useInspectorStore(); // getting data from the store
  const [metrics, setMetrics] = useState<ElementMetrics | null>(null);

  useEffect(() => {
    const element = hoveredElement || selectedElement;
    if (!element) {
      setMetrics(null);
      return;
    }

    // get element size and position 
    const rect = element.getBoundingClientRect();

    // get element computed style like margin, padding
    const computedStyle = window.getComputedStyle(element);

    // console.log(computedStyle);

    // calculate basic dimensions
    const dimensions = {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };

    // calculate padding
    const padding = {
      top: parseInt(computedStyle.paddingTop) || 0,
      right: parseInt(computedStyle.paddingRight) || 0,
      bottom: parseInt(computedStyle.paddingBottom) || 0,
      left: parseInt(computedStyle.paddingLeft) || 0,
    };

    // calculate margin
    const margin = {
      top: parseInt(computedStyle.marginTop) || 0,
      right: parseInt(computedStyle.marginRight) || 0,
      bottom: parseInt(computedStyle.marginBottom) || 0,
      left: parseInt(computedStyle.marginLeft) || 0,
    };

    console.log(element.classList)

    // generate element info
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : "";
    const classes = Array.from(element.classList).join(".");
    const elementInfo = `${tag}${id}${classes ? `.${classes}` : ""}`;

    setMetrics({ dimensions, padding, margin, elementInfo });
  }, [hoveredElement, selectedElement]);

  if (!metrics) return null;

  const { dimensions, padding, margin, elementInfo } = metrics;

  const isElementSelected = !!selectedElement;

  return (
    <>
      {/* MAIN ELEMENT BOX */}
      {!isElementSelected && (
      <div
        className='fixed pointer-events-none z-[9999] transition-all duration-100'
        style={{
          top: `${dimensions.top}px`,
          left: `${dimensions.left}px`,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          // boxShadow: '0 0 0 1px #6366F1',
          backgroundColor: "rgba(160, 197, 232, 0.8)",
        }}>

        {/* ELEMENT INFO TOOLTIP */}
        <div className='absolute top-0 left-0 transform -translate-y-6 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap'>
          {elementInfo}
          <span className='ml-2 text-gray-400'>
            {dimensions.width}px × {dimensions.height}px
          </span>
        </div>

        {/* MARGIN OVERLAYS */}
        {/* top margin */}
        {margin.top > 0 && (
          <div
            className='absolute left-0 right-0 -z-[9999]'
            style={{
              height: `${margin.top}px`,
              top: `-${margin.top}px`,
              backgroundColor: "rgba(249, 204, 157, 255)",
            }}>
            <div className='absolute w-full text-center text-xs text-red-700'>{margin.top}px</div>
          </div>
        )}
        
        {/* right margin */}
        {margin.right > 0 && (
          <div
            className='absolute top-0 bottom-0'
            style={{
              width: `${margin.right}px`,
              right: `-${margin.right}px`,
              backgroundColor: "rgba(249, 204, 157, 255)",
            }}>
            <div className='absolute h-full right-0 flex items-center mr-1 text-xs text-red-700'>
              {margin.right}px
            </div>
          </div>
        )}

        {/* bottom margin */}
        {margin.bottom > 0 && (
          <div
            className='absolute left-0 right-0'
            style={{
              height: `${margin.bottom}px`,
              bottom: `-${margin.bottom}px`,
              backgroundColor: "rgba(249, 204, 157, 255)",
            }}>
            <div className='absolute w-full text-center text-xs text-red-700'>
              {margin.bottom}px
            </div>
          </div>
        )}

        {/* left margin */}
        {margin.left > 0 && (
          <div
            className='absolute top-0 bottom-0'
            style={{
              width: `${margin.left}px`,
              left: `-${margin.left}px`,
              backgroundColor: "rgba(249, 204, 157, 255)",
            }}>
            <div className='absolute h-full left-0 flex items-center ml-1 text-xs text-red-700'>
              {margin.left}px
            </div>
          </div>
        )}

        {/* PADDING OVERLAYS */}
        {/* top padding */}
        {padding.top > 0 && (
          <div
            className='absolute left-0 right-0'
            style={{
              height: `${padding.top}px`,
              top: 0,
              backgroundColor: "rgba(195, 222, 183, 255)",
            }}>
            <div className='absolute w-full text-center top-0 text-xs text-green-700'>
              {padding.top}px
            </div>
          </div>
        )}

        {/* right padding  */}
        {padding.right > 0 && (
          <div
            className='absolute top-0 bottom-0'
            style={{
              width: `${padding.right}px`,
              right: 0,
              backgroundColor: "rgba(195, 222, 183, 255)",
            }}>
            <div className='absolute h-full right-0 flex items-center mr-1 text-xs text-green-700'>
              {padding.right}px
            </div>
          </div>
        )}

        {/* bottom padding */}
        {padding.bottom > 0 && (
          <div
            className='absolute left-0 right-0'
            style={{
              height: `${padding.bottom}px`,
              bottom: 0,
              backgroundColor: "rgba(195, 222, 183, 255)",
            }}>
            <div className='absolute w-full text-center bottom-0 text-xs text-green-700'>
              {padding.bottom}px
            </div>
          </div>
        )}

        {/* left padding */}
        {padding.left > 0 && (
          <div
            className='absolute top-0 bottom-0'
            style={{
              width: `${padding.left}px`,
              left: 0,
              backgroundColor: "rgba(195, 222, 183, 255)",
            }}>
            <div className='absolute h-full left-0 flex items-center ml-1 text-xs text-green-700'>
              {padding.left}px
            </div>
          </div>
        )}
      </div>)}
    </>
  );
}

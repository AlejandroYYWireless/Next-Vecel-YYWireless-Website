"use client";
import { useEffect } from "react";

/**
 * A component that removes the scrollbar from the page when mounted
 * and restores it when unmounted.
 */
const RemoveScrollbar = () => {
  useEffect(() => {
    // make a stylesheet element
    const stylesheet = document.createElement("style");
    stylesheet.id = "hide-document-scrollbar";

    // create CSS to hide scrollbar on html/body
    const css = `
      body {
        ::-webkit-scrollbar {
           width: 0px;
        }
      }
    `;

    stylesheet.textContent = css;
    document.head.appendChild(stylesheet);

    // Clean up function to remove the stylesheet when unmounting so other pages still have scrollbar unless explicitly removed
    return () => {
      const styleElement = document.getElementById("hide-document-scrollbar");
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // This component doesn't render anything so we just return null
  return null;
};

export default RemoveScrollbar;

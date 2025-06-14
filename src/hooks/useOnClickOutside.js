import React, { useEffect } from "react";

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      console.log("ref", ref.current);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener); // 모바일

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener); // 모바일
    };
  }, []);

  return <div>useOnClickOutside</div>;
};

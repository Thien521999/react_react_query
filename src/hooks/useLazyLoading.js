import React, { useRef, useEffect } from "react";
import { useInview } from "./useInview";

export const useLazyLoading = () => {
  const { inview, ref } = useInview();

  useEffect(() => {
    const img = ref.current;

    if (inview) {
      img.setAttribute("src", img.alt);
      img.classList.add("active");
    }
  }, [inview]);

  return {
    ref,
  };
};

export default useLazyLoading;

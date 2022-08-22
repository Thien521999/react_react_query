import React, { useEffect, useRef, useState } from "react";


export const useInview = () => {
  const [inview, setInview] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const el = ref.current;

    const observer = new IntersectionObserver((entries) => {
      console.log(entries);

      // if (entries[0].intersectionRatio <= 0) return;

      // console.log('Loaded new items');
    });
  }, []);
  return {};
};

import { useEffect, useRef, useState } from "react";

export const useInview = () => {
  const [inview, setInview] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const el = ref.current;

    const observer = new IntersectionObserver((entries) => {
      setInview(entries[0].isIntersecting);
    });

    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve();
    };
  }, []);

  return {
    inview,
    ref,
  };
};

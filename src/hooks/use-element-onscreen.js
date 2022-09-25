import { useEffect, useRef, useState } from 'react';

const useElementOnScreen = options => {
  const containerRef = useRef(null);
  const [observerEntery, setIsVisible] = useState({});

  const callBackFunc = entries => {
    const [entery] = entries;
    setIsVisible({
      isVisible: entery.isIntersecting,
      intersectionRect: entery.intersectionRect,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFunc, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, observerEntery];
};

export default useElementOnScreen;

import { useState, useEffect } from 'react';

const useResponsiveHook = () => {
  const [screenSize, setScreenSize] = useState('md');

  useEffect(() => {
    const mediaQueryLists = {
      xs: window.matchMedia('(max-width: 639px)'),
      sm: window.matchMedia('(min-width: 640px) and (max-width: 767px)'),
      md: window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      lg: window.matchMedia('(min-width: 1024px) and (max-width: 1279px)'),
      xl: window.matchMedia('(min-width: 1280px) and (max-width: 1535px)'),
      xxl: window.matchMedia('(min-width: 1536px) and (max-width: 1919px)'),
      xxxl: window.matchMedia('(min-width: 1920px) and (max-width: 2559px)'),
      xxxxl: window.matchMedia('(min-width: 2560px)'),
    };
    

    const getScreenSize = () => {
      if (mediaQueryLists.xs.matches) return 'xs';
      if (mediaQueryLists.sm.matches) return 'sm';
      if (mediaQueryLists.md.matches) return 'md';
      if (mediaQueryLists.lg.matches) return 'lg';
      if (mediaQueryLists.xl.matches) return 'xl';
      if (mediaQueryLists.xxl.matches) return '2xl';
      if (mediaQueryLists.xxxl.matches) return '3xl';
      if (mediaQueryLists.xxxxl.matches) return '4xl';
      return 'md';
    };

    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    // Check initial state
    handleResize();

    // Add resize event listeners
    Object.values(mediaQueryLists).forEach(mql =>
      mql.addEventListener('change', handleResize)
    );

    return () => {
      // Remove resize event listeners
      Object.values(mediaQueryLists).forEach(mql =>
        mql.removeEventListener('change', handleResize)
      );
    };
  }, []);

  return screenSize;
};

export default useResponsiveHook;

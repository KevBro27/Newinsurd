
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Do not scroll to top if a specific scroll instruction is present
    if (state?.scrollTo) {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
}

export default ScrollToTop;

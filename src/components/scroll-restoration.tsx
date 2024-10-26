// ScrollRestoration.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePositionActions } from "@/stores/scroll-store";

const ScrollRestoration = () => {
  const location = useLocation();
  const { savePosition, getPosition } = usePositionActions();

  // Save the scroll position when leaving the current page
  useEffect(() => {
    const handleSaveScroll = () => {
      savePosition(location.pathname, window.scrollY);
    };

    window.addEventListener("beforeunload", handleSaveScroll); // For refreshing
    window.addEventListener("popstate", handleSaveScroll); // For back/forward navigation

    return () => {
      handleSaveScroll();
      window.removeEventListener("beforeunload", handleSaveScroll);
      window.removeEventListener("popstate", handleSaveScroll);
    };
  }, [location.pathname, savePosition]);

  // Restore the scroll position when arriving on a new page
  useEffect(() => {
    const savedPosition = getPosition(location.pathname);
    if (location.pathname === "/store") {
      setTimeout(() => window.scrollTo(0, savedPosition), 0);
    }

    window.scrollTo(0, savedPosition);
  }, [location.pathname, location.hash, getPosition]);

  return null;
};

export default ScrollRestoration;

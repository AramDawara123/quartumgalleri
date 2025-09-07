import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL has a hash, scroll to that element; otherwise, go to top.
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        (el as HTMLElement).scrollIntoView({ block: "start" });
        return;
      }
    }

    // Ensure we reset scroll position instantly on route change
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}

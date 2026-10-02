import { restInsert } from "./rest";

// Browsers where the admin has logged in are excluded so your own visits don't skew stats.
export const ADMIN_FLAG_KEY = "pf_admin";
const VISITOR_KEY = "pf_vid";

function isLocalHost() {
  const h = location.hostname;
  return h === "localhost" || h === "127.0.0.1" || /^(192\.168|10\.|172\.(1[6-9]|2\d|3[01]))\./.test(h);
}

function shouldTrack() {
  try {
    return !isLocalHost() && localStorage.getItem(ADMIN_FLAG_KEY) !== "1";
  } catch {
    return !isLocalHost();
  }
}

function visitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

function device() {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "Mobile";
  return "Desktop";
}

function referrer() {
  const utm = new URLSearchParams(location.search).get("utm_source");
  if (utm) return utm.slice(0, 200);
  if (!document.referrer) return "";
  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    return host === location.hostname.replace(/^www\./, "") ? "" : host;
  } catch {
    return "";
  }
}

function linkLabel(el: HTMLElement) {
  const label =
    el.dataset.track ||
    el.getAttribute("aria-label") ||
    el.textContent?.replace(/\s+/g, " ").trim() ||
    el.getAttribute("href") ||
    "link";
  return label.slice(0, 80);
}

/** Logs one page view and starts recording link/button clicks. */
export function startTracking() {
  if (!shouldTrack()) return;
  const vid = visitorId();

  restInsert("page_views", { visitor_id: vid, path: location.pathname.slice(0, 200), referrer: referrer(), device: device() });

  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("a, button[data-track]");
    if (!el) return;
    restInsert("events", { visitor_id: vid, name: "click", label: linkLabel(el) });
  });
}

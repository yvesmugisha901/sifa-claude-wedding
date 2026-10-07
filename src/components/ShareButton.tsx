import { MessageCircle, Share2 } from "lucide-react";
import { names } from "../data/wedding";

export function ShareButton() {
  const text = `You are warmly invited to celebrate the wedding of ${names}. ❤️`;
  const url = typeof window === "undefined" ? "" : window.location.href;
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  const share = async () => {
    try { await navigator.share({ title: `${names} — Wedding Invitation`, text, url }); }
    catch { /* user cancelled */ }
  };
  return canShare ? (
    <button type="button" onClick={share} className="btn btn-gold"><Share2 size={16} aria-hidden="true" />Share invitation</button>
  ) : (
    <a className="btn btn-gold" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}>
      <MessageCircle size={16} aria-hidden="true" />Share on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

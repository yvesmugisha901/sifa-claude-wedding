import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [["#home", "Home"], ["#story", "Our story"], ["#events", "Events"], ["#gallery", "Gallery"], ["#contact", "Contact"]];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="Main" className="fixed inset-x-0 top-0 z-40 bg-ink/70 text-ivory backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="font-display text-xl italic text-gold">S &amp; C</a>
        <ul className="hidden gap-8 text-sm md:flex">
          {links.map(([href, label]) => <li key={href}><a href={href} className="py-2 hover:text-gold">{label}</a></li>)}
        </ul>
        <button type="button" className="grid size-11 place-items-center md:hidden" aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <ul id="mobile-menu" className="border-t border-ivory/10 bg-ink px-5 pb-4 md:hidden">
          {links.map(([href, label]) => (
            <li key={href}><a href={href} onClick={() => setOpen(false)} className="block py-3 text-lg font-display">{label}</a></li>
          ))}
        </ul>
      )}
    </nav>
  );
}

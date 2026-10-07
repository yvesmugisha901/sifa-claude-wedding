import { Pause, Play } from "lucide-react";

interface Props { playing: boolean; onToggle: () => void }

export function MusicPlayer({ playing, onToggle }: Props) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={playing} aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-4 left-4 z-40 flex h-12 items-center gap-3 rounded-full border border-gold/60 bg-ink/85 px-4 text-sm text-gold backdrop-blur-sm">
      {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      <span>Music</span>
      {playing && <span aria-hidden="true" className="eq flex h-3 items-end gap-0.5"><span /><span /><span /></span>}
    </button>
  );
}

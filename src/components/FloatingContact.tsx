import { useState } from "react";
import { Mail, Github, Linkedin, MessageCircle, ChevronUp } from "lucide-react";
import { profile } from "@/lib/data";
import Button from "@/components/ui/button";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[95]">
      {open && (
        <div className="mb-2 flex flex-col items-end gap-2">
          <a href={`mailto:${profile.email}`}>
            <Button variant="secondary" className="gap-2"><Mail size={16}/> Email</Button>
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer">
            <Button variant="secondary" className="gap-2"><Github size={16}/> GitHub</Button>
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            <Button variant="secondary" className="gap-2"><Linkedin size={16}/> LinkedIn</Button>
          </a>
          {profile.whatsapp && (
            <a href={profile.whatsapp} target="_blank" rel="noreferrer">
              <Button variant="secondary" className="gap-2"><MessageCircle size={16}/> WhatsApp</Button>
            </a>
          )}
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronUp size={16}/> Arriba
          </Button>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Contacto rápido"
        className="rounded-full p-3 shadow-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:scale-105 transition"
      >
        <MessageCircle size={20}/>
      </button>
    </div>
  );
}

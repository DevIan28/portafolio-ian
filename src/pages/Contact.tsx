import { useState } from "react";
import Section from "@/components/Section";
import Button from "@/components/ui/button";
import { profile } from "@/lib/data";
import {
  Mail, MapPin, Github, Linkedin, Phone, Send, Check,
  MessageSquare, User, Type, MessageSquareText
} from "lucide-react";
import Reveal from "@/components/Reveal";

type Form = { name: string; email: string; subject: string; message: string };
const quickSubjects = ["Cotización", "Soporte", "Colaboración", "Mentoría", "Otra consulta"];

const inputCls =
  "w-full rounded-xl border border-neutral-300 dark:border-neutral-700 " +
  "bg-white dark:bg-neutral-950 p-3 text-sm text-neutral-900 dark:text-neutral-100 " +
  "placeholder:text-neutral-400 dark:placeholder:text-neutral-500 " +
  "focus:outline-none focus:ring-2 focus:ring-brand-500/40";

function Field({
  label, icon, children,
}: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
        {icon} {label}
      </span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function update<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return alert("Completa nombre, email y mensaje.");
    setSending(true);
    await new Promise((r) => setTimeout(r, 900)); // simulación
    setSending(false);
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 1500);
  }

  return (
    // ancho clásico, sin overrides
    <Section className="max-w-6xl">
      {/* Encabezado */}
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">Contacto</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
          ¿Tienes una oportunidad o un reto técnico? Escríbeme y te respondo pronto.
        </p>
      </Reveal>

      {/* Layout FLEX super simple y robusto */}
      <div className="mt-8 flex flex-col md:flex-row md:items-start gap-8">
        {/* Lado izquierdo (ancho fijo en desktop) */}
        <Reveal>
          <aside className="w-full md:w-[380px] space-y-6">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/85 p-6 shadow-sm">
              <h3 className="font-medium text-neutral-900 dark:text-white">Info directa</h3>
              <div className="mt-3 space-y-2 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:underline break-words"
                >
                  <Mail size={16} /> {profile.email}
                </a>
                {profile.whatsapp && (
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:underline"
                  >
                    <Phone size={16} /> WhatsApp
                  </a>
                )}
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-neutral-500" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  {profile.location ?? "Colombia"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <a href={profile.socials.github} target="_blank" rel="noreferrer">
                  <Button variant="ghost" className="gap-2"><Github size={16}/> GitHub</Button>
                </a>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                  <Button variant="ghost" className="gap-2"><Linkedin size={16}/> LinkedIn</Button>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/70 p-6">
              <h3 className="font-medium text-neutral-900 dark:text-white">Motivo rápido</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickSubjects.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      update("subject", s);
                      update("message", `Hola, quisiera hablar sobre: ${s}.`);
                    }}
                    className="px-3 py-1 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/70 p-6">
              <h3 className="font-medium text-neutral-900 dark:text-white">Disponibilidad</h3>
              <ul className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 list-disc pl-4 space-y-1.5">
                <li>Respuesta en 24–48h.</li>
                <li>Proyectos part-time o full-time a convenir.</li>
                <li>Trabajo remoto / híbrido.</li>
              </ul>
            </div>
          </aside>
        </Reveal>

        {/* Lado derecho (toma TODO el espacio restante) */}
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="flex-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/85 p-6 md:p-7 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Nombre" icon={<User size={14} />}>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls}
                  placeholder="Tu nombre"
                />
              </Field>

              <Field label="Email" icon={<Mail size={14} />}>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls}
                  placeholder="tu@email.com"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Asunto (opcional)" icon={<Type size={14} />}>
                  <input
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className={inputCls}
                    placeholder="¿Sobre qué quieres hablar?"
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Mensaje" icon={<MessageSquareText size={14} />}>
                  <textarea
                    required
                    rows={8}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={inputCls}
                    placeholder="Cuéntame brevemente tu necesidad…"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="submit" disabled={sending} className="gap-2">
                {sending ? (<><Send size={16}/> Enviando…</>) : (<><Send size={16}/> Enviar</>)}
              </Button>
              <a href={`mailto:${profile.email}`}>
                <Button variant="ghost" className="gap-2"><Mail size={16}/> Abrir Email</Button>
              </a>
              {profile.whatsapp && (
                <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                  <Button variant="ghost" className="gap-2"><MessageSquare size={16}/> WhatsApp</Button>
                </a>
              )}
            </div>

            {sent && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-brand-500/30 bg-brand-500/10 px-3 py-2 text-sm text-brand-700 dark:text-brand-300">
                <Check size={16}/> ¡Listo! Mensaje enviado (simulado).
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

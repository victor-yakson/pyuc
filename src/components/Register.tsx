"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Trophy } from "lucide-react";
import { ZONES, IMG } from "@/data/zones";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

// No backend needed: submissions are POSTed to Web3Forms, which emails them to you
// and stores them in a dashboard. Set your key in .env.local as NEXT_PUBLIC_WEB3FORMS_KEY.
// Without a key the form runs in demo mode so the page still works out of the box.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "loading" | "done" | "error";

export default function Register() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");

    const data = new FormData(form);
    data.append("subject", "New PYUC registration");
    data.append("from_name", "Presidential Youth Unity Cup Website");

    // Demo mode — no key configured yet.
    if (!ACCESS_KEY) {
      setTimeout(() => {
        setStatus("done");
        form.reset();
      }, 1200);
      return;
    }

    data.append("access_key", ACCESS_KEY);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="register" className="relative overflow-hidden py-24 lg:py-32">
      {/* backdrop */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${IMG.crowd})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-naija/15 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="font-heading text-xs uppercase tracking-[0.32em] text-gold">
                {t("regJoin")}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] uppercase leading-[0.9] text-cloud">
              {t("regTitle")} <span className="text-gradient-gold">{t("regAccent")}</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cloud/70">
              {t("regSub")}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { n: "774", l: t("regLga") },
                { n: "Free", l: t("regFree") },
                { n: "18–23", l: t("regAge") },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-cloud">{s.n}</div>
                  <div className="font-heading text-[11px] uppercase tracking-widest text-naija-light">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-3xl glass glass-gold p-8 shadow-premium">
            {status === "done" ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle2 className="h-16 w-16 text-naija-light" />
                <h3 className="font-display text-3xl uppercase text-cloud">{t("regSuccess")}</h3>
                <p className="max-w-xs text-cloud/70">{t("regSuccessMsg")}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-heading text-xs uppercase tracking-widest text-gold hover:underline"
                >
                  {t("regAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 font-heading text-sm uppercase tracking-[0.18em] text-gold">
                  <Trophy className="h-4 w-4" /> {t("regFormTag")}
                </div>

                {/* Honeypot spam trap */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                />

                <Field label={t("regName")}>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="e.g. Adaeze Okonkwo"
                    className="field"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label={t("regEmail")}>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      className="field"
                    />
                  </Field>
                  <Field label={t("regPhone")}>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="+234 ..."
                      className="field"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label={t("regZone")}>
                    <select required name="zone" defaultValue="" className="field">
                      <option value="" disabled>
                        {t("regSelectZone")}
                      </option>
                      {ZONES.map((z) => (
                        <option key={z.id} value={z.name}>
                          {z.name}
                        </option>
                      ))}
                      <option value="FCT Abuja">FCT Abuja</option>
                    </select>
                  </Field>
                  <Field label={t("regRole")}>
                    <select required name="role" defaultValue="" className="field">
                      <option value="" disabled>
                        {t("regSelectRole")}
                      </option>
                      <option value="Player">{t("rolePlayer")}</option>
                      <option value="Coach">{t("roleCoach")}</option>
                      <option value="Volunteer">{t("roleVolunteer")}</option>
                      <option value="Supporter">{t("roleSupporter")}</option>
                    </select>
                  </Field>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {t("regError")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-gold-soft hover:shadow-[0_0_45px_-6px_rgba(244,196,48,0.75)] disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {t("regSubmitting")}
                    </>
                  ) : (
                    t("regButton")
                  )}
                </button>
                <p className="text-center text-xs text-cloud/40">{t("regConduct")}</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-heading text-[11px] uppercase tracking-[0.16em] text-cloud/55">
        {label}
      </span>
      {children}
    </label>
  );
}

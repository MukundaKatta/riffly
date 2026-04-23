"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Voice = "Luna" | "Kai" | "Ava";

const VOICES: { name: Voice; style: string; desc: string }[] = [
  { name: "Luna", style: "Indie pop", desc: "Breathy, warm, Billie-adjacent" },
  { name: "Kai", style: "R&B / Soul", desc: "Smooth tenor, Frank Ocean vibes" },
  { name: "Ava", style: "Power pop", desc: "Belt-heavy, Dua Lipa energy" },
];

function AnimatedWaveform() {
  const bars = 32;
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: bars }, () => 20 + Math.random() * 60)
  );

  const animate = useCallback(() => {
    setHeights((prev) =>
      prev.map((h) => {
        const delta = (Math.random() - 0.5) * 20;
        return Math.max(10, Math.min(80, h + delta));
      })
    );
  }, []);

  useEffect(() => {
    const id = setInterval(animate, 120);
    return () => clearInterval(id);
  }, [animate]);

  return (
    <svg
      viewBox={`0 0 ${bars * 10} 80`}
      className="w-full h-24"
      preserveAspectRatio="none"
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 10 + 1}
          y={80 - h}
          width={7}
          height={h}
          rx={2}
          className="fill-purple-500 transition-all duration-100"
        />
      ))}
    </svg>
  );
}

export default function TryPage() {
  const [voice, setVoice] = useState<Voice | null>(null);
  const [lyrics, setLyrics] = useState("");
  const [rendering, setRendering] = useState(false);
  const [done, setDone] = useState(false);

  function handleRender() {
    if (!voice || !lyrics.trim()) return;
    setRendering(true);
    setDone(false);
    setTimeout(() => {
      setRendering(false);
      setDone(true);
    }, 3000);
  }

  function handleReset() {
    setVoice(null);
    setLyrics("");
    setRendering(false);
    setDone(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-500" />
          Riffly
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            Voice studio
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Pick a voice, paste lyrics, hit render.
          </h1>
        </div>

        {/* VOICE PICKER */}
        <div className="grid gap-3 sm:grid-cols-3">
          {VOICES.map((v) => (
            <button
              key={v.name}
              onClick={() => { setVoice(v.name); setDone(false); setRendering(false); }}
              className={`rounded-2xl border p-4 text-left transition ${
                voice === v.name
                  ? "border-purple-500 bg-purple-50"
                  : "border-neutral-200 bg-white hover:border-purple-300 hover:bg-purple-50/50"
              }`}
            >
              <div className="font-semibold text-neutral-900">{v.name}</div>
              <div className="text-xs text-purple-600 font-medium">{v.style}</div>
              <div className="mt-1 text-xs text-neutral-500">{v.desc}</div>
            </button>
          ))}
        </div>

        {/* LYRICS INPUT */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Paste your lyrics
          </label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder={"Verse 1:\nI've been walking through the city lights\nSearching for a melody that feels just right..."}
            rows={6}
            className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm leading-relaxed placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 resize-none"
          />
        </div>

        {/* RENDER BUTTON */}
        <button
          onClick={handleRender}
          disabled={!voice || !lyrics.trim() || rendering}
          className="mt-4 w-full rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {rendering ? "Rendering..." : "Render vocal"}
        </button>

        {/* WAVEFORM OUTPUT */}
        {(rendering || done) && (
          <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              <span className="text-purple-600">
                {voice} &middot; {VOICES.find((v) => v.name === voice)?.style}
              </span>
              <span className="text-neutral-400">
                {rendering ? "Generating..." : "Preview ready"}
              </span>
            </div>

            <div className="mt-4">
              <AnimatedWaveform />
            </div>

            {done && (
              <div className="mt-4 flex items-center gap-4">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white text-sm">
                  &#9654;
                </button>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-neutral-900">Your track</div>
                  <div className="text-xs text-neutral-500">
                    {voice} voice &middot; {lyrics.split("\n").filter(Boolean).length} lines &middot; 0:00
                  </div>
                </div>
              </div>
            )}

            {done && (
              <p className="mt-4 rounded-xl bg-purple-50 p-4 text-sm text-purple-900">
                This is a v0 preview &mdash; no real audio is generated yet. Join the waitlist
                to be first when we go live.
              </p>
            )}

            {rendering && (
              <p className="mt-4 text-center text-xs text-neutral-400 animate-pulse">
                Synthesizing vocal track...
              </p>
            )}
          </div>
        )}

        {done && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleReset}
              className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
            >
              Try another
            </button>
            <Link
              href="/#waitlist"
              className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900 text-center"
            >
              Get early access
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview &mdash; voices are mocked.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the real thing.
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";

/**
 * ColorMixer.tsx
 * ----------------
 * A feature-rich color palette tool for FunZone.
 *
 * - Edit colors with hex/rgb & sliders
 * - Lock colors, randomize, add/remove
 * - Export as PNG or JSON, import JSON
 * - Save/Load presets (localStorage)
 * - WCAG contrast checker
 *
 * Usage: import and render in FunZone page.
 */

/* ---------- Types & Utils ---------- */
type PaletteColor = {
  id: string;
  hex: string;
  locked: boolean;
};

const uid = (pref = "") => `${pref}${Math.random().toString(36).slice(2, 9)}`;

const clamp = (v: number, a = 0, b = 255) => Math.max(a, Math.min(b, v));

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const int = parseInt(h, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) => {
        const s = clamp(Math.round(v)).toString(16);
        return s.length === 1 ? "0" + s : s;
      })
      .join("")
  ).toUpperCase();
}

function randomHex() {
  const v = Math.floor(Math.random() * 0xffffff);
  return "#" + v.toString(16).padStart(6, "0").toUpperCase();
}

/* WCAG contrast ratio (relative luminance) */
function luminance(r: number, g: number, b: number) {
  const srgb = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(hexA: string, hexB: string) {
  const A = hexToRgb(hexA);
  const B = hexToRgb(hexB);
  if (!A || !B) return 1;
  const L1 = luminance(A.r, A.g, A.b);
  const L2 = luminance(B.r, B.g, B.b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return +((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

/* LocalStorage keys */
const PRESET_KEY = "shubham_color_presets_v1";

/* ---------- Component ---------- */

export default function ColorMixer(): JSX.Element {
  const [palette, setPalette] = useState<PaletteColor[]>(() =>
    ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#A66CFF"].map((h) => ({
      id: uid("c-"),
      hex: h,
      locked: false,
    }))
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [hexInput, setHexInput] = useState<string | "">("");
  const [presets, setPresets] = useState<Record<string, PaletteColor[]>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* load presets from localStorage on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRESET_KEY);
      if (raw) {
        const parsed: Record<string, PaletteColor[]> = JSON.parse(raw);
        setPresets(parsed || {});
      }
    } catch {
      // ignore
    }
  }, []);

  /* sync selected hex input to selected color */
  useEffect(() => {
    if (selectedIndex === null || !palette[selectedIndex]) {
      setHexInput("");
      return;
    }
    setHexInput(palette[selectedIndex].hex);
  }, [selectedIndex, palette]);

  /* keyboard shortcuts */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        randomizeUnlocked();
      } else if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        savePresetPrompt();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [palette]);

  /* Derived: selected color rgb */
  const selectedRgb = useMemo(() => {
    if (selectedIndex === null) return null;
    const hex = palette[selectedIndex]?.hex;
    if (!hex) return null;
    return hexToRgb(hex);
  }, [selectedIndex, palette]);

  /* --------- Palette operations --------- */

  const updateColorAt = (index: number, newHex: string) => {
    setPalette((p) => {
      const clone = p.slice();
      clone[index] = { ...clone[index], hex: newHex.toUpperCase() };
      return clone;
    });
  };

  const toggleLock = (index: number) => {
    setPalette((p) => {
      const clone = p.slice();
      clone[index] = { ...clone[index], locked: !clone[index].locked };
      return clone;
    });
  };

  const addColor = (hex?: string) => {
    const color = hex ? hex.toUpperCase() : randomHex();
    setPalette((p) => [...p, { id: uid("c-"), hex: color, locked: false }]);
    setSelectedIndex(palette.length);
  };

  const randomizeUnlocked = () => {
    setPalette((p) =>
      p.map((c) => (c.locked ? c : { ...c, hex: randomHex(), id: uid("c-") }))
    );
  };

  const shufflePalette = () => {
    setPalette((p) => {
      const clone = [...p];
      for (let i = clone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
      }
      return clone;
    });
  };

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // ignore
    }
  };

  /* export palette as PNG */
  const exportAsPNG = (fileName = "palette.png") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = 1600;
    const h = 400;
    canvas.width = w;
    canvas.height = h;
    const cols = palette.length;
    const sw = Math.floor(w / cols);

    palette.forEach((c, i) => {
      ctx.fillStyle = c.hex;
      ctx.fillRect(i * sw, 0, sw, h);
      ctx.font = "bold 36px Inter, sans-serif";
      ctx.fillStyle = getContrastTextColor(c.hex);
      ctx.textAlign = "center";
      ctx.fillText(c.hex, i * sw + sw / 2, h - 40);
    });

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const exportAsJSON = (name = "palette.json") => {
    const data = palette.map(({ hex, locked }) => ({ hex, locked }));
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed)) {
          const newPalette = parsed
            .map((p) => {
              if (typeof p.hex !== "string") return null;
              return { id: uid("c-"), hex: p.hex.toUpperCase(), locked: !!p.locked };
            })
            .filter(Boolean) as PaletteColor[];
          if (newPalette.length) {
            setPalette(newPalette);
            setSelectedIndex(0);
          }
        }
      } catch {
        // invalid JSON
      }
    };
    reader.readAsText(file);
  };

  const savePresetPrompt = () => {
    const name = prompt("Save palette as preset — enter a name:");
    if (!name) return;
    savePreset(name);
  };

  const savePreset = (name: string) => {
    setPresets((prev) => {
      const clone = { ...(prev || {}) };
      clone[name] = palette.map((c) => ({ ...c }));
      try {
        localStorage.setItem(PRESET_KEY, JSON.stringify(clone));
      } catch {}
      return clone;
    });
  };

  const loadPreset = (name: string) => {
    const p = presets[name];
    if (!p) return;
    setPalette(p.map((c) => ({ ...c, id: uid("c-") })));
    setSelectedIndex(0);
  };

  const deletePreset = (name: string) => {
    setPresets((prev) => {
      const clone = { ...(prev || {}) };
      delete clone[name];
      try {
        localStorage.setItem(PRESET_KEY, JSON.stringify(clone));
      } catch {}
      return clone;
    });
  };

  const getContrastTextColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000";
    const cr = contrastRatio(hex, "#FFFFFF");
    return cr >= 3.5 ? "#FFFFFF" : "#000000";
  };

  const updateRgbViaSliders = (r: number, g: number, b: number) => {
    if (selectedIndex === null) return;
    const hex = rgbToHex(r, g, b);
    updateColorAt(selectedIndex, hex);
    setHexInput(hex);
  };

  const commitHexInput = () => {
    if (!hexInput || selectedIndex === null) return;
    const hex = hexInput.trim();
    if (!/^#?[0-9a-fA-F]{3,6}$/.test(hex)) return;
    const normalized = (hex.startsWith("#") ? hex : "#" + hex).toUpperCase();
    updateColorAt(selectedIndex, normalized);
  };

  /* ---------- UI ---------- */
  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Color Mixer</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Create palettes, mix colors, export as PNG/JSON, and test contrast.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={randomizeUnlocked} className="px-3 py-2 rounded-lg bg-indigo-600 text-white">
            Randomize
          </button>
          <button onClick={shufflePalette} className="px-3 py-2 rounded-lg bg-yellow-400 text-black">
            Shuffle
          </button>
          <button onClick={() => exportAsPNG()} className="px-3 py-2 rounded-lg bg-green-600 text-white">
            Export PNG
          </button>
          <button onClick={() => exportAsJSON()} className="px-3 py-2 rounded-lg bg-gray-700 text-white">
            Export JSON
          </button>
        </div>
      </div>

      {/* Palette strip */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-3 py-3">
          {palette.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-36 h-36 rounded-lg shadow-md cursor-pointer ${
                selectedIndex === i ? "ring-4 ring-indigo-400 scale-105" : ""
              }`}
              style={{ background: c.hex }}
            >
              <div className="flex flex-col h-full justify-between p-2">
                <div className="flex justify-between items-start">
                  <div className="text-xs px-2 py-1 bg-white/40 text-white rounded">{i + 1}</div>
                  <div className="flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); copyHex(c.hex); }} className="text-xs px-2 py-1 bg-white/40 text-white rounded">Copy</button>
                    <button onClick={(e) => { e.stopPropagation(); toggleLock(i); }} className={`text-xs px-2 py-1 rounded ${c.locked ? "bg-white text-black" : "bg-white/40 text-white"}`}>
                      {c.locked ? "🔒" : "🔓"}
                    </button>
                  </div>
                </div>
                <div className="text-sm p-2 rounded bg-white/60 text-black/80 text-center font-mono">{c.hex}</div>
              </div>
            </div>
          ))}
          <div onClick={() => addColor()} className="flex-shrink-0 w-36 h-36 border border-dashed flex items-center justify-center rounded-lg cursor-pointer">
            <div className="text-center text-gray-600">
              <div className="text-2xl">+</div>
              <div>Add</div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor + Presets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          {selectedIndex === null ? (
            <div>Select a color to edit.</div>
          ) : (
            <>
              <div className="flex gap-4 items-center mb-4">
                <div className="w-20 h-20 rounded-lg border" style={{ background: palette[selectedIndex].hex }} />
                <input
                  className="px-3 py-2 rounded border font-mono"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  onBlur={commitHexInput}
                />
                <button onClick={commitHexInput} className="px-3 py-2 bg-indigo-600 text-white rounded">
                  Apply
                </button>
              </div>

              {/* RGB sliders */}
              {selectedRgb && (
                <div className="space-y-3">
                  <Slider label="R" value={selectedRgb.r} onChange={(v) => updateRgbViaSliders(v, selectedRgb.g, selectedRgb.b)} color="#FF4D4D" />
                  <Slider label="G" value={selectedRgb.g} onChange={(v) => updateRgbViaSliders(selectedRgb.r, v, selectedRgb.b)} color="#4DFF88" />
                  <Slider label="B" value={selectedRgb.b} onChange={(v) => updateRgbViaSliders(selectedRgb.r, selectedRgb.g, v)} color="#4DA6FF" />
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-3">
          <h3 className="text-lg font-semibold">Presets</h3>
          <input
            type="file"
            accept="application/json"
            ref={(el) => {
              fileInputRef.current = el;
            }}
            onChange={(e) => importJSON(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-gray-200 rounded w-full">
            Import JSON
          </button>
          <button onClick={() => exportAsJSON()} className="px-3 py-2 bg-gray-700 text-white rounded w-full">
            Export JSON
          </button>
          <button onClick={() => savePresetPrompt()} className="px-3 py-2 bg-indigo-600 text-white rounded w-full">
            Save Preset
          </button>

          {Object.keys(presets).length === 0 ? (
            <div className="text-sm text-gray-500">No presets saved.</div>
          ) : (
            Object.entries(presets).map(([name, pal]) => (
              <div key={name} className="flex items-center justify-between">
                <button onClick={() => loadPreset(name)} className="flex-1 text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  {name} ({pal.length})
                </button>
                <button onClick={() => deletePreset(name)} className="px-2 py-1 bg-red-500 text-white rounded">
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

/* ---------- Slider ---------- */
function Slider({
  label,
  value,
  onChange,
  color = "#4D96FF",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 text-sm font-medium">{label}</div>
      <input
        type="range"
        min={0}
        max={255}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
        style={{ accentColor: color }}
      />
      <div className="w-12 text-right font-mono text-sm">{value}</div>
    </div>
  );
}

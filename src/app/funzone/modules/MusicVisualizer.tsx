"use client";

import React, { JSX, useEffect, useRef, useState } from "react";

/**
 * MusicVisualizer.tsx
 * ---------------------------------
 * - Real-time audio visualizer using WebAudio API
 * - Visual modes: Bars / Waveform / Radial
 * - Supports file input and microphone input
 * - Includes basic beat detection and light pulse
 * - TypeScript safe (no implicit ref returns)
 */

type ViewMode = "bars" | "wave" | "radial";

export default function MusicVisualizer(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const [view, setView] = useState<ViewMode>("bars");
  const [useMic, setUseMic] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [smoothing, setSmoothing] = useState(0.6);
  const [fftSize, setFftSize] = useState(2048);
  const [volume, setVolume] = useState(0.8);
  const [sensitivity, setSensitivity] = useState(1.0);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  // Beat detection
  const lastBeatRef = useRef<number>(0);
  const beatCooldownMs = 250;

  useEffect(() => {
    setIsSupported(!!(window.AudioContext || (window as any).webkitAudioContext));
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimation();
      disconnectAudio();
    };
  }, []);

  function ensureAudioContext() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function connectMediaElement(el: HTMLAudioElement) {
    disconnectAudio();
    const ctx = ensureAudioContext();
    analyserRef.current = ctx.createAnalyser();
    analyserRef.current.fftSize = fftSize;
    analyserRef.current.smoothingTimeConstant = smoothing;
    gainRef.current = ctx.createGain();
    gainRef.current.gain.value = volume;

    sourceRef.current = ctx.createMediaElementSource(el);
    sourceRef.current.connect(gainRef.current);
    gainRef.current.connect(analyserRef.current);
    analyserRef.current.connect(ctx.destination);

    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
  }

  async function connectMicrophone() {
    disconnectAudio();
    const ctx = ensureAudioContext();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = fftSize;
      analyserRef.current.smoothingTimeConstant = smoothing;
      gainRef.current = ctx.createGain();
      gainRef.current.gain.value = volume;
      sourceRef.current = ctx.createMediaStreamSource(stream);
      (sourceRef.current as MediaStreamAudioSourceNode).connect(gainRef.current);
      gainRef.current.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    } catch (e) {
      console.error("Microphone access denied", e);
      alert("Microphone access was denied or not available.");
      setUseMic(false);
    }
  }

  function disconnectAudio() {
    try {
      sourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      gainRef.current?.disconnect();
      sourceRef.current = null;
      analyserRef.current = null;
      gainRef.current = null;
    } catch {
      /* ignore */
    }
  }

  function cancelAnimation() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  /* ---------- Visualization Loop ---------- */
  function startLoop() {
    cancelAnimation();
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !analyser || !ctx || !dataArrayRef.current) return;

    const DPR = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const dataArray = dataArrayRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      type AudioUint8Array = Uint8Array & { buffer: ArrayBuffer };


      ctx.clearRect(0, 0, width, height);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const avg = sum / dataArray.length;

      const lastBeat = lastBeatRef.current;
      const now = performance.now();
      if (avg > 180 * sensitivity && now - lastBeat > beatCooldownMs) {
        lastBeatRef.current = now;
        triggerPulse();
      }

      if (view === "bars") drawBars(ctx, dataArray, width, height);
      else if (view === "wave") drawWave(ctx, analyser, width, height);
      else drawRadial(ctx, dataArray, width, height);
    };

    draw();
  }

  function triggerPulse() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.animate(
      [
        { filter: "brightness(1)" },
        { filter: "brightness(1.25)" },
        { filter: "brightness(1)" },
      ],
      { duration: 250, easing: "ease-out" }
    );
  }

  /* ---------- Drawing Modes ---------- */
  function drawBars(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const barCount = Math.min(64, data.length);
    const step = Math.floor(data.length / barCount);
    const barWidth = width / barCount;
    for (let i = 0; i < barCount; i++) {
      const value = data[i * step] / 255;
      const barH = value * height;
      const x = i * barWidth;
      const grad = ctx.createLinearGradient(x, 0, x + barWidth, height);
      grad.addColorStop(0, `hsl(${(i / barCount) * 360}, 90%, 60%)`);
      grad.addColorStop(1, `hsl(${(i / barCount) * 360}, 70%, 40%)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x + 1, height - barH, barWidth - 2, barH);
    }
  }

  function drawWave(ctx: CanvasRenderingContext2D, analyser: AnalyserNode, width: number, height: number) {
    const bufferLength = analyser.fftSize;
    const data = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(data);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(99,102,241,0.95)";
    ctx.beginPath();
    const sliceW = width / bufferLength;
    for (let i = 0; i < bufferLength; i++) {
      const v = data[i] / 128.0;
      const y = (v * height) / 2;
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * sliceW, y);
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }

  function drawRadial(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number) {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(cx, cy) * 0.35;
    const count = 80;
    const step = Math.floor(data.length / count);
    for (let i = 0; i < count; i++) {
      const v = (data[i * step] / 255) * 1.6;
      const angle = (i / count) * Math.PI * 2;
      const x1 = cx + Math.cos(angle) * radius;
      const y1 = cy + Math.sin(angle) * radius;
      const x2 = cx + Math.cos(angle) * (radius + v * radius);
      const y2 = cy + Math.sin(angle) * (radius + v * radius);
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, "rgba(99,102,241,0.9)");
      grad.addColorStop(1, "rgba(165,180,252,0.2)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  /* ---------- Handlers ---------- */
  const onFilePicked = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = url;
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});
    connectMediaElement(audioRef.current);
    setPlaying(true);
    startLoop();
  };

  const onPickFileClick = () => fileInputRef.current?.click();

  const togglePlay = async () => {
    if (useMic) {
      if (playing) {
        cancelAnimation();
        disconnectAudio();
        setPlaying(false);
      } else {
        await connectMicrophone();
        setPlaying(true);
        startLoop();
      }
      return;
    }

    if (!audioRef.current) {
      alert("Please select an audio file first.");
      return;
    }

    const a = audioRef.current;
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    try {
      if (a.paused) {
        await a.play();
        setPlaying(true);
        startLoop();
      } else {
        a.pause();
        setPlaying(false);
        cancelAnimation();
      }
    } catch (e) {
      console.error("play error", e);
    }
  };

  const handleMicToggle = async () => {
    if (useMic) {
      cancelAnimation();
      disconnectAudio();
      setUseMic(false);
      setPlaying(false);
    } else {
      await connectMicrophone();
      setUseMic(true);
      setPlaying(true);
      startLoop();
    }
  };

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume;
  }, [volume]);

  useEffect(() => {
    if (analyserRef.current) {
      analyserRef.current.fftSize = fftSize;
      analyserRef.current.smoothingTimeConstant = smoothing;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    }
  }, [fftSize, smoothing]);

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `visualizer-${Date.now()}.png`;
    a.click();
  };

  /* ---------- Render ---------- */
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Music Visualizer</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Play a file or use your microphone to visualize real-time audio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onPickFileClick} className="px-3 py-2 rounded bg-indigo-600 text-white">
            Pick Audio
          </button>

          <input
            ref={(el) => {
              fileInputRef.current = el;
            }}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => onFilePicked(e.target.files?.[0] ?? undefined)}
          />

          <button onClick={togglePlay} className="px-3 py-2 rounded bg-yellow-400 text-black">
            {playing ? "Pause" : "Play"}
          </button>

          <button
            onClick={handleMicToggle}
            className={`px-3 py-2 rounded ${useMic ? "bg-red-500 text-white" : "bg-gray-200"}`}
          >
            {useMic ? "Stop Mic" : "Use Mic"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm">View</label>
          <select value={view} onChange={(e) => setView(e.target.value as ViewMode)} className="px-2 py-1 rounded">
            <option value="bars">Bars</option>
            <option value="wave">Waveform</option>
            <option value="radial">Radial</option>
          </select>

          <label className="text-sm">Smoothing</label>
          <input
            type="range"
            min={0}
            max={0.95}
            step={0.01}
            value={smoothing}
            onChange={(e) => setSmoothing(Number(e.target.value))}
          />

          <label className="text-sm">Sensitivity</label>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.05}
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
          />

          <label className="text-sm">Volume</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />

          <button onClick={saveSnapshot} className="ml-auto px-3 py-2 rounded bg-green-600 text-white">
            Save Snapshot
          </button>
        </div>
      </div>

      {!isSupported && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
          Audio APIs are not supported in this browser.
        </div>
      )}

      <div className="w-full h-64 bg-black rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Tip: Use Chrome/Firefox/Edge for best experience. Adjust sensitivity for beat precision.
      </div>
    </div>
  );
}

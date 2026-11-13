// Синтезированные тактильные клики (без файлов): короткий шум + тон, как у механического переключателя.
let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<() => void>();

export const isSoundOn = () => enabled;
export const subscribeSound = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };

export function setSound(on: boolean) {
  enabled = on;
  try { localStorage.setItem("sound", on ? "1" : "0"); } catch {}
  listeners.forEach((l) => l());
  if (on) playClick("on");
}

export function initSound() {
  try { enabled = localStorage.getItem("sound") === "1"; } catch {}
  listeners.forEach((l) => l());
}

export function playClick(kind: "click" | "on" = "click") {
  if (!enabled) return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx || new AC();
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime;
    // шум-«щелчок»
    const len = Math.floor(ctx.sampleRate * 0.03);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const noise = ctx.createBufferSource(); noise.buffer = buf;
    const hp = ctx.createBiquadFilter(); hp.type = "bandpass"; hp.frequency.value = 2400; hp.Q.value = 0.8;
    const ng = ctx.createGain(); ng.gain.value = 0.06;
    noise.connect(hp).connect(ng).connect(ctx.destination); noise.start(t);
    // тихий тон
    const o = ctx.createOscillator(); const og = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(kind === "on" ? 520 : 340, t);
    o.frequency.exponentialRampToValueAtTime(kind === "on" ? 880 : 150, t + 0.07);
    og.gain.setValueAtTime(0.05, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    o.connect(og).connect(ctx.destination); o.start(t); o.stop(t + 0.1);
  } catch {}
}


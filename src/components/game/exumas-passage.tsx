import { useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { submitSkillScore } from "@/lib/community/queries";

type Phase = "ready" | "playing" | "over";

type Buoy = { x: number; y: number; taken: boolean };
type Reef = { x: number; y: number; r: number };
type Island = { x: number; y: number; rx: number; ry: number };

type Sim = {
  x: number;
  y: number;
  yaw: number;
  speed: number;
  score: number;
  buoys: Buoy[];
  reefs: Reef[];
  islands: Island[];
  nextBuoy: number;
  timeLeft: number;
  hits: number;
  finished: boolean;
};

const WORLD = 2400;
const FOLLOW = 0;
const TURN = 2.4;
const THRUST = 220;
const DRAG = 1.15;
const MAX_SPEED = 320;
const DURATION = 75;

function seedCourse(): Pick<Sim, "buoys" | "reefs" | "islands"> {
  const islands: Island[] = [
    { x: 420, y: 380, rx: 160, ry: 90 },
    { x: 1180, y: 520, rx: 210, ry: 120 },
    { x: 1780, y: 900, rx: 180, ry: 110 },
    { x: 620, y: 1400, rx: 200, ry: 130 },
    { x: 1500, y: 1680, rx: 240, ry: 140 },
    { x: 2000, y: 400, rx: 140, ry: 80 },
    { x: 280, y: 1900, rx: 170, ry: 100 },
  ];
  const buoys: Buoy[] = [
    { x: 700, y: 700, taken: false },
    { x: 1100, y: 900, taken: false },
    { x: 1500, y: 700, taken: false },
    { x: 1900, y: 1100, taken: false },
    { x: 1400, y: 1300, taken: false },
    { x: 900, y: 1600, taken: false },
    { x: 1300, y: 1900, taken: false },
    { x: 1800, y: 1750, taken: false },
  ];
  const reefs: Reef[] = [
    { x: 900, y: 500, r: 70 },
    { x: 1600, y: 1050, r: 80 },
    { x: 500, y: 1100, r: 60 },
    { x: 1700, y: 1500, r: 75 },
    { x: 1100, y: 1750, r: 65 },
  ];
  return { buoys, reefs, islands };
}

function freshSim(): Sim {
  const course = seedCourse();
  return {
    x: 400,
    y: 700,
    yaw: 0.4,
    speed: 0,
    score: 0,
    nextBuoy: 0,
    timeLeft: DURATION,
    hits: 0,
    finished: false,
    ...course,
  };
}

function drawBoat(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.fillStyle = "#f4f8fc";
  ctx.strokeStyle = "#1c4a72";
  ctx.lineWidth = 1.5;
  // twin hulls, bow toward local -Y (up)
  const hull = (ox: number) => {
    ctx.beginPath();
    ctx.moveTo(ox, -28);
    ctx.quadraticCurveTo(ox + 8, -4, ox + 7, 22);
    ctx.lineTo(ox - 7, 22);
    ctx.quadraticCurveTo(ox - 8, -4, ox, -28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
  hull(-11);
  hull(11);
  ctx.fillStyle = "#d9e6f2";
  ctx.fillRect(-12, -8, 24, 18);
  ctx.strokeRect(-12, -8, 24, 18);
  ctx.strokeStyle = "#f3f7fb";
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -34);
  ctx.stroke();
  ctx.fillStyle = "rgba(243,247,251,0.85)";
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(16, -4);
  ctx.lineTo(0, -2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function ExumasPassage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef<Sim>(freshSim());
  const keysRef = useRef<Set<string>>(new Set());
  const qaKeysRef = useRef<Set<string> | null>(null);
  const qaSteerRef = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("ready");
  const lastRef = useRef(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [hud, setHud] = useState({ score: 0, buoys: 0, time: DURATION, speed: 0 });
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const qc = useQueryClient();

  const submit = useMutation({
    mutationFn: async () => {
      if (!publicKey) throw new Error("Connect a wallet to post a score.");
      const s = simRef.current;
      return submitSkillScore({
        data: {
          wallet: publicKey.toBase58(),
          score: Math.round(s.score),
          buoys: s.buoys.filter((b) => b.taken).length,
          durationMs: Math.round((DURATION - s.timeLeft) * 1000),
        },
      });
    },
    onSuccess: () => {
      toast.success("Score posted to the off-chain leaderboard.");
      void qc.invalidateQueries({ queryKey: ["leaderboard"] });
      void qc.invalidateQueries({ queryKey: ["activity"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Could not post score.");
    },
  });

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.code);
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }
    };
    const onUp = (e: KeyboardEvent) => keysRef.current.delete(e.code);
    const clear = () => keysRef.current.clear();
    window.addEventListener("keydown", onDown, { passive: false });
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clear();
    });
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", clear);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const probe = {
      getYaw: () => simRef.current.yaw,
      getSpeed: () => simRef.current.speed,
      setSteer: (v: number) => {
        qaSteerRef.current = v;
      },
      setKeys: (codes: string[]) => {
        qaKeysRef.current = new Set(codes);
      },
    };
    window.__controlsTest = probe;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? 800;
      const h = Math.max(360, Math.min(560, Math.round(w * 0.56)));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (now: number) => {
      const last = lastRef.current || now;
      let dt = (now - last) / 1000;
      lastRef.current = now;
      dt = Math.min(dt, 0.1);
      step(dt, canvas, ctx);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (window.__controlsTest === probe) delete window.__controlsTest;
    };
  }, []);

  function held(): Set<string> {
    return qaKeysRef.current ?? keysRef.current;
  }

  function step(dt: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const s = simRef.current;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;

    if (phaseRef.current === "playing") {
      const keys = held();
      let steer = 0;
      if (keys.has("KeyA") || keys.has("ArrowLeft")) steer += 1;
      if (keys.has("KeyD") || keys.has("ArrowRight")) steer -= 1;
      if (qaSteerRef.current !== null) steer = qaSteerRef.current;
      const reverse = s.speed >= 0 ? 1 : -1;
      const speedFactor = Math.min(1, Math.abs(s.speed) / 80 + 0.18);
      s.yaw += steer * TURN * speedFactor * reverse * dt;

      let throttle = 0;
      if (keys.has("KeyW") || keys.has("ArrowUp")) throttle += 1;
      if (keys.has("KeyS") || keys.has("ArrowDown")) throttle -= 0.7;
      s.speed += throttle * THRUST * dt;
      s.speed -= s.speed * DRAG * dt;
      s.speed = Math.max(-MAX_SPEED * 0.35, Math.min(MAX_SPEED, s.speed));

      const fx = -Math.sin(s.yaw);
      const fy = -Math.cos(s.yaw);
      s.x += fx * s.speed * dt;
      s.y += fy * s.speed * dt;
      s.x = Math.max(80, Math.min(WORLD - 80, s.x));
      s.y = Math.max(80, Math.min(WORLD - 80, s.y));

      for (const reef of s.reefs) {
        const d = Math.hypot(s.x - reef.x, s.y - reef.y);
        if (d < reef.r + 16) {
          s.speed *= 0.4;
          s.hits += 1;
          s.score = Math.max(0, s.score - 8 * dt * 10);
        }
      }

      const buoy = s.buoys[s.nextBuoy];
      if (buoy && !buoy.taken && Math.hypot(s.x - buoy.x, s.y - buoy.y) < 36) {
        buoy.taken = true;
        s.nextBuoy += 1;
        s.score += 1000 + Math.round(s.timeLeft * 8);
        if (s.nextBuoy >= s.buoys.length) {
          s.finished = true;
          s.score += 5000;
          endRun();
        }
      }

      s.timeLeft -= dt;
      if (s.timeLeft <= 0) {
        s.timeLeft = 0;
        endRun();
      }
    }

    drawWorld(ctx, s, cssW, cssH);

    if (nowTick.current++ % 4 === 0) {
      setHud({
        score: Math.round(s.score),
        buoys: s.buoys.filter((b) => b.taken).length,
        time: Math.max(0, s.timeLeft),
        speed: s.speed,
      });
    }
  }

  const nowTick = useRef(0);

  function endRun() {
    if (phaseRef.current !== "playing") return;
    phaseRef.current = "over";
    setPhase("over");
  }

  function startRun() {
    simRef.current = freshSim();
    phaseRef.current = "playing";
    lastRef.current = 0;
    setPhase("playing");
    canvasRef.current?.focus();
  }

  function hold(code: string, down: boolean) {
    if (down) keysRef.current.add(code);
    else keysRef.current.delete(code);
  }

  return (
    <div className="glass overflow-hidden rounded-xl">
      <div className="relative">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          className="block w-full bg-bg-deep touch-none"
          aria-label="Exumas Passage sailing challenge"
        />
        {phase !== "playing" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-deep/55 p-6 text-center backdrop-blur-[2px]">
            <p className="script text-3xl text-fg">Exumas Passage</p>
            <h3 className="display mt-1 text-4xl text-fg">
              {phase === "over" ? "Run complete" : "Skill challenge"}
            </h3>
            {phase === "over" ? (
              <p className="mt-2 font-mono text-lg text-cyan tabular-nums">
                Score {hud.score} · Buoys {hud.buoys}/8
              </p>
            ) : (
              <p className="mt-2 max-w-md text-sm text-fg/85">
                Navigate One Love² through the sandbars. Collect buoys in order. Avoid dark reef.
                W sail, S ease, A port, D starboard. No tokens are wagered.
              </p>
            )}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button onClick={startRun}>{phase === "over" ? "Sail again" : "Start run"}</Button>
              {phase === "over" ? (
                <Button
                  variant="secondary"
                  disabled={submit.isPending}
                  onClick={() => {
                    if (!connected) {
                      setVisible(true);
                      return;
                    }
                    submit.mutate();
                  }}
                >
                  {connected ? "Post score" : "Connect to post"}
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3 text-xs">
            <span className="rounded-full bg-bg/70 px-3 py-1 font-mono tabular-nums">
              {Math.ceil(hud.time)}s
            </span>
            <span className="rounded-full bg-bg/70 px-3 py-1 font-mono tabular-nums">
              Buoys {hud.buoys}/8
            </span>
            <span className="rounded-full bg-bg/70 px-3 py-1 font-mono tabular-nums">
              {hud.score}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 p-3 md:hidden">
        <Button
          variant="secondary"
          className="h-12 w-16"
          onPointerDown={() => hold("KeyA", true)}
          onPointerUp={() => hold("KeyA", false)}
          onPointerLeave={() => hold("KeyA", false)}
        >
          Port
        </Button>
        <Button
          className="h-12 w-20"
          onPointerDown={() => hold("KeyW", true)}
          onPointerUp={() => hold("KeyW", false)}
          onPointerLeave={() => hold("KeyW", false)}
        >
          Sail
        </Button>
        <Button
          variant="secondary"
          className="h-12 w-16"
          onPointerDown={() => hold("KeyD", true)}
          onPointerUp={() => hold("KeyD", false)}
          onPointerLeave={() => hold("KeyD", false)}
        >
          Stbd
        </Button>
      </div>
    </div>
  );
}

function drawWorld(
  ctx: CanvasRenderingContext2D,
  s: Sim,
  w: number,
  h: number,
) {
  const camX = s.x - FOLLOW * -Math.sin(s.yaw);
  const camY = s.y - FOLLOW * -Math.cos(s.yaw);
  const scale = 0.72;

  const toScreen = (x: number, y: number) => ({
    x: (x - camX) * scale + w / 2,
    y: (y - camY) * scale + h / 2,
  });

  ctx.fillStyle = "#0a6e8a";
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 40, w * 0.5, h * 0.5, Math.max(w, h));
  g.addColorStop(0, "#3ec6d6");
  g.addColorStop(0.45, "#1a8aaa");
  g.addColorStop(1, "#0b3a5c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = "#f3f7fb";
  ctx.lineWidth = 1;
  for (let i = 0; i < WORLD; i += 80) {
    const a = toScreen(i, 0);
    const b = toScreen(i, WORLD);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    const c = toScreen(0, i);
    const d = toScreen(WORLD, i);
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
    ctx.stroke();
  }
  ctx.restore();

  for (const reef of s.reefs) {
    const p = toScreen(reef.x, reef.y);
    ctx.fillStyle = "rgba(8, 40, 48, 0.55)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, reef.r * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const isl of s.islands) {
    const p = toScreen(isl.x, isl.y);
    ctx.fillStyle = "rgba(90, 200, 190, 0.55)";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, (isl.rx + 28) * scale, (isl.ry + 28) * scale, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e8d9a8";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, isl.rx * scale, isl.ry * scale, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2f8a4a";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, isl.rx * 0.35 * scale, isl.ry * 0.4 * scale, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  s.buoys.forEach((b, i) => {
    const p = toScreen(b.x, b.y);
    ctx.fillStyle = b.taken ? "#3dd68c" : i === s.nextBuoy ? "#ff6b7a" : "#f3f7fb";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#041525";
    ctx.stroke();
    if (i === s.nextBuoy && !b.taken) {
      ctx.strokeStyle = "rgba(255,107,122,0.6)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  const boat = toScreen(s.x, s.y);
  ctx.save();
  ctx.translate(boat.x, boat.y);
  ctx.rotate(-s.yaw);
  drawBoat(ctx);
  ctx.restore();
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setSteer?: (v: number) => void;
      setKeys?: (codes: string[]) => void;
    };
  }
}

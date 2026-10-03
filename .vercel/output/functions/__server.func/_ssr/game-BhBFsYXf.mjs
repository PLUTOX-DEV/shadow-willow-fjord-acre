import { o as __toESM } from "../_runtime.mjs";
import { l as TOKEN } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useWallet } from "../_libs/@solana/wallet-adapter-react+[...].mjs";
import { n as useWalletModal } from "../_libs/@solana/wallet-adapter-react-ui+[...].mjs";
import { i as submitSkillScore, o as Button } from "./router-BvdbfeIy.mjs";
import { t as LeaderboardCard } from "./leaderboard-card-CGrmBXkC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/game-BhBFsYXf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WORLD = 2400;
var FOLLOW = 0;
var TURN = 2.4;
var THRUST = 220;
var DRAG = 1.15;
var MAX_SPEED = 320;
var DURATION = 75;
function seedCourse() {
	return {
		buoys: [
			{
				x: 700,
				y: 700,
				taken: false
			},
			{
				x: 1100,
				y: 900,
				taken: false
			},
			{
				x: 1500,
				y: 700,
				taken: false
			},
			{
				x: 1900,
				y: 1100,
				taken: false
			},
			{
				x: 1400,
				y: 1300,
				taken: false
			},
			{
				x: 900,
				y: 1600,
				taken: false
			},
			{
				x: 1300,
				y: 1900,
				taken: false
			},
			{
				x: 1800,
				y: 1750,
				taken: false
			}
		],
		reefs: [
			{
				x: 900,
				y: 500,
				r: 70
			},
			{
				x: 1600,
				y: 1050,
				r: 80
			},
			{
				x: 500,
				y: 1100,
				r: 60
			},
			{
				x: 1700,
				y: 1500,
				r: 75
			},
			{
				x: 1100,
				y: 1750,
				r: 65
			}
		],
		islands: [
			{
				x: 420,
				y: 380,
				rx: 160,
				ry: 90
			},
			{
				x: 1180,
				y: 520,
				rx: 210,
				ry: 120
			},
			{
				x: 1780,
				y: 900,
				rx: 180,
				ry: 110
			},
			{
				x: 620,
				y: 1400,
				rx: 200,
				ry: 130
			},
			{
				x: 1500,
				y: 1680,
				rx: 240,
				ry: 140
			},
			{
				x: 2e3,
				y: 400,
				rx: 140,
				ry: 80
			},
			{
				x: 280,
				y: 1900,
				rx: 170,
				ry: 100
			}
		]
	};
}
function freshSim() {
	return {
		x: 400,
		y: 700,
		yaw: .4,
		speed: 0,
		score: 0,
		nextBuoy: 0,
		timeLeft: DURATION,
		hits: 0,
		finished: false,
		...seedCourse()
	};
}
function drawBoat(ctx) {
	ctx.save();
	ctx.fillStyle = "#f4f8fc";
	ctx.strokeStyle = "#1c4a72";
	ctx.lineWidth = 1.5;
	const hull = (ox) => {
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
function ExumasPassage() {
	const canvasRef = (0, import_react.useRef)(null);
	const simRef = (0, import_react.useRef)(freshSim());
	const keysRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const qaKeysRef = (0, import_react.useRef)(null);
	const qaSteerRef = (0, import_react.useRef)(null);
	const phaseRef = (0, import_react.useRef)("ready");
	const lastRef = (0, import_react.useRef)(0);
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [hud, setHud] = (0, import_react.useState)({
		score: 0,
		buoys: 0,
		time: DURATION,
		speed: 0
	});
	const { publicKey, connected } = useWallet();
	const { setVisible } = useWalletModal();
	const qc = useQueryClient();
	const submit = useMutation({
		mutationFn: async () => {
			if (!publicKey) throw new Error("Connect a wallet to post a score.");
			const s = simRef.current;
			return submitSkillScore({ data: {
				wallet: publicKey.toBase58(),
				score: Math.round(s.score),
				buoys: s.buoys.filter((b) => b.taken).length,
				durationMs: Math.round((DURATION - s.timeLeft) * 1e3)
			} });
		},
		onSuccess: () => {
			toast.success("Score posted to the off-chain leaderboard.");
			qc.invalidateQueries({ queryKey: ["leaderboard"] });
			qc.invalidateQueries({ queryKey: ["activity"] });
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Could not post score.");
		}
	});
	(0, import_react.useEffect)(() => {
		const onDown = (e) => {
			keysRef.current.add(e.code);
			if ([
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				"Space"
			].includes(e.code)) e.preventDefault();
		};
		const onUp = (e) => keysRef.current.delete(e.code);
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
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		const probe = {
			getYaw: () => simRef.current.yaw,
			getSpeed: () => simRef.current.speed,
			setSteer: (v) => {
				qaSteerRef.current = v;
			},
			setKeys: (codes) => {
				qaKeysRef.current = new Set(codes);
			}
		};
		window.__controlsTest = probe;
		const resize = () => {
			const w = canvas.parentElement?.clientWidth ?? 800;
			const h = Math.max(360, Math.min(560, Math.round(w * .56)));
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener("resize", resize);
		const loop = (now) => {
			let dt = (now - (lastRef.current || now)) / 1e3;
			lastRef.current = now;
			dt = Math.min(dt, .1);
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
	function held() {
		return qaKeysRef.current ?? keysRef.current;
	}
	function step(dt, canvas, ctx) {
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
			const speedFactor = Math.min(1, Math.abs(s.speed) / 80 + .18);
			s.yaw += steer * TURN * speedFactor * reverse * dt;
			let throttle = 0;
			if (keys.has("KeyW") || keys.has("ArrowUp")) throttle += 1;
			if (keys.has("KeyS") || keys.has("ArrowDown")) throttle -= .7;
			s.speed += throttle * THRUST * dt;
			s.speed -= s.speed * DRAG * dt;
			s.speed = Math.max(-112, Math.min(MAX_SPEED, s.speed));
			const fx = -Math.sin(s.yaw);
			const fy = -Math.cos(s.yaw);
			s.x += fx * s.speed * dt;
			s.y += fy * s.speed * dt;
			s.x = Math.max(80, Math.min(2320, s.x));
			s.y = Math.max(80, Math.min(2320, s.y));
			for (const reef of s.reefs) if (Math.hypot(s.x - reef.x, s.y - reef.y) < reef.r + 16) {
				s.speed *= .4;
				s.hits += 1;
				s.score = Math.max(0, s.score - 8 * dt * 10);
			}
			const buoy = s.buoys[s.nextBuoy];
			if (buoy && !buoy.taken && Math.hypot(s.x - buoy.x, s.y - buoy.y) < 36) {
				buoy.taken = true;
				s.nextBuoy += 1;
				s.score += 1e3 + Math.round(s.timeLeft * 8);
				if (s.nextBuoy >= s.buoys.length) {
					s.finished = true;
					s.score += 5e3;
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
		if (nowTick.current++ % 4 === 0) setHud({
			score: Math.round(s.score),
			buoys: s.buoys.filter((b) => b.taken).length,
			time: Math.max(0, s.timeLeft),
			speed: s.speed
		});
	}
	const nowTick = (0, import_react.useRef)(0);
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
	function hold(code, down) {
		if (down) keysRef.current.add(code);
		else keysRef.current.delete(code);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass overflow-hidden rounded-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				tabIndex: 0,
				className: "block w-full bg-bg-deep touch-none",
				"aria-label": "Exumas Passage sailing challenge"
			}), phase !== "playing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center bg-bg-deep/55 p-6 text-center backdrop-blur-[2px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "script text-3xl text-fg",
						children: "Exumas Passage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display mt-1 text-4xl text-fg",
						children: phase === "over" ? "Run complete" : "Skill challenge"
					}),
					phase === "over" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-lg text-cyan tabular-nums",
						children: [
							"Score ",
							hud.score,
							" · Buoys ",
							hud.buoys,
							"/8"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm text-fg/85",
						children: "Navigate One Love² through the sandbars. Collect buoys in order. Avoid dark reef. W sail, S ease, A port, D starboard. No tokens are wagered."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: startRun,
							children: phase === "over" ? "Sail again" : "Start run"
						}), phase === "over" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							disabled: submit.isPending,
							onClick: () => {
								if (!connected) {
									setVisible(true);
									return;
								}
								submit.mutate();
							},
							children: connected ? "Post score" : "Connect to post"
						}) : null]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-bg/70 px-3 py-1 font-mono tabular-nums",
						children: [Math.ceil(hud.time), "s"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-bg/70 px-3 py-1 font-mono tabular-nums",
						children: [
							"Buoys ",
							hud.buoys,
							"/8"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-bg/70 px-3 py-1 font-mono tabular-nums",
						children: hud.score
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-3 p-3 md:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "h-12 w-16",
					onPointerDown: () => hold("KeyA", true),
					onPointerUp: () => hold("KeyA", false),
					onPointerLeave: () => hold("KeyA", false),
					children: "Port"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-12 w-20",
					onPointerDown: () => hold("KeyW", true),
					onPointerUp: () => hold("KeyW", false),
					onPointerLeave: () => hold("KeyW", false),
					children: "Sail"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "h-12 w-16",
					onPointerDown: () => hold("KeyD", true),
					onPointerUp: () => hold("KeyD", false),
					onPointerLeave: () => hold("KeyD", false),
					children: "Stbd"
				})
			]
		})]
	});
}
function drawWorld(ctx, s, w, h) {
	const camX = s.x - FOLLOW * -Math.sin(s.yaw);
	const camY = s.y - FOLLOW * -Math.cos(s.yaw);
	const scale = .72;
	const toScreen = (x, y) => ({
		x: (x - camX) * scale + w / 2,
		y: (y - camY) * scale + h / 2
	});
	ctx.fillStyle = "#0a6e8a";
	ctx.fillRect(0, 0, w, h);
	const g = ctx.createRadialGradient(w * .5, h * .45, 40, w * .5, h * .5, Math.max(w, h));
	g.addColorStop(0, "#3ec6d6");
	g.addColorStop(.45, "#1a8aaa");
	g.addColorStop(1, "#0b3a5c");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
	ctx.save();
	ctx.globalAlpha = .12;
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
		ctx.ellipse(p.x, p.y, (isl.rx + 28) * scale, (isl.ry + 28) * scale, .2, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#e8d9a8";
		ctx.beginPath();
		ctx.ellipse(p.x, p.y, isl.rx * scale, isl.ry * scale, .2, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#2f8a4a";
		ctx.beginPath();
		ctx.ellipse(p.x, p.y, isl.rx * .35 * scale, isl.ry * .4 * scale, .3, 0, Math.PI * 2);
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
function GamePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display text-5xl text-fg",
				children: "ONE LOVE GAME"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "A skill challenge inspired by the Exumas. Separate from ordinary staking."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExumasPassage, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-xl p-5 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-2xl text-fg",
							children: "Rules before you play"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 list-disc space-y-1.5 pl-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"Entry amount: none while the game program is offline. No ",
									TOKEN.symbol,
									" is locked or spent."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Possible outcomes: a score based on buoys collected and time remaining." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You cannot lose tokens in this skill run. Tokens are not wagered." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Fees: none for the off-chain challenge." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Settlement: scores may be posted to an off-chain leaderboard if you connect a wallet. That is not an on-chain payout." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"Claim conditions: on-chain rewards stay unavailable until a reviewed game program is connected (",
									"not configured",
									")."
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3",
							children: "Token wagering can be regulated depending on where you live. This interface is a skill game plus a placeholder for a future isolated game pool — not a casino."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-2xl text-fg",
							children: "STAKE TO PLAY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Your game balance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono tabular-nums",
										children: "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Entry"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono tabular-nums",
										children: "Not live"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Reward pool"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono tabular-nums",
										children: "—"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Game funds stay isolated from the staking pool. The frontend never decides a winner and does not use client randomness for payouts."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderboardCard, {})]
			})]
		})]
	});
}
//#endregion
export { GamePage as component };

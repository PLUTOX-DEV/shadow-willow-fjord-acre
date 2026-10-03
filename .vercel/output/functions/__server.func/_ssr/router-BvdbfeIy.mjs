import { o as __toESM } from "../_runtime.mjs";
import { c as SOCIALS, l as TOKEN, n as APP_NAME, o as NAV, r as APP_TAGLINE, s as RPC_ENDPOINT, t as APP_DESCRIPTION } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, c as DialogTrigger, n as DialogClose, o as DialogPortal, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { l as shortenAddress, o as formatTokenAmount, t as cn } from "./utils-BvkpD05o.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as _enum } from "../_libs/zod.mjs";
import { _ as ChartLine, d as Gamepad2, h as ChevronDown, i as Unplug, l as Layers, o as TriangleAlert, r as Wallet, s as Menu, t as X, u as House } from "../_libs/lucide-react.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { R as PublicKey } from "../_libs/@solana-mobile/wallet-adapter-mobile.mjs";
import { i as useConnection, n as useWallet, r as ConnectionProvider, t as WalletProvider } from "../_libs/@solana/wallet-adapter-react+[...].mjs";
import { n as useWalletModal, t as WalletModalProvider } from "../_libs/@solana/wallet-adapter-react-ui+[...].mjs";
import { t as PhantomWalletAdapter } from "../_libs/solana__wallet-adapter-phantom.mjs";
import { t as SolflareWalletAdapter } from "../_libs/@solana/wallet-adapter-solflare+[...].mjs";
import { Buffer } from "buffer";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-C1p7zOu_.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BvdbfeIy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg-deep px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var g = globalThis;
if (!g.Buffer) g.Buffer = Buffer;
function SolanaProvider({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const wallets = (0, import_react.useMemo)(() => ready ? [new PhantomWalletAdapter(), new SolflareWalletAdapter()] : [], [ready]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionProvider, {
		endpoint: RPC_ENDPOINT,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletProvider, {
			wallets,
			autoConnect: ready,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletModalProvider, { children })
		})
	});
}
function BrandLogo({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("flex items-center gap-2.5", className),
		"aria-label": "ONE LOVE home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/logo/onelove.png",
			alt: "",
			width: 40,
			height: 40,
			className: "size-9 rounded-full md:size-10"
		}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "display text-2xl leading-none text-fg md:text-[1.7rem]",
			children: "ONE LOVE"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,border-color,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:brightness-110 shadow-[0_8px_24px_-12px_rgb(43,143,255)]",
			secondary: "bg-surface-2 text-fg border border-border hover:border-primary/50",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface-2",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6 text-sm tracking-wide",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function useTokenBalances() {
	const { connection } = useConnection();
	const { publicKey, connected } = useWallet();
	return useQuery({
		queryKey: ["balances", publicKey?.toBase58() ?? "none"],
		enabled: Boolean(connected && publicKey),
		refetchInterval: 2e4,
		retry: 1,
		queryFn: async () => {
			if (!publicKey) return {
				sol: 0,
				onelove: 0
			};
			const solLamports = await connection.getBalance(publicKey);
			const mint = new PublicKey(TOKEN.mint);
			const parsed = await connection.getParsedTokenAccountsByOwner(publicKey, { mint });
			let onelove = 0;
			for (const acc of parsed.value) {
				const data = acc.account.data;
				if ("parsed" in data) {
					const amount = data.parsed.info?.tokenAmount?.uiAmount;
					onelove += Number(amount ?? 0);
				}
			}
			return {
				sol: solLamports / 1e9,
				onelove
			};
		}
	});
}
var KINDS = ["wallet_connected", "skill_run"];
var getActivity = createServerFn({ method: "GET" }).handler(createSsrRpc("50ee12c875d8471528bdd8e2ea34f735d182013c8b1d91af0ec8c821d312a747"));
var logActivity = createServerFn({ method: "POST" }).validator(object({
	kind: _enum(KINDS),
	wallet: string().max(44).optional()
})).handler(createSsrRpc("176891b3013e83a6986b1cdd7e194c5dcd613a0e5db3a31c70e1326c6b78660e"));
var getLeaderboard = createServerFn({ method: "GET" }).validator(object({ period: _enum([
	"daily",
	"weekly",
	"all"
]) })).handler(createSsrRpc("359ebb1009bb72a4c82aa780d41a984607ba1dabc52cf8aa23b59a286595afe9"));
var submitSkillScore = createServerFn({ method: "POST" }).validator(object({
	wallet: string().min(32).max(44),
	score: number().int().min(0).max(999999),
	buoys: number().int().min(0).max(20),
	durationMs: number().int().min(0).max(18e4)
})).handler(createSsrRpc("f666602daddbf81aec3ff3fec6cd816c8a2cd99a304822561a04f3a7e8fac959"));
function WalletButton() {
	const { connected, publicKey, disconnect, connecting } = useWallet();
	const { setVisible } = useWalletModal();
	const balances = useTokenBalances();
	const logged = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const key = publicKey?.toBase58();
		if (!connected || !key || logged.current === key) return;
		logged.current = key;
		logActivity({ data: {
			kind: "wallet_connected",
			wallet: key
		} }).catch(() => {});
	}, [connected, publicKey]);
	if (!connected || !publicKey) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "sm",
		onClick: () => setVisible(true),
		disabled: connecting,
		"aria-label": "Connect wallet",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), connecting ? "Connecting" : "Connect Wallet"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden items-center gap-3 rounded-full border border-border bg-surface-2 px-3 py-1.5 md:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right leading-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-muted",
					children: shortenAddress(publicKey.toBase58(), 3)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-fg tabular-nums",
					children: balances.isError ? "Balance unavailable" : `${formatTokenAmount(balances.data?.onelove, 0)} ${TOKEN.symbol}`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void disconnect(),
				className: "rounded-full p-1.5 text-muted hover:bg-bg-deep hover:text-fg",
				"aria-label": "Disconnect wallet",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unplug, { className: "size-3.5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "secondary",
			className: "md:hidden",
			onClick: () => void disconnect(),
			children: [shortenAddress(publicKey.toBase58(), 3), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })]
		})]
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetClose = DialogClose;
var SheetContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg-deep/70 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col gap-6 bg-surface p-6 shadow-glow", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-4 right-4 text-muted hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = "SheetContent";
function Navbar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 md:h-[4.25rem] md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden flex-1 items-center justify-center gap-1 lg:flex",
					"aria-label": "Primary",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg",
						activeOptions: { exact: item.to === "/" },
						activeProps: { className: "rounded-full px-3.5 py-2 text-sm text-fg after:absolute" },
						children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: isActive ? "relative text-fg after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary" : void 0,
							children: item.label
						})
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletButton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "icon",
							className: "lg:hidden",
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-col gap-1",
						"aria-label": "Mobile",
						children: [
							NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: "rounded-md px-3 py-3 text-base text-fg hover:bg-surface-2",
									activeProps: { className: "rounded-md bg-surface-2 px-3 py-3 text-base text-fg" },
									children: item.label
								})
							}, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/token",
									className: "rounded-md px-3 py-3 text-base text-muted hover:bg-surface-2",
									children: "Token"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/captain",
									className: "rounded-md px-3 py-3 text-base text-muted hover:bg-surface-2",
									children: "Captain Robbie"
								})
							})
						]
					})] })] })]
				})
			]
		})
	});
}
var ITEMS = [
	{
		to: "/",
		label: "Home",
		icon: House,
		exact: true
	},
	{
		to: "/chart",
		label: "Chart",
		icon: ChartLine,
		exact: false
	},
	{
		to: "/staking",
		label: "Stake",
		icon: Layers,
		exact: false
	},
	{
		to: "/game",
		label: "Game",
		icon: Gamepad2,
		exact: false
	}
];
function MobileNav() {
	const { setVisible } = useWalletModal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-xl lg:hidden",
		style: { paddingBottom: "env(safe-area-inset-bottom)" },
		"aria-label": "Bottom",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mx-auto grid max-w-lg grid-cols-5 px-1 py-1.5",
			children: [ITEMS.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					activeOptions: { exact: item.exact },
					className: "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md text-[10px] text-muted",
					activeProps: { className: "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md text-[10px] text-primary" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
				}) }, item.to);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setVisible(true),
				className: "flex min-h-11 w-full flex-col items-center justify-center gap-0.5 rounded-md text-[10px] text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), "Wallet"]
			}) })]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-10 border-t border-border bg-bg-deep pb-20 lg:pb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display text-sm tracking-[0.22em] text-muted",
					children: "COMMUNITY · FREEDOM · ADVENTURE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 text-xs text-muted",
					children: [
						SOCIALS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-fg",
							children: s.label
						}, s.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/token",
							className: "hover:text-fg",
							children: "Token"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-border",
							children: "|"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Built on Solana" })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto max-w-[1440px] px-4 pb-6 text-[11px] leading-relaxed text-muted md:px-6",
			children: "$ONELOVE is a community token. Nothing on this site is financial advice, a promise of profit, or a guarantee of staking yield. Staking and on-chain game settlement are inactive until independently reviewed programs are deployed. Play the skill challenge for score only — it does not wager tokens."
		})]
	});
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-[1440px] flex-1 px-3 pb-8 pt-4 md:px-6 md:pt-6",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {})
		]
	});
}
var styles_default = "/assets/styles-CVlA39yc.css";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${APP_NAME} — ${APP_TAGLINE}` },
			{
				name: "description",
				content: APP_DESCRIPTION
			},
			{
				name: "theme-color",
				content: "#041525"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Great+Vibes&family=Outfit:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	const [queryClient] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 15e3,
		refetchOnWindowFocus: false,
		retry: 1
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg-deep text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
					client: queryClient,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SolanaProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						theme: "dark",
						position: "bottom-right",
						toastOptions: { className: "glass !bg-surface !text-fg !border-border" }
					})] })
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-DAx_yRCZ.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./captain-LanCjNG7.mjs");
var Route$7 = createFileRoute("/captain")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./chart-iHmAClnd.mjs");
var Route$6 = createFileRoute("/chart")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./community-DLasi_9y.mjs");
var Route$5 = createFileRoute("/community")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./game-BhBFsYXf.mjs");
var Route$4 = createFileRoute("/game")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./leaderboard-4-cnfX0z.mjs");
var Route$3 = createFileRoute("/leaderboard")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./sailing-CYLbLY-W.mjs");
var Route$2 = createFileRoute("/sailing")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./staking-C3vnODVk.mjs");
var Route$1 = createFileRoute("/staking")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./token-Bq26FHEG.mjs");
var Route = createFileRoute("/token")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	CaptainRoute: Route$7.update({
		id: "/captain",
		path: "/captain",
		getParentRoute: () => Route$9
	}),
	ChartRoute: Route$6.update({
		id: "/chart",
		path: "/chart",
		getParentRoute: () => Route$9
	}),
	CommunityRoute: Route$5.update({
		id: "/community",
		path: "/community",
		getParentRoute: () => Route$9
	}),
	GameRoute: Route$4.update({
		id: "/game",
		path: "/game",
		getParentRoute: () => Route$9
	}),
	LeaderboardRoute: Route$3.update({
		id: "/leaderboard",
		path: "/leaderboard",
		getParentRoute: () => Route$9
	}),
	SailingRoute: Route$2.update({
		id: "/sailing",
		path: "/sailing",
		getParentRoute: () => Route$9
	}),
	StakingRoute: Route$1.update({
		id: "/staking",
		path: "/staking",
		getParentRoute: () => Route$9
	}),
	TokenRoute: Route.update({
		id: "/token",
		path: "/token",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useTokenBalances as a, submitSkillScore as i, getActivity as n, Button as o, getLeaderboard as r, createSsrRpc as s, router_exports as t };

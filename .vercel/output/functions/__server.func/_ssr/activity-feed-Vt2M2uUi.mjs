import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as formatTimeAgo, l as shortenAddress } from "./utils-BvkpD05o.mjs";
import { d as Gamepad2, l as Layers, r as Wallet, y as Activity } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as getActivity } from "./router-BvdbfeIy.mjs";
import { t as Skeleton } from "./skeleton-mudxf3ZV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity-feed-Vt2M2uUi.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	wallet_connected: {
		title: "Wallet connected",
		icon: Wallet,
		onchain: false
	},
	skill_run: {
		title: "Exumas Passage run",
		icon: Gamepad2,
		onchain: false
	},
	staked: {
		title: "ONELOVE staked",
		icon: Layers,
		onchain: true
	}
};
function Row({ event }) {
	const meta = LABELS[event.kind] ?? {
		title: event.kind,
		icon: Activity,
		onchain: event.source === "onchain"
	};
	const Icon = meta.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center gap-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-bg-deep text-cyan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm text-fg",
					children: meta.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted",
					children: [meta.onchain ? "On-chain" : "App event", event.wallet ? ` · ${shortenAddress(event.wallet, 3)}` : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-muted tabular-nums",
				children: formatTimeAgo(event.createdAt)
			})
		]
	});
}
function ActivityFeed() {
	const q = useQuery({
		queryKey: ["activity"],
		queryFn: () => getActivity(),
		refetchInterval: 2e4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass flex h-full flex-col rounded-xl p-4 md:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-xl text-fg",
				children: "LIVE ACTIVITY"
			})]
		}), q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" })
			]
		}) : q.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: "Activity feed unavailable."
		}) : !q.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: "No live events yet. Connect a wallet or complete a skill run to appear here. Events are labeled as app or on-chain — nothing is implied to be on-chain unless it is."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 divide-y divide-border",
			children: q.data.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { event: e }, e.id))
		})]
	});
}
//#endregion
export { ActivityFeed as t };

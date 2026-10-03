import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as shortenAddress, o as formatTokenAmount, t as cn } from "./utils-BvkpD05o.mjs";
import { a as Trophy } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { o as Button, r as getLeaderboard } from "./router-BvdbfeIy.mjs";
import { t as Skeleton } from "./skeleton-mudxf3ZV.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-card-CGrmBXkC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-10 items-center rounded-full bg-bg-deep p-1", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-medium text-muted transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-fg", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-3 outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function Rank({ n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("flex size-6 items-center justify-center rounded-full text-xs font-medium", n === 1 ? "bg-gold/20 text-gold" : n === 2 ? "bg-muted/20 text-fg" : n === 3 ? "bg-primary/20 text-primary" : "text-muted"),
		children: n
	});
}
function LeaderboardCard({ full = false }) {
	const [period, setPeriod] = (0, import_react.useState)("daily");
	const q = useQuery({
		queryKey: ["leaderboard", period],
		queryFn: () => getLeaderboard({ data: { period } })
	});
	const rows = q.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass flex h-full flex-col rounded-xl p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-xl text-fg",
					children: "LEADERBOARD"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Off-chain Exumas Passage scores. On-chain game rewards are not live."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: period,
				onValueChange: (v) => setPeriod(v),
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "daily",
						children: "Daily"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "weekly",
						children: "Weekly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "all",
						children: "All Time"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-[2rem_1fr_auto] gap-x-2 px-1 text-[10px] tracking-wide text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "#" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Player" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Score" })
				]
			}),
			q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-2",
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }, i))
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "No scores yet. Finish a passage run with a connected wallet to post a result."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-1 space-y-1",
				children: (full ? rows : rows.slice(0, 5)).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[2rem_1fr_auto] items-center gap-x-2 rounded-md px-1 py-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, { n: row.rank }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-mono text-sm text-fg",
							children: shortenAddress(row.wallet, 4)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-fg tabular-nums",
							children: formatTokenAmount(row.score, 0)
						})
					]
				}, row.wallet))
			}),
			full ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				className: "mt-4 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/leaderboard",
					children: "View full leaderboard"
				})
			})
		]
	});
}
//#endregion
export { LeaderboardCard as t };

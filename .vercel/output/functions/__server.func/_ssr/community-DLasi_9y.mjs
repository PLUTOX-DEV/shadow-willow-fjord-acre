import { c as SOCIALS } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as ActivityFeed } from "./activity-feed-Vt2M2uUi.mjs";
import { t as LeaderboardCard } from "./leaderboard-card-CGrmBXkC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-DLasi_9y.js
var import_jsx_runtime = require_jsx_runtime();
function CommunityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display text-5xl text-fg",
				children: "COMMUNITY"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "One crew, one mission. Join the channels, watch live activity, and sail the skill challenge. Nothing here is a chat room pretending to be on-chain."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: SOCIALS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: s.href,
					target: "_blank",
					rel: "noreferrer",
					className: "glass rounded-xl p-5 transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "display text-2xl text-fg",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Official ",
							s.label,
							" for the crew"
						]
					})]
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderboardCard, {})]
			})
		]
	});
}
//#endregion
export { CommunityPage as component };

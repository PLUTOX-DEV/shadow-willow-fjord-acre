import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as ActivityFeed } from "./activity-feed-Vt2M2uUi.mjs";
import { t as LeaderboardCard } from "./leaderboard-card-CGrmBXkC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-4-cnfX0z.js
var import_jsx_runtime = require_jsx_runtime();
function LeaderboardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-5xl gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "display mb-4 text-5xl text-fg",
			children: "LEADERBOARD"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderboardCard, { full: true })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {})]
	});
}
//#endregion
export { LeaderboardPage as component };

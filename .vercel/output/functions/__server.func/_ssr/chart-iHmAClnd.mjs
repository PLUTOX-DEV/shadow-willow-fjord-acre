import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as PriceChart } from "./price-chart-D7uyGZWH.mjs";
import { t as MarketPanel } from "./market-panel-DsFTIlDf.mjs";
import { t as ActivityFeed } from "./activity-feed-Vt2M2uUi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chart-iHmAClnd.js
var import_jsx_runtime = require_jsx_runtime();
function ChartPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {})]
		})]
	});
}
//#endregion
export { ChartPage as component };

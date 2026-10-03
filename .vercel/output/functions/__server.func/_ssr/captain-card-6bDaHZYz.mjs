import { c as SOCIALS, i as CAPTAIN } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Button } from "./router-BvdbfeIy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/captain-card-6bDaHZYz.js
var import_jsx_runtime = require_jsx_runtime();
function CaptainCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass flex flex-col gap-4 rounded-xl p-4 md:flex-row md:items-center md:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: CAPTAIN.square,
			alt: CAPTAIN.name,
			className: "h-40 w-full rounded-lg object-cover object-top md:h-44 md:w-40"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-3xl text-fg",
					children: "CAPTAIN ROBBIE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-cyan",
					children: [CAPTAIN.role, " · Master Mariner · US Sailing Instructor"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
					children: CAPTAIN.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/captain",
							children: "Meet Captain Robbie"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 text-xs text-muted",
						children: SOCIALS.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-fg",
							children: s.label
						}, s.id))
					})]
				})
			]
		})]
	});
}
//#endregion
export { CaptainCard as t };

import { c as SOCIALS, i as CAPTAIN } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as Button } from "./router-BvdbfeIy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/captain-LanCjNG7.js
var import_jsx_runtime = require_jsx_runtime();
function CaptainPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-5xl gap-6 md:grid-cols-[18rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: CAPTAIN.photo,
			alt: CAPTAIN.name,
			className: "h-80 w-full rounded-xl object-cover object-top md:h-[28rem]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.25em] text-cyan uppercase",
				children: CAPTAIN.role
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display mt-1 text-5xl text-fg",
				children: "CAPTAIN ROBBIE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg text-fg/90",
				children: CAPTAIN.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
				children: CAPTAIN.bio
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 grid gap-2 sm:grid-cols-2",
				children: [CAPTAIN.credentials.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "glass rounded-md px-3 py-2 text-sm text-fg",
					children: c
				}, c)), CAPTAIN.education.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-md border border-border px-3 py-2 text-sm text-muted",
					children: c
				}, c))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: CAPTAIN.x,
						target: "_blank",
						rel: "noreferrer",
						children: "Meet Captain Robbie"
					})
				}), SOCIALS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.href,
						target: "_blank",
						rel: "noreferrer",
						children: s.label
					})
				}, s.id))]
			})
		] })]
	});
}
//#endregion
export { CaptainPage as component };

import { a as LINKS, u as YACHT } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as Button } from "./router-BvdbfeIy.mjs";
import { t as CaptainCard } from "./captain-card-6bDaHZYz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sailing-CYLbLY-W.js
var import_jsx_runtime = require_jsx_runtime();
function SailingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-xl border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/hero-yacht.jpg",
						alt: YACHT.name,
						className: "absolute inset-0 size-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg-deep/70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-2xl px-6 py-16 md:px-10 md:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "script text-3xl text-fg",
								children: "One Love Sailing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "display mt-2 text-5xl text-fg md:text-6xl",
								children: "ONE LOVE SAILING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-medium tracking-wide text-cyan uppercase",
								children: "Real Adventures. Real People. Real Utility."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-base text-fg/85",
								children: [
									YACHT.name,
									" is an ",
									YACHT.spec,
									" and ",
									YACHT.note.toLowerCase(),
									" Home waters: ",
									YACHT.home,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: LINKS.sailingInstagram,
									target: "_blank",
									rel: "noreferrer",
									children: "Explore the sailing experience"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					{
						img: "/images/yacht-anchor.jpg",
						title: "The flagship",
						copy: `${YACHT.name} was built voyage by voyage. She is the real-world home of the One Love family — not a stock photo for a token page.`
					},
					{
						img: "/images/exumas-aerial.jpg",
						title: "Exumas, Bahamas",
						copy: "Sandbars, island hopping, and water that actually looks like this. The community started here, with guests, sailors, and friends."
					},
					{
						img: "/images/snorkeling.jpg",
						title: "Dive and snorkel",
						copy: "Charters, snorkeling, and time in the water. The token is an experiment in whether that same crew can build something lasting on Solana."
					}
				].map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass overflow-hidden rounded-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: card.img,
						alt: "",
						className: "h-44 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-2xl text-fg",
							children: card.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: card.copy
						})]
					})]
				}, card.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/deck-sunset.jpg",
					alt: "Catamaran deck at sunset",
					className: "h-64 w-full rounded-xl object-cover md:h-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-3xl text-fg",
							children: "A different course"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "$ONELOVE began with something that already existed: the One Love Sailing community. The strongest ships are built slowly, like oak. Slow. Steady. Strong. That is a philosophy for a crew — not a promise about price."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "This site does not claim that holding the token buys charter time, equity, or a financial return. It tells the story of a real operation and a Solana community growing around it."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptainCard, {})
		]
	});
}
//#endregion
export { SailingPage as component };

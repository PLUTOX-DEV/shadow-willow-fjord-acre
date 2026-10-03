import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BvkpD05o.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function shortenAddress(address, chars = 4) {
	if (address.length <= chars * 2 + 3) return address;
	return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}
function formatUsd(value, digits = 6) {
	if (value === null || value === void 0 || Number.isNaN(value)) return "—";
	if (Math.abs(value) >= 1) return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2
	}).format(value);
	if (value === 0) return "$0.00";
	const fraction = Math.min(10, Math.max(digits, 2 - Math.floor(Math.log10(Math.abs(value)))));
	return `$${value.toFixed(fraction)}`.replace(/0+$/, "").replace(/\.$/, "");
}
function formatCompactUsd(value) {
	if (value === null || value === void 0 || Number.isNaN(value)) return "—";
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
}
function formatCompact(value) {
	if (value === null || value === void 0 || Number.isNaN(value)) return "—";
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
}
function formatTokenAmount(value, digits = 2) {
	if (value === null || value === void 0 || Number.isNaN(value)) return "—";
	return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}
function formatPct(value) {
	if (value === null || value === void 0 || Number.isNaN(value)) return "—";
	return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}
function formatTimeAgo(iso) {
	const then = typeof iso === "string" ? new Date(iso).getTime() : iso.getTime();
	const seconds = Math.max(0, Math.round((Date.now() - then) / 1e3));
	if (seconds < 60) return `${seconds}s ago`;
	const minutes = Math.round(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.round(hours / 24)}d ago`;
}
function isSolanaAddress(value) {
	return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
}
//#endregion
export { formatTimeAgo as a, isSolanaAddress as c, formatPct as i, shortenAddress as l, formatCompact as n, formatTokenAmount as o, formatCompactUsd as r, formatUsd as s, cn as t };

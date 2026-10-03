import "./@solana-mobile/wallet-adapter-mobile.mjs";
//#region node_modules/@solana/wallet-adapter-base/lib/esm/standard.js
function isWalletAdapterCompatibleStandardWallet(wallet) {
	return "standard:connect" in wallet.features && "standard:events" in wallet.features && ("solana:signAndSendTransaction" in wallet.features || "solana:signTransaction" in wallet.features);
}
//#endregion
export { isWalletAdapterCompatibleStandardWallet as t };

import { invoke } from "@tauri-apps/api/core";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";

if ("__TAURI_INTERNALS__" in window) {
	void onOpenUrl((urls) => {
		// urls.fo
	});
}

export async function openUrl(url: string) {
	if ("__TAURI_INTERNALS__" in window) {
		await invoke("open_url", {
			url,
		});
	} else {
		window.location.assign(url);
	}
}

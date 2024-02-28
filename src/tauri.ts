import { invoke } from "@tauri-apps/api/core";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { router } from "./router";

if ("__TAURI_INTERNALS__" in window) {
	void onOpenUrl((urls) => {
		const url = new URL(urls[0]);

		const code = url.searchParams.get("code");
		const state = url.searchParams.get("state");

		if (code && state) {
			void router.navigate({
				to: "/login/$provider",
				search: {
					code,
					state,
				},
				params: {
					provider: url.pathname.replace("/login/", ""),
				},
			});
		}
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

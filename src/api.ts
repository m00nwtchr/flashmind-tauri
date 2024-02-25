import axios, { CreateAxiosDefaults } from "axios";
import { createFetchAdapter } from "@haverstack/axios-fetch-adapter";
import { fetch } from "@tauri-apps/plugin-http";

export const API_URL = "https://flashmind.m00nlit.dev";

function createAxios() {
	const axiosCfg = {
		baseURL: API_URL,
		// timeout: 1000,
		// headers: { "X-Custom-Header": "foobar" },
	} as CreateAxiosDefaults;

	if (window.__TAURI_INTERNALS__) {
		// fetch: (...args) =>
		// 	fetch(...args).catch((err) => {
		// 		console.error(err);
		// 		throw err;
		// 	}),
		axiosCfg.adapter = createFetchAdapter({
			fetch,
		});
	}
	return axios.create(axiosCfg);
}

const instance = createAxios();

interface OIDCProvider {
	id: string;
	name?: string;
	iconUrl?: string;
}

export const fetchProviders = async () => {
	console.log("Fetching providers...");
	return instance.get<OIDCProvider[]>(`/auth/oidc`).then((r) => r.data);
};

export function oidcUrl(provider: string) {
	return `${API_URL}/auth/oidc/${provider}`;
}

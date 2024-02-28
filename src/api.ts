import axios, { CreateAxiosDefaults } from "axios";
import { createFetchAdapter } from "@haverstack/axios-fetch-adapter";
import { fetch } from "@tauri-apps/plugin-http";
import { queryOptions, useMutation } from "@tanstack/react-query";

export const API_URL = "https://flashmind.m00nlit.dev";
// export const API_URL = "http://localhost:3000";

const instance = (() => {
	const axiosCfg = {
		baseURL: API_URL,
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
})();

export interface OIDCProvider {
	id: string;
	name?: string;
	clientId: string;
	url: string;
	iconUrl?: string;
}

export const useCodeExchange = (provider: string) =>
	useMutation({
		mutationFn: (code: { code: string; code_verifier: string }) =>
			instance.post(`/api/oidc/${provider}`, code),
	});

export const providersQueryOptions = queryOptions({
	queryKey: ["providers"],
	queryFn: async () => {
		console.log("Fetching providers...");
		return instance.get<OIDCProvider[]>(`/api/oidc`).then((r) => r.data);
	},
});

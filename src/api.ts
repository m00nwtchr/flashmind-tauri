import axios, { CreateAxiosDefaults } from "axios";
import { createFetchAdapter } from "@haverstack/axios-fetch-adapter";
import { fetch } from "@tauri-apps/plugin-http";
import { queryOptions, useMutation } from "@tanstack/react-query";

export const API_URL = "https://flashmind.m00nlit.dev";
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
	clientId: string;
	url: string;
	name?: string;
	iconUrl?: string;
}

export const useCodeExchange = (provider: string) =>
	useMutation({
		mutationFn: (code: { code: string; code_verifier: string }) =>
			instance.post(`/api/oidc/${provider}`, code),
	});

export const providersQueryOptions = queryOptions({
	queryKey: ["providers"],
	// queryFn: async () => {
	// 	console.log("Fetching providers...");
	// 	return instance.get<OIDCProvider[]>(`/auth/oidc`).then((r) => r.data);
	// },
	queryFn: () => {
		// console.log("Fetching providers...");
		return [
			{
				id: "authelia",
				clientId: "flashmind",
				url: "https://auth.m00nlit.dev",
			} as OIDCProvider,
		];
	},
});

export function oidcUrl(provider: string) {
	return `${API_URL}/auth/oidc/${provider}`;
}

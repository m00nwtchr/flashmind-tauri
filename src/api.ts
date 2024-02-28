import axios, { CreateAxiosDefaults } from "axios";
import { createFetchAdapter } from "@haverstack/axios-fetch-adapter";
import { fetch } from "@tauri-apps/plugin-http";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { IS_TAURI } from "./tauri";

export const API_URL = "https://flashmind.m00nlit.dev";
// export const API_URL = "http://localhost:3000";

const instance = (() => {
	const axiosCfg = {
		baseURL: API_URL,
	} as CreateAxiosDefaults;

	if (IS_TAURI) {
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

export const providersQueryOptions = queryOptions({
	queryKey: ["providers"],
	queryFn: async () => {
		console.log("Fetching providers...");
		return instance.get<OIDCProvider[]>(`/api/oidc`).then((r) => r.data);
	},
});

export interface User {
	user_id: number;
	provider: string;
	username?: string;
	display?: string;
	email?: string;
}

export const userQueryOptions = queryOptions({
	queryKey: ["user"],
	queryFn: async () => {
		console.log("Fetching user...");
		return instance.get<User>(`/api/auth/user`).then((r) => r.data);
	},
});

export const useCodeExchange = (provider: string) =>
	useMutation({
		mutationFn: async (code: { code: string; code_verifier: string }) => {
			const res = await instance.post(`/api/oidc/${provider}`, code);

			if (IS_TAURI) {
				const sessionCookie = res.headers["set-cookie"]?.find(
					(cookie) => cookie.includes("session"),
				);
				if (sessionCookie) {
					instance.defaults.headers.common.Cookie = sessionCookie;
				}
			}
		},
	});

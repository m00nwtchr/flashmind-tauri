import axios, { CreateAxiosDefaults } from "axios";
import { createFetchAdapter } from "@haverstack/axios-fetch-adapter";
import { fetch } from "@tauri-apps/plugin-http";
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { IS_TAURI } from "./tauri";
import { OidcClient } from "oidc-client-ts";
import {
	CreateFlashCard,
	Deck,
	DeckArray,
	FlashCard,
	FlashCardArray,
	UpdateDeckCards,
} from "./entities";

// export const API_URL = "https://flashmind.m00nlit.dev";
// export const FRONT_URL = API_URL;
export const API_URL = "http://localhost:3000" as string;
export const FRONT_URL = "http://localhost:1420" as string;

// axios.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
// 		return Promise.reject("Unknown err");
// 	},
// );

const instance = (() => {
	const axiosCfg = {
		baseURL: API_URL,
		// withCredentials: API_URL !== FRONT_URL,
		withCredentials: true,
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
		return instance
			.get<OIDCProvider[]>(`/api/oidc`)
			.then((r) => r.data.sort());
	},
	staleTime: Infinity,
});

export const oidcClient = (provider: OIDCProvider) =>
	new OidcClient({
		authority: provider.url,
		client_id: provider.clientId,
		redirect_uri: `${FRONT_URL}/login/${provider.id}`,
		response_type: "code",
		scope: "openid email profile",
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
		return instance
			.get<User>(`/api/auth/user`)
			.then((r) => r.data)
			.catch(() => null);
	},
	staleTime: 60 * 1000,
});
export const useUser = () => useSuspenseQuery(userQueryOptions);

export const useCodeExchange = (provider: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (code: { code: string; code_verifier: string }) => {
			const res = await instance.post<User>(
				`/api/oidc/${provider}`,
				code,
			);

			if (IS_TAURI) {
				const sessionCookie = res.headers["set-cookie"]?.find(
					(cookie) => cookie.includes("session"),
				);
				if (sessionCookie) {
					instance.defaults.headers.common.Cookie = sessionCookie;
				}
			}
			return res.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
		},
	});
};

export const cardQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["card", id],
		queryFn: async () => {
			console.log(`Fetching card (${id})...`);
			return instance
				.get(`/api/flashcard/${id}`)
				.then((r) => FlashCard.parse(r.data))
				.catch((e) => {
					console.error(e);
					return null;
				});
		},
		staleTime: 60 * 1000,
	});
export const useCard = (id: string) => useSuspenseQuery(cardQueryOptions(id));

export const cardsQueryOptions = queryOptions({
	queryKey: ["cards"],
	queryFn: async () => {
		console.log(`Fetching cards...`);
		return instance
			.get<FlashCard[]>("/api/flashcard")
			.then((r) => FlashCardArray.parse(r.data))
			.catch((e) => {
				console.error(e);
				return null;
			});
	},
	staleTime: 60 * 1000,
});
export const useCards = () => useSuspenseQuery(cardsQueryOptions);

export const useCreateCard = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (card: CreateFlashCard) => {
			const res = await instance.post<FlashCard>(`/api/flashcard`, card);

			// if (IS_TAURI) {
			// 	const sessionCookie = res.headers["set-cookie"]?.find(
			// 		(cookie) => cookie.includes("session"),
			// 	);
			// 	if (sessionCookie) {
			// 		instance.defaults.headers.common.Cookie = sessionCookie;
			// 	}
			// }
			return res.data;
		},
		onSuccess: async (data) => {
			const cards = queryClient.getQueryData<FlashCardArray>(["cards"]);
			if (cards) {
				cards.push(data);
				queryClient.setQueryData(["cards"], cards);
			} else {
				await queryClient.invalidateQueries({ queryKey: ["cards"] });
			}
			queryClient.setQueryData(["card", data.uid], data);
		},
	});
};

export const deckQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["deck", id],
		queryFn: async () => {
			console.log(`Fetching deck (${id})...`);
			return instance
				.get(`/api/deck/${id}`)
				.then((r) => Deck.parse(r.data))
				.catch((e) => {
					console.error(e);
					return null;
				});
		},
		staleTime: 60 * 1000,
	});
export const useDeck = (id: string) => useSuspenseQuery(deckQueryOptions(id));

export const deckCardsQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["deck", id, "cards"],
		queryFn: async () => {
			console.log(`Fetching deck cards (${id})...`);
			return instance
				.get(`/api/deck/${id}/cards`)
				.then((r) => FlashCardArray.parse(r.data))
				.catch((e) => {
					console.error(e);
					return null;
				});
		},
		staleTime: 60 * 1000,
	});
export const useDeckCards = (id: string) =>
	useSuspenseQuery(deckCardsQueryOptions(id));

export const useUpdateDeckCards = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (update: UpdateDeckCards) => {
			const res = await instance.patch<FlashCardArray>(
				`/api/deck/${id}/cards`,
				update,
			);

			return res.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["deck", id, "cards"], data);
		},
	});
};

export const decksQueryOptions = queryOptions({
	queryKey: ["decks"],
	queryFn: async () => {
		console.log(`Fetching decks...`);
		return instance
			.get<Deck[]>("/api/deck")
			.then((r) => DeckArray.parse(r.data))
			.catch((e) => {
				console.error(e);
				return null;
			});
	},
	staleTime: 60 * 1000,
});
export const useDecks = () => useSuspenseQuery(decksQueryOptions);

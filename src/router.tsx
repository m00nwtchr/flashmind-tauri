/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { User } from "./api";

export interface MyRouterContext {
	queryClient: QueryClient;
	user: User | null;
}

export const queryClient = new QueryClient();

export const router = createRouter({
	routeTree,
	context: {
		queryClient: queryClient,
		user: undefined!,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

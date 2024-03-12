/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export interface Navigation {
	name: string;
	href: string;
	icon?: JSX.Element;
}

export interface MyRouterContext {
	queryClient: QueryClient;
}

export const queryClient = new QueryClient();

export const router = createRouter({
	routeTree,
	context: {
		queryClient: queryClient,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

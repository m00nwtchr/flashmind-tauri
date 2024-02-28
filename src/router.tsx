/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { User, useUser } from "./api";

export interface MyRouterContext {
	user: User | null;
	queryClient: QueryClient;
}

export const router = createRouter({
	routeTree,
	context: {
		queryClient: undefined!,
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

export function Router() {
	const queryClient = useQueryClient();
	const { data: user } = useUser();

	return <RouterProvider router={router} context={{ user, queryClient }} />;
}

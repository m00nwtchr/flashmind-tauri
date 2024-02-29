import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Log } from "oidc-client-ts";

Log.setLogger(console);
Log.setLevel(Log.INFO);

import { userQueryOptions, useUser } from "../api";
import Login from "../views/Login";

export const Route = createFileRoute("/_authenticated")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(userQueryOptions),
	component: Auth,
});

function Auth() {
	const { data: user } = useUser();

	if (user === null) {
		return <Login />;
	}
	return <Outlet />;
}

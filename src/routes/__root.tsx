import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import { Suspense } from "react";
import { MyRouterContext } from "../router";

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: ({ location, context: { user } }) => {
		if (!user && !location.href.includes("login")) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw redirect({
				to: "/login",
				// search: {
				// 	redirect: location.href,
				// },
			});
		}
	},
	component: Root,
});

function Root() {
	const { user } = Route.useRouteContext();

	return (
		<>
			{user && <NavBar navigation={[{ name: "Home", href: "/" }]} />}

			<Suspense fallback={<Loader></Loader>}>
				<Outlet />
			</Suspense>
		</>
	);
}

function Loader() {
	return (
		<div className="flex min-h-full items-center justify-center">
			<div
				className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status"
			>
				<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
					Loading...
				</span>
			</div>
		</div>
	);
}

import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import { MyRouterContext } from "../router";
import { useUser } from "../api";

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: ({ context: { user }, location }) => {
		if (user === null && !location.href.includes("/login")) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw redirect({
				to: "/login",
			});
		}
	},
	component: Root,
});

function Root() {
	const { data: user } = useUser();

	return (
		<>
			{user && <NavBar navigation={[{ name: "Home", href: "/" }]} />}

			<Outlet />
		</>
	);
}

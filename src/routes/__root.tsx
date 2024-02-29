import { createRootRouteWithContext } from "@tanstack/react-router";
import { MyRouterContext } from "../router";

export const Route = createRootRouteWithContext<MyRouterContext>()({
	// component: Root,
});

// function Root() {
// 	return <Outlet />;
// }

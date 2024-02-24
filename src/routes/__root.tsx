import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavBar from "../components/NavBar";

export const Route = createRootRoute({
	component: () => (
		<>
			{/* <div className="p-2 flex gap-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/login" className="[&.active]:font-bold">
					Login
				</Link>
			</div> */}
			<NavBar></NavBar>
			<hr />
			<Outlet />
		</>
	),
});

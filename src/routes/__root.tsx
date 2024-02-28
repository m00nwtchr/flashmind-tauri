import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import { Suspense, useEffect, useState } from "react";
// import { hasAuthParams, useAuth } from "react-oidc-context";

export const Route = createRootRoute({
	component: Root,
});

// <Link to="/" className="[&.active]:font-bold">
//		Home
//	</Link>{" "}
//	<Link to="/login" className="[&.active]:font-bold">
//		Login
//	</Link>

function Root() {
	return (
		<>
			<NavBar
				navigation={[
					{ name: "Home", href: "/" },
					{ name: "Login", href: "/login" },
				]}
			></NavBar>

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

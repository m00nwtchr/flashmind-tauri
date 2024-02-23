import { createLazyFileRoute } from "@tanstack/react-router";
import Login from "../views/Login";

export const Route = createLazyFileRoute("/login")({
	component: Login,
});

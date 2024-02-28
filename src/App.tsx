import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { useUser } from "./api";

export default function App() {
	const { data: user } = useUser();

	return <RouterProvider router={router} context={{ user }} />;
}

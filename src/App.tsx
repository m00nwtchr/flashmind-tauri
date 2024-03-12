import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
	return (
		<>
			<RouterProvider router={router} />
			{/* <ReactQueryDevtools /> */}
		</>
	);
}

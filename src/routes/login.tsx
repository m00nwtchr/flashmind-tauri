import { createFileRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { useState } from "react";

import { fetchProviders } from "../api";

const providersQueryOptions = queryOptions({
	queryKey: ["providers"],
	queryFn: () => fetchProviders,
});

export const Route = createFileRoute("/login")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(providersQueryOptions),
	component: LoginComponent,
});

function LoginComponent() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
		</>
	);
}

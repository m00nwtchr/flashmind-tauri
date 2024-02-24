import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { fetchProviders } from "../api";

const providersQueryOptions = queryOptions({
	queryKey: ["providers"],
	queryFn: fetchProviders,
});

export const Route = createFileRoute("/login")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(providersQueryOptions),
	component: LoginComponent,
});

function LoginComponent() {
	const { data: providers } = useSuspenseQuery(providersQueryOptions);

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{providers.map((p) => (
						<button
							key={p}
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in with {p}
						</button>
					))}
				</div>
			</div>
		</>
	);
}

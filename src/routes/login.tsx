import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation, Trans } from "react-i18next";

import { API_URL, fetchProviders, oidcUrl } from "../api";
import { openUrl } from "../tauri";

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
	const { t } = useTranslation("translations");

	return (
		<div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				{/* <img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/> */}
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{t("login")}
				</h2>
			</div>

			<div className="mt-10 flex flex-col sm:mx-auto sm:w-full sm:max-w-sm sm:flex-row">
				{providers.map((p) => (
					<button
						key={p.id}
						// href={oidcUrl(p.id)}
						type="submit"
						className="mx-1 mb-1 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold capitalize leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={() => openUrl(oidcUrl(p.id))}
					>
						{p.iconUrl && (
							<img className="pr-2" src={p.iconUrl}></img>
						)}
						{p.name ?? p.id}
					</button>
				))}
			</div>
		</div>
	);
}

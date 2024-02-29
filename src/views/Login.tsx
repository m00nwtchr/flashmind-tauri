import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Log } from "oidc-client-ts";

Log.setLogger(console);
Log.setLevel(Log.INFO);

import { providersQueryOptions } from "../api";
import LoginButton from "../components/LoginButton";

export default function Login() {
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

			<div className="mt-10 flex flex-col sm:mx-auto sm:w-full sm:max-w-sm">
				{providers.map((p) => (
					<LoginButton key={p.id} provider={p} />
				))}
			</div>
		</div>
	);
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { useCodeExchange } from "../api";

type AuthResponse = { code: string; state: string } | Record<string, never>;

export const Route = createFileRoute("/login/$provider")({
	component: ProviderComponent,
	validateSearch: (search: Record<string, unknown>): AuthResponse => {
		if (search.code && search.state) {
			return {
				code: String(search.code),
				state: String(search.state),
			};
		} else {
			return {};
		}
	},
});

function ProviderComponent() {
	const search = Route.useSearch();
	const { provider: providerId } = Route.useParams();
	const navigate = useNavigate();

	const codeVerifier = useRef<string | null>(null);
	if (!codeVerifier.current) {
		const cv = localStorage.getItem("code_verifier");
		if (cv) {
			codeVerifier.current = cv;
		}
	}
	const exchange = useCodeExchange(providerId);

	const [tried, setTried] = useState(false);
	useEffect(() => {
		if (!tried) {
			if (search.code && codeVerifier.current) {
				setTried(true);

				console.log("E", codeVerifier.current);
				exchange.mutate({
					code: search.code,
					code_verifier: codeVerifier.current,
				});
				localStorage.removeItem("code_verifier");
				navigate({
					from: "/login/$provider",
					to: "/",
				}).catch(console.error);
			}
		}
	}, [tried, search, navigate, exchange]);
}

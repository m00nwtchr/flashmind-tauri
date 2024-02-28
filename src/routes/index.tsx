import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "../api";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { data: user } = useUser();

	return (
		<div className="text-3xl font-bold underline">
			Hello {user?.display ?? user?.username}!
		</div>
	);
}

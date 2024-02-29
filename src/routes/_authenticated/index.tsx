import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "../../api";
import NavBar from "../../components/NavBar";

export const Route = createFileRoute("/_authenticated/")({
	component: Index,
});

function Index() {
	const { data: user } = useUser();

	return (
		<>
			<NavBar navigation={[{ name: "Home", href: "/" }]} />
			<div className="text-3xl font-bold underline">
				Hello {user?.display ?? user?.username}!
			</div>
		</>
	);
}

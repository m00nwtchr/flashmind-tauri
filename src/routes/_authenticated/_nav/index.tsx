import { createFileRoute } from "@tanstack/react-router";
import FlashCard from "../../../components/FlashCard";

export const Route = createFileRoute("/_authenticated/_nav/")({
	component: Index,
});

function Index() {
	return (
		<>
			Hello!
			<FlashCard></FlashCard>
		</>
	);
}

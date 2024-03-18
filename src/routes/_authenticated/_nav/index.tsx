import { createFileRoute } from "@tanstack/react-router";
import FC from "../../../components/FlashCard";
import { useCards } from "../../../api";

export const Route = createFileRoute("/_authenticated/_nav/")({
	component: Index,
});

function Index() {
	const { data: cards } = useCards();

	return (
		<>
			<div className="flex w-full justify-center">
				{cards?.map((card) => (
					<FC
						key={card.uid}
						card={card}
						language="pl"
						otherLanguage="en"
					/>
				))}
			</div>
		</>
	);
}

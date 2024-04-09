import { createFileRoute } from "@tanstack/react-router";
import { deckCardsQueryOptions, useDeckCards } from "../../../../api";
import FlashCardComponent from "../../../../components/FlashCard";

export const Route = createFileRoute("/_authenticated/_nav/deck/$id/")({
	loader: async ({ context: { queryClient }, params: { id } }) => {
		await queryClient.ensureQueryData(deckCardsQueryOptions(id));
	},
	component: DeckView,
});

function DeckView() {
	const { id } = Route.useParams();
	const { data: cards } = useDeckCards(id);

	return (
		<div className="m-2 flex flex-wrap justify-center">
			{cards?.map((card) => (
				<FlashCardComponent
					key={card.uid}
					card={card}
					language="pl"
					otherLanguage="en"
				/>
			))}
		</div>
	);
}

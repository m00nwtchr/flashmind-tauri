import { createFileRoute } from "@tanstack/react-router";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import {
	deckCardsQueryOptions,
	useCards,
	useDeckCards,
	useUpdateDeckCards,
} from "../../../../api";
import FlashCardComponent from "../../../../components/FlashCard";

export const Route = createFileRoute("/_authenticated/_nav/deck/$id/edit")({
	loader: async ({ context: { queryClient }, params: { id } }) => {
		await queryClient.ensureQueryData(deckCardsQueryOptions(id));
	},
	component: DeckView,
});

function DeckView() {
	const { id } = Route.useParams();

	const { data: cards } = useCards();
	const { data: deckCards } = useDeckCards(id);
	const cardsMutation = useUpdateDeckCards(id);

	return (
		<div>
			<h3>{"Karty w talii:"}</h3>
			<div className="m-2 flex flex-wrap justify-center">
				{deckCards?.map((card) => (
					<div key={card.uid}>
						<FlashCardComponent
							card={card}
							language="pl"
							otherLanguage="en"
						/>
						<button
							className="text-indigo w-14 justify-center px-3 py-1.5 text-sm font-semibold shadow-sm"
							onClick={() =>
								cardsMutation.mutate({ remove: [card.uid] })
							}
						>
							<MinusCircleIcon />
						</button>
					</div>
				))}
			</div>
			<h3>{"Karty poza talią:"}</h3>
			<div className="m-2 flex justify-center">
				{cards
					?.filter(
						(card) => !deckCards?.find((c) => c.uid === card.uid),
					)
					.map((card) => (
						<div key={card.uid}>
							<FlashCardComponent
								card={card}
								language="pl"
								otherLanguage="en"
							/>
							<button
								className="text-indigo w-14 justify-center px-3 py-1.5 text-sm font-semibold shadow-sm"
								onClick={() =>
									cardsMutation.mutate({ add: [card.uid] })
								}
							>
								<PlusCircleIcon />
							</button>
						</div>
					))}
			</div>
		</div>
	);
}

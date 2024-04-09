import { createFileRoute } from "@tanstack/react-router";
import { deckCardsQueryOptions, useDeckCards } from "../../../../api";
import FlashCardComponent from "../../../../components/FlashCard";
import { useEffect, useState } from "react";
import { FlashCard, FlashCardArray } from "../../../../entities";

export const Route = createFileRoute("/_authenticated/_nav/deck/$id/play")({
	loader: async ({ context: { queryClient }, params: { id } }) => {
		await queryClient.ensureQueryData(deckCardsQueryOptions(id));
	},
	component: PlayView,
});

function selectRandom<T>(arr: T[]): T {
	if (arr.length === 1) {
		return arr[0];
	} else {
		const rand = Math.floor(Math.random() * arr.length);

		console.log(rand, arr[rand]);
		return arr[rand];
	}
}

function PlayView() {
	const { id } = Route.useParams();
	const { data: cards } = useDeckCards(id);

	const [cardsToSee, setCardsToSee] = useState<FlashCardArray>([]);
	const [currentCard, setCurrentCard] = useState<FlashCard | null>(null);

	useEffect(() => {
		setCardsToSee(cards ?? []);
	}, [cards]);

	useEffect(() => {
		console.log(cardsToSee.length);
		setCurrentCard(selectRandom(cardsToSee));
	}, [cardsToSee]);

	if (cards) {
		return (
			<>
				<div className="m-2 flex justify-center">
					{currentCard ? (
						<FlashCardComponent
							card={currentCard}
							language="pl"
							otherLanguage="en"
							interactive={true}
						/>
					) : (
						"Koniec"
					)}
				</div>

				<button
					onClick={() =>
						setCardsToSee(
							cardsToSee.filter(
								(card) => card.uid !== currentCard?.uid,
							),
						)
					}
				>
					Następny
				</button>
			</>
		);
	} else {
		return <></>;
	}
}

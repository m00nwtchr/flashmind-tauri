import { createFileRoute } from "@tanstack/react-router";
import FC from "../../../components/FlashCard";
import { useCards, useDecks } from "../../../api";
import DeckComponent from "../../../components/Deck";

export const Route = createFileRoute("/_authenticated/_nav/")({
	component: Index,
});

function Index() {
	const { data: cards } = useCards();
	const { data: decks } = useDecks();

	return (
		<>
			<h2>Twoje karty:</h2>
			<div className="flex w-full flex-wrap justify-center">
				{cards?.map((card) => (
					<FC
						key={card.uid}
						card={card}
						language="pl"
						otherLanguage="en"
						interactive={true}
					/>
				))}
			</div>
			<h2>Twoje talie:</h2>
			<div className="flex w-full flex-wrap justify-center">
				{decks?.map((deck) => (
					<DeckComponent key={deck.uid} deck={deck} />
				))}
			</div>
		</>
	);
}

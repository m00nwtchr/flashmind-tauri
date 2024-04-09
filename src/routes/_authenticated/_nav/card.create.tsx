import { createFileRoute } from "@tanstack/react-router";
import { useCreateCard } from "../../../api";
import { useEffect, useRef, useState } from "react";
import { CreateFlashCard, FlashCard } from "../../../entities";
import FlashCardComponent from "../../../components/FlashCard";

export const Route = createFileRoute("/_authenticated/_nav/card/create")({
	component: CreateCardView,
});

function CreateCardView() {
	const mutation = useCreateCard();

	const [json, setJson] = useState("{}");
	const [card, setCard] = useState<FlashCard | null>(null);
	const [err, setErr] = useState(false);

	useEffect(() => {
		try {
			const prettyJson = JSON.stringify(JSON.parse(json), null, "\t");
			if (json !== prettyJson) {
				setJson(prettyJson);
			}
			setErr(false);
		} catch (e) {
			setErr(true);
			console.error(e);
		}
	}, [json]);

	useEffect(() => {
		try {
			const card = CreateFlashCard.parse(JSON.parse(json));
			setCard(card as FlashCard);
			// setErr(false);
		} catch (e) {
			// setErr(true);
			console.error(e);
		}
	}, [json]);

	const i = useRef(null);

	return (
		<div>
			<textarea
				className="bg-red h-80 w-full"
				ref={i}
				onChange={(e) => setJson(e.target.value)}
				value={json}
			></textarea>

			{card && (
				<div className="m-2 flex justify-center">
					<FlashCardComponent
						card={card}
						language={"pl"}
						interactive={true}
					/>
				</div>
			)}

			<button
				className={err ? "text-red-500" : ""}
				onClick={() => {
					mutation.mutate(card);
				}}
			>
				Add
			</button>
		</div>
	);
}

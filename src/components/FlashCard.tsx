import { useState } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import {
	FlashCard,
	FlashCardSection,
	FlashCardItem,
	Language,
} from "../entities";

const getItem = (
	record: Record<Language, FlashCardItem>,
	lang: Language,
): FlashCardItem | null => {
	if (lang in record) {
		return record[lang];
	} else {
		const la = lang.split("-")[0] as Language;

		if (la in record) {
			return record[la];
		} else if (la === "en" && "en-uk" in record) {
			return record["en-uk"];
		} else {
			const key = (Object.keys(record) as Language[]).find((k) =>
				k.startsWith(la),
			);

			if (key) {
				return record[key];
			}
		}

		return null;
	}
};

const renderItem = (item: FlashCardItem, i: number, lang: Language) => {
	if ("title" in item) {
		return (
			<h1 key={i} className="text-lg font-bold">
				{item.title}
				<br />
			</h1>
		);
	} else if ("pronunciation" in item) {
		return (
			<div key={`${i}-${lang}`}>
				<span className="text-sm text-gray-500">
					[{item.pronunciation.ipa}]
				</span>
				{item.pronunciation.audioUrl && (
					<AudioButton url={item.pronunciation.audioUrl} />
				)}
			</div>
		);
	} else if ("image" in item) {
		return <img key={i} src={item.image} className="inline" />;
	}
};

const renderSection = (
	lang: Language,
	section: FlashCardSection,
	i: number,
) => {
	switch (section.type) {
		case "Separator":
			return <div key={i} className="mb-2 mt-2 h-1 border-t"></div>;
		case "Item":
			return renderItem(section.content, i, lang);
		case "Lang": {
			const item = getItem(
				section.content as Record<Language, FlashCardItem>,
				lang,
			);
			if (item) {
				return renderItem(item, i, lang);
			}
		}
	}
};

export default function FlashCardComponent({
	card,
	language,
	otherLanguage,
	footer,
}: {
	card: FlashCard;
	language: Language;
	otherLanguage: Language;
	footer?: boolean;
}) {
	const [reverse, setReverse] = useState(false);
	const toggleReverse = () => setReverse(!reverse);

	return (
		<div
			onClick={toggleReverse}
			className="m-1 min-h-60 min-w-40 max-w-80 border p-1 text-center hover:cursor-pointer"
		>
			{card.content.map((section, i) => {
				return renderSection(
					!reverse ? language : otherLanguage,
					section,
					i,
				);
			})}
			{footer && (
				<div className="border-t text-start text-sm text-gray-500">
					By {card.creator} | {card.share}
				</div>
			)}
		</div>
	);
}

function AudioButton({ url }: { url: string }) {
	const [audio] = useState(new Audio(url));

	return (
		<button
			className="size-5"
			onClick={(e) => {
				e.stopPropagation();
				void audio.play();
			}}
		>
			<SpeakerWaveIcon className="inline" />
		</button>
	);
}

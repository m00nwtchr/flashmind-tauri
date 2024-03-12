import { useEffect, useState } from "react";
import {
	FlashCard,
	FlashCardItem,
	FlashCardSection,
} from "../../../flashmind/entity/bindings";
import { Language } from "../../../flashmind/entity/bindings/Language";
import { useCard } from "../api";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

const getItem = (lang: Language, section: Record<Language, FlashCardItem>) => {
	if (lang in section) {
		return section[lang];
	} else {
		const la = lang.split("-")[0] as Language;
		if (la in section) {
			return section[la];
		} else if (la === "en") {
			return section["en-uk"];
		} else {
			const key = Object.keys(section).find((k) => k.startsWith(la)) as
				| Language
				| undefined;

			if (key) {
				return section[key];
			} else {
				return null;
			}
		}
	}
};

export default function FlashCard() {
	const card = {
		share: "Public",
		content: [
			{
				en: {
					title: "information",
				},
				pl: {
					title: "informacja",
				},
			},
			{
				"en-uk": {
					pronunciation: {
						ipa: "ˌɪn.fɚˈmeɪ.ʃən",
						audioUrl:
							"https://upload.wikimedia.org/wikipedia/commons/3/38/En-us-information.ogg",
					},
				},
				"en-us": {
					pronunciation: {
						ipa: "ˌɪn.fɚˈmeɪ.ʃən",
						audioUrl:
							"https://upload.wikimedia.org/wikipedia/commons/3/38/En-us-information.ogg",
					},
				},
				pl: {
					pronunciation: {
						ipa: "in.fɔrˈmat͡s.ja",
						audioUrl:
							"https://upload.wikimedia.org/wikipedia/commons/8/89/Pl-informacja.ogg",
					},
				},
			},
		],
	} as FlashCard;

	const myLang = "pl";
	const otherLang = "en";
	const reverse = true as boolean;

	return (
		<div className="w-full">
			<div>
				{card.content
					.map((section) =>
						!reverse
							? getItem(myLang, section)
							: getItem(otherLang, section),
					)
					.filter((o) => o !== null)
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					.map((item) => {
						if (item) {
							if ("title" in item) {
								return (
									<span key={"title"}>
										{item.title}
										<br />
									</span>
								);
							} else if ("pronunciation" in item) {
								return (
									<>
										<span
											key={"pronunciation"}
											className="text-gray-500"
										>
											[{item.pronunciation.ipa}]
										</span>
										{item.pronunciation.audioUrl && (
											<AudioButton
												url={
													item.pronunciation.audioUrl
												}
											/>
										)}
									</>
								);
							}
						}

						return <></>;
					})}
			</div>
		</div>
	);
}

function AudioButton({ url }: { url: string }) {
	const [audio] = useState(new Audio(url));

	return (
		<button className="size-5" onClick={() => void audio.play()}>
			<SpeakerWaveIcon />
		</button>
	);
}

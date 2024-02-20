import { useDispatch, useSelector } from "react-redux";
import scss from "./Cards.module.scss";
import { Button } from "../ul/button/Button";
import { useState } from "react";

interface TodoItem {
	id: number;
	title: string;
	date: string;
	img: string;
}

export const Cards = () => {
	const renderResults = useSelector((state: TodoItem[]) => state);
	const dispatch = useDispatch();

	const [titleValue, setTitleValue] = useState<string>("");
	const [dateValue, setDateValue] = useState<string>("");
	const [imgValue, setImgValue] = useState<string>("");
	const [resultPatch, setResultPatch] = useState<number | null>(null);
	const [result, setResult] = useState<boolean>(false);

	const deleteCards = (id: number) => {
		dispatch({ type: "DELETE", payload: { id: id } });
	};

	const patchCardsResult = (item: TodoItem) => {
		dispatch({
			type: "PATCH_TODO",
			payload: {
				id: item.id,
				title: titleValue,
				date: dateValue,
				img: imgValue,
			},
		});
		setResultPatch(null);
	};

	const patchCards = (item: TodoItem) => {
		setResultPatch(item.id);
	};

	return (
		<div className={scss.cards}>
			{renderResults?.map((item) => (
				<div className={scss.card} key={item.id}>
					{resultPatch === item.id ? (
						<>
							<input
								className={scss.inputs}
								type="text"
								value={result ? item.title : titleValue}
								onChange={(e) => {
									setResult(false);
									setTitleValue(e.target.value);
								}}
							/>
							<input
								className={scss.inputs}
								type="date"
								value={result ? item.date : dateValue}
								onChange={(e) => {
									setResult(false);
									setDateValue(e.target.value);
								}}
							/>
							<input
								className={scss.inputs}
								type="url"
								value={result ? item.img : imgValue}
								onChange={(e) => {
									setResult(false);
									setImgValue(e.target.value);
								}}
							/>
							<Button onClick={() => setResultPatch(null)}>Noo</Button>
							<Button onClick={() => patchCardsResult(item)}>Patch2</Button>
						</>
					) : (
						<>
							<h2>{item.title}</h2>
							<p>{item.date}</p>
							<img src={item.img} alt={item.title} />
							<Button
								onClick={() => {
									setResult(true);
									patchCards(item);
								}}>
								Patch
							</Button>
							<Button onClick={() => deleteCards(item.id)}>Delete</Button>
						</>
					)}
				</div>
			))}
		</div>
	);
};

import { FC, useState } from "react";
import scss from "./NewTodoList.module.scss";
import Input from "../ul/input/Input";
import { Button } from "../ul/button/Button";
import { useDispatch } from "react-redux";
import { Cards } from "../cards/Cards";
export const NewTodoList: FC = () => {
	const dispatch = useDispatch();
	const [titleValue, setTitleValue] = useState<string>("");
	const [dateValue, setDateValue] = useState<string>("");
	const [imgValue, setImgValue] = useState<string>("");
	function addTodoList() {
		if (titleValue === "" && dateValue === "" && imgValue === "") {
			alert("Бир нерсе жазыныз input ка!");
			return null;
		} else {
			dispatch({
				type: "ADD_TODO",
				payload: {
					id: Math.random(),
					title: titleValue,
					date: dateValue,
					img: imgValue,
				},
			});
			setTitleValue("");
			setDateValue("");
			setImgValue("");
		}
	}

	const deleteAll = () => {
		dispatch({type: 'DELETE_ALL', payload: {id: Math.random()}})
	};

	return (
		<div className={scss.newtodolist}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.form}>
						<h1>Todo-List</h1>
						<Input
							type="text"
							value={titleValue}
							setData={setTitleValue}
							placeholder="text..."
						/>
						<Input type="date" value={dateValue} setData={setDateValue} placeholder="date..."/>
						<Input
							type="url"
							value={imgValue}
							setData={setImgValue}
							placeholder="photos..."
						/>
						<Button onClick={addTodoList}>Add todo</Button>
						<Button onClick={() => deleteAll()}>Delete All</Button>
					</div>
					<div className={scss.cards_todo_list}>
						<Cards />
					</div>
				</div>
			</div>
		</div>
	);
};

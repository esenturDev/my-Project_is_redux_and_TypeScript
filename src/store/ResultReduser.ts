interface TodoItem {
	id: number;
	title: string;
	date: string;
	img: string;
}

const initialTodo: TodoItem[] = [];

export const reduserTodoList = (
	state = initialTodo,
	action: { type: string; payload: {id: number, title: string, date: string, img: string} }
) => {
	switch (action.type) {
		case "ADD_TODO":
			return [...state, action.payload];
		case "DELETE":
			return state.filter((item) => item.id !== action.payload.id);
		case "DELETE_ALL":
			return state.filter((item) => item.id === action.payload.id);
		case "PATCH_TODO":
			return state.map((item: TodoItem) =>
				item.id === action.payload.id
					? {
							...item,
							title: action.payload.title,
							date: action.payload.date,
							img: action.payload.img,
					}
					: item
			);
		default:
			return state;
	}
};

import { ActionTypes } from "../constants/actionType";

const initialState = {
    todoSections: [],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TODO_SECTION:
            return {
                ...state,
                todoSections: [
                    ...state.todoSections,
                    action.payload
                ],
            };

        case ActionTypes.DELETE_TODO_SECTION:
            return {
                ...state,
                todoSections: [],
            };

        case ActionTypes.DELETE_ONE_SECTION:
            return {
                ...state,
                todoSections: action.payload
            };

        case ActionTypes.ADD_TODO_TASK:
            return {
                ...state,
                todoSections: action.payload
            };

        case ActionTypes.REMOVE_TODO_TASK:
            return {
                ...state,
                todoSections: action.payload
            };

        case ActionTypes.EDIT_TODO_TASK:
            return {
                ...state,
                todoSections: action.payload
            };
        case ActionTypes.SELECTED_TASK:
            return {
                ...state,
                todoSections: action.payload
            };

        default:
            return state;
    }
};

export default todoReducer;

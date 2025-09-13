import { ActionTypes } from "../constants/actionType";

export const addTodoTask = (TaskData) => ({
    type: ActionTypes.ADD_TODO_TASK,
    payload:  TaskData ,
});

export const removeTodoTask = (removeTask) => ({
    type: ActionTypes.REMOVE_TODO_TASK,
    payload: removeTask,
});

export const editTodoTask = (EditTask) => ({
    type: ActionTypes.EDIT_TODO_TASK,
    payload: EditTask,
});

export const addTodoSection = (data) => ({
    type: ActionTypes.ADD_TODO_SECTION,
    payload: data
});

export const deleteTodoSection = () => ({
    type: ActionTypes.DELETE_TODO_SECTION,
});

export const deleteOneTodoSection = (DeleteSec) => ({
    type: ActionTypes.DELETE_ONE_SECTION,
    payload: DeleteSec
});

export const selectedTask = (SelectedTask) => ({
    type: ActionTypes.SELECTED_TASK,
    payload: SelectedTask
});
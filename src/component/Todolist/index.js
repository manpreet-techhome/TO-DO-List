import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTodoSection,
    addTodoTask,
    deleteOneTodoSection,
    deleteTodoSection, editTodoTask,
    removeTodoTask,
    selectedTask
} from '../../redux/actions/todoAction';
import swal from 'sweetalert';
import { toast } from 'react-toastify';


const TodoList = () => {
    const toastId = useRef(null);
    const [task, setTask] = useState({});
    const [todoTitle, setTodoTitle] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const dispatch = useDispatch();
    const allTodoSections = useSelector(state => state.todo.todoSections || []);
    console.log(allTodoSections, "todoList");

    // show only one toast at one time
    const showToast = (msg) => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(msg);
        }
    };

    const handleTaskInputChange = (sectionId, value) => {
        setTask({ [sectionId]: value });
    };

    // add Todo Section 
    const handleAddTodo = () => {
        if (!todoTitle) {
            showToast("Please Enter Todo Title")
        }
        if (todoTitle.trim()) {
            const data = {
                id: Date.now(),
                title: todoTitle,
                tasks: []
            }
            dispatch(addTodoSection(data));
            setTodoTitle('');
        }
    };

    //Delete all  Todo section
    const handleDeleteTodo = () => {
        if (allTodoSections.length == 0) {
            toast.success("Todo section Data already Deleted ")
        }
        else {
            swal({
                title: "Are you sure?",
                text: "Once removed, you will not be able to recover these Todo Sections!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        dispatch(deleteTodoSection())
                    }
                });
        }
    }

    //Delete Only one  Todo section
    const handleDeleteOneTodo = (sectionId) => {
        swal({
            title: "Are you sure?",
            text: "Once removed, you will not be able to recover this Todo Section!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const DeleteSec = allTodoSections.filter((item => item.id !== sectionId))
                    dispatch(deleteOneTodoSection(DeleteSec))
                }
            });
    }


    //Add task in Todo
    const handleAddTask = (sectionId) => {
        if (!task[sectionId]) {
            showToast("Please Enter Todo Task")
        }
        if (task[sectionId]?.trim()) {
            const TaskData = allTodoSections.map(item =>
                item.id === sectionId
                    ? { ...item, tasks: [...item.tasks, { id: Date.now(), task: task[sectionId] }] }
                    : item
            )
            dispatch(addTodoTask(TaskData));
            setTask({ [sectionId]: '' });
        }

    };

    //Remove Task From Todo
    const handleRemoveTask = (sectionId, taskId) => {
        swal({
            title: "Are you sure?",
            text: "Once removed, you will not be able to recover this Task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const removeTask = allTodoSections.map((item =>
                        item.id === sectionId ?
                            {
                                ...item, tasks: item.tasks.filter(task => task.id !== taskId)
                            }
                            : item
                    ))
                    dispatch(removeTodoTask(removeTask));
                }
            });
    };


    //Edit task in Todo
    const handleEditTask = (sectionId, taskId, newTask) => {
        const EditTask = allTodoSections.map((item =>
            item.id === sectionId ?
                {
                    ...item, tasks: item.tasks.map(taskItem =>
                        taskItem.id === taskId ? { ...taskItem, task: newTask } : taskItem)
                }
                : item
        ))
        dispatch(editTodoTask(EditTask));
        setEditingTask('')
    };

    //Select task in Todo
    const handleSelectedTask = (sectionId, taskId) => {
        const SelectedTask = allTodoSections.map(item =>
            item.id === sectionId
                ? {
                    ...item, tasks: item.tasks.map(taskItem =>
                        taskItem.id === taskId ? { ...taskItem, selected: !taskItem.selected } : taskItem)
                }
                : item
        );
        dispatch(selectedTask(SelectedTask));
    };

    return (
        <div className='todoSection'>
            <div className='addTodoBox controlInput mb-3'>
                <input
                    type="text"
                    placeholder="Add a Todo"
                    className='form-control inputControl'
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
                <button className='addPRoductBx'
                    onClick={handleDeleteTodo}
                >
                    Clear All
                </button>
                <button className='continueAmountBtn' onClick={handleAddTodo}>
                    Add TODO
                </button>
            </div>
            <div className='row'>
                {allTodoSections?.map((section, idx) => (
                    <div className='col-lg-4 mb-4' key={idx}>
                        <div className='todoSubSec'>
                            <div className='d-flex align-items-center justify-content-between mb-4'>
                                <h2 className='headingMain'>{section.title}</h2>
                                <button
                                    className='addPRoductBx pb-2 pt-2'
                                    onClick={() => handleDeleteOneTodo(section.id)}
                                >
                                    Delete
                                </button>
                            </div>
                            <div className='controlInput'>
                                <input
                                    type="text"
                                    placeholder="Add a new task"
                                    className='form-control inputControl'
                                    value={task[section.id] || ''}
                                    onChange={(e) => handleTaskInputChange(section.id, e.target.value)}
                                />
                                <button
                                    className='continueAmountBtn'
                                    onClick={() => handleAddTask(section.id)}
                                >
                                    Add
                                </button>
                            </div>
                            <ul>
                                {section.tasks.map((task) => (
                                    <li key={task.id} className='listBox'>
                                        <div className="form-check checkBlue ps-0">
                                            <input
                                                className="form-check-input d-none"
                                                type="checkbox"
                                                value=""
                                                id={`flexCheck${task.id}`}
                                                checked={task.selected || false}
                                                onChange={(e) => handleSelectedTask(section.id, task.id)}
                                            />
                                            {editingTask?.id === task.id ? (
                                                <input
                                                    type="text"
                                                    className='form-control editInput'
                                                    value={editingTask.value}
                                                    onChange={(e) => setEditingTask({ id: task.id, value: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleEditTask(section.id, task.id, editingTask.value);
                                                        }
                                                    }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <label
                                                    className="form-check-label productTitle"
                                                    htmlFor={`flexCheck${task.id}`}
                                                >
                                                    {task.task || "Please Add Task"}
                                                </label>
                                            )}
                                        </div>
                                        <div className='todoBtn'>
                                            <button className='EditBtn'
                                                onClick={() => setEditingTask({ id: task.id, value: task.task })}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button className='deleteBtn'
                                                onClick={() => handleRemoveTask(section.id, task.id)}
                                            >
                                                <i className="fa-solid fa-trash "></i>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;

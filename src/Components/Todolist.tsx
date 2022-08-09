import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskPropsType} from "../App";

type TodolistPropsType = {
    title: string
    todoId: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string, todoId: string) => void
    changeFilter: (todoId: string, value: FilterValuesType) => void
    addTask: (taskTitle: string, todoId: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean, ) => void
    filter: FilterValuesType
    removeTodolist: (todoId:string) => void
}

const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeFilterAllHandler = () => {
        props.changeFilter(props.todoId,'all')
    }

    const changeFilterActiveHandler = () => {
        props.changeFilter(props.todoId,'active')
    }

    const changeFilterCompletedHandler = () => {
        props.changeFilter(props.todoId,'completed')
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle.trim(), props.todoId)
            setTaskTitle('')
        } else {
            setError('Title is wrong!')
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoId)
    }

    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={removeTodolistHandler}> ✖ </button>
                </h3>
                <div>
                    <input
                        value={taskTitle}
                        onChange={onChangeInputHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? 'error' : ''}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {error && <div className='error-message'> {error} </div>}
                </div>
                <ul>
                    {props.tasks.map((task) => {

                            const onClickRemoveHandler = () => {
                                props.removeTask(task.id, props.todoId)
                            }

                            const onCheckedStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.todoId ,task.id, e.currentTarget.checked)
                            }
                            return <li
                                key={task.id}
                                className={task.isDone ? 'is-done': ''}
                            >
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={onCheckedStatusHandler}/>
                                <span> {task.taskTitle} </span>
                                <button onClick={onClickRemoveHandler}> ✖</button>
                            </li>
                        }
                    )}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={changeFilterAllHandler}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={changeFilterActiveHandler}>Active</button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={changeFilterCompletedHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;

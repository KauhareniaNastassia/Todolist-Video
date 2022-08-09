import React, {useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from "uuid";
import todolist from "./Components/Todolist";

export type TaskPropsType ={
    id: string,
    taskTitle: string,
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskPropsType>
}

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    todoId: string,
    todoTitle: string,
    filter: FilterValuesType
}

function App() {

    let tododolistId1 = v1()
    let tododolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {todoId: tododolistId1, todoTitle: 'What to learn', filter: 'all'},
            {todoId: tododolistId2, todoTitle: 'What to buy', filter: 'all'},
        ]
    )

    let[tasks, setTasks] = useState<TasksStateType>({
        [tododolistId1] : [
            { id: v1(), taskTitle: "HTML&CSS", isDone: true },
            { id: v1(), taskTitle: "JS", isDone: true },
            { id: v1(), taskTitle: "ReactJS", isDone: false }
        ],
        [tododolistId2]: [
            { id: v1(), taskTitle: "Rest API", isDone: true },
            { id: v1(), taskTitle: "GraphQL", isDone: false }
        ]
    }
       )


    function removeTask(id: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter( task => task.id !== id)
        setTasks({...tasks})
       /* tasks = tasks.filter( task => task.id !== id)
        setTasks(tasks)*/
    }

    function changeFilter(todoId: string, value: FilterValuesType) {

        setTodolists( todolists.map( filteredTL => filteredTL.todoId === todoId ? {...filteredTL, filter: value} : filteredTL) )

       /* let todolist = todolists.map(tl => tl.todoId === todoId ? tl.filter = value : tl)
        setTodolists([...todolists])*/
    }

    function addTask(taskTitle: string, todolistId: string) {
        let newTask = {id: v1(), taskTitle: taskTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

       /* let newTask = {id: v1(), taskTitle: taskTitle, isDone: false};
        setTasks([newTask, ...tasks]);*/
    }

    function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {

        setTasks({...tasks, [todolistId]: tasks[todolistId].map( task => task.id === id ? {...task, isDone: isDone} : task)})

        /*let task = tasks.map( task => task.id === id ? task.isDone = isDone : task)
        setTasks([...tasks])*/
    }

    function removeTodolist(todoId:string) {
        setTodolists( todolists.filter( tl => tl.todoId !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {
                todolists.map( tl => {
                    let tasksForTodolist = tasks[tl.todoId]
                    if(tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.todoId].filter(task => !task.isDone)
                    }
                    if(tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.todoId].filter(task => task.isDone)
                    }

                   return <Todolist
                       key={tl.todoId}
                       todoId={tl.todoId}
                       title={tl.todoTitle}
                       tasks={tasksForTodolist}
                       removeTask={removeTask}
                       changeFilter={changeFilter}
                       addTask={addTask}
                       changeTaskStatus={changeTaskStatus}
                       filter={tl.filter}
                       removeTodolist={removeTodolist}
                   />
                })
            }


        </div>
    );
}

export default App;

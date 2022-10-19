import {setTodolistAC, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {tasksReducer} from "./tasks-reducer";

test( 'empty arrays should be added when we set todolists', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = setTodolistAC(startState)

    const endState = tasksReducer( {}, action )

    const keys = Object.keys(endState)

expect(keys.length).toBe(2)

} )
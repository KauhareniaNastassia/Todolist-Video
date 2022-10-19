import {setTodolistAC, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";

test( 'todolists should be set to the state', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = setTodolistAC(startState)

    const endState = todolistsReducer( [], action )

expect(endState.length).toBe(2)

} )
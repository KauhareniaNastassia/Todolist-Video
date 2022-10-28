import {setAppErrorAC, setAppErrorACType, setAppStatusAC, setAppStatusACType} from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'

const test1 = (data: string[] | number[] | Object[] | Boolean[] | {name: string, age: number}): string[] | number[] | Object[] | Boolean[] | {name: string, age: number} => {
    return data
}

const array = {name: 'Test', age: 12}
const arrayString = ['dd', 'sdfa']

const jen = <T>(data: T): T => {
    return data
}

const res1 = test1(array)
const res2 = jen(array)
const res3 = jen(arrayString)


// generic function
export const handleServerAppError = <D>( dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: { message: string }) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = setAppStatusACType | setAppErrorACType
import UserController from "../controller/userController"
import { describe, test, expect } from "@jest/globals"

describe('Sum function', () =>{
    test('Returns correct value', () =>{
        expect(UserController.sum(2, 3)).toEqual(5)
    })
})
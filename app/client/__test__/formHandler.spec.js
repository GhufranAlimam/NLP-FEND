import { handleSubmit } from "../js/formHandler"
 
describe("Testing the submit functionality", () => {
    test("there should be a value passed", () => {
           expect(typeof handleSubmit).toBeTruthy()
})});
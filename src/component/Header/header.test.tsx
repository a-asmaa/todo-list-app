/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react"
import Header from "./header"


const mockTaskAdd = () => console.log("add task function")


describe('Header', () => {

    it('Header Component should match with snapshot', () => {
        const mockTaskAdd = () => console.log("add task function")
        expect(render(<Header handleTaskAdd={mockTaskAdd} />)).toMatchSnapshot() // snapshot from component 
    })

    it('Test elements rendering', () => {
        expect(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByRole('button')[0]).toBeEnabled();
        expect(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByTestId('h-app')[0]).toHaveTextContent('Track your Tasks');
    })


    it('Test input', () => {
        // change input
        fireEvent.change(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByTestId('input-task')[0], { target: { value: "new Task" } })
        // click button
        fireEvent.click(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByRole('button')[0])

        expect(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByTestId('input-task')[0]).toHaveTextContent('');
    })
})


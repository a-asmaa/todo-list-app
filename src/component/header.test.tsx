/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, getByTestId, render, RenderResult, waitFor } from "@testing-library/react"
import Header from "./header"
import { cleanup } from '@testing-library/react'


it('Header Component should match with snapshot', () => {
    const mockTaskAdd = () => console.log("add task function")
    expect(render(<Header handleTaskAdd={mockTaskAdd} />)).toMatchSnapshot() // snapshot from component 
    expect(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByRole('button')[0]).toBeEnabled();

})

it('Test Header rendering', () => {
    const mockTaskAdd = () => console.log("add task function")

    expect(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByTestId('h-app')[0]).toHaveTextContent('Track your Tasks');

})


it('Test input', () => {
    const mockTaskAdd = () => console.log("add task function")

    // change input
    fireEvent.change(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByTestId('input-task')[0], { target: { value: "new Task" } })

    // click button
    fireEvent.click(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByRole('button')[0])

    expect(render(<Header handleTaskAdd={mockTaskAdd} />).getAllByTestId('input-task')[0]).toHaveTextContent('');



    // screen.getByText()
    // expect(screen.queryByTestId('add-btn')).toBeEnabled();
})   

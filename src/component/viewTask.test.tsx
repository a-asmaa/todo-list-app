import { getByTestId, render, screen } from "@testing-library/react"
import { IViewTask } from "../modules/ViewTaskProps"
import ViewTask from "./viewTask"


it('Header Component should match with snapshot', () => {

    const props: IViewTask = {
        handleSave: () => console.log("saveFn"),
        item: null,
        onHide: () => console.log('closeModel'),
        type: "todo",
        show: true
    }
    expect(render(<ViewTask {...props} />)).toMatchSnapshot() // snapshot from component 
})

it('Test Modal rendering', () => {
    // screen.getByText('Track your Tasks')
    // console.log(screen.queryByTestId('button'));

    // expect(screen.queryByTestId('button')).toBeVisible();
})   

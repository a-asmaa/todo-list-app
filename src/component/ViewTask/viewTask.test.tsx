/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react"
import { IViewTask } from "../../modules/ViewTaskProps"
import ViewTask from "./viewTask"

const props: IViewTask = {
    onSave: () => console.log("saveFn"),
    item: null,
    onHide: () => console.log('closeModel'),
    type: "todo",
    show: true
}

describe('Modal', () => {

    it('Component should match with snapshot', () => {
        expect(render(<ViewTask {...props} />)).toMatchSnapshot()  // snapshot from component 
    })

    it('Test Modal rendering', () => {

        expect.assertions(3)
        expect(render(<ViewTask {...props} />).getAllByTestId('h-modal')[0]).toHaveTextContent('Task Details');
        expect(render(<ViewTask {...props} />).getAllByTestId('label-name')[0]).toHaveTextContent('🖊 Task Name');
        expect(render(<ViewTask {...props} />).getAllByTestId('label-desc')[0]).toHaveTextContent('📃 Description');

    })

    it('Test Modal btn', () => {

        expect.assertions(2)
        expect(render(<ViewTask {...props} />).getAllByTestId('close-btn')[0]).toBeEnabled();
        expect(render(<ViewTask {...props} />).getAllByTestId('save-btn')[0]).not.toBeVisible();

    })

})


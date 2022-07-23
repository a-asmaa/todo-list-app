import React, { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'

function Header(props: { handleTaskAdd: any }) {

    const { handleTaskAdd } = props;
    const [task, setTask] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && task !== '') handleTaskAdd(task, setTask)
    }

    return (
        <div className='header'>
            <h2 data-testid="h-app">Track your Tasks</h2>

            <Stack direction="horizontal" gap={2} className="mb-3" style={{ width: "50%" }}>
                <Form.Control className="me-auto"
                    placeholder="add new task.."
                    value={task}
                    data-testid="input-task"
                    onKeyDown={handleEnter}
                    onChange={handleChange}
                />
                <Button data-testid="add-btn" variant='outline-primary' onClick={() => handleTaskAdd(task, setTask)} > Add </Button>
            </Stack>
        </div>
    )
}

export default Header
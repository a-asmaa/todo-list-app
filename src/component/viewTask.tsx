import React from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import { IViewTask } from '../modules/ViewTaskProps';

function ViewTask(props: IViewTask) {

    const [isEdit, setIsEdit] = React.useState(false);
    const [name, setName] = React.useState(props.item?.name);
    const [description, setDescription] = React.useState(props.item?.description);

    console.log(isEdit);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body>
                <Stack direction='horizontal' gap={3} className="mb-4 justify-content-between">
                    <h5> Task Details </h5>
                    {!isEdit ?
                        <i role="button" className="bi bi-pencil-square" onClick={() => setIsEdit(!isEdit)} />
                        :
                        <i role="button" className="bi bi-x-lg" onClick={() => setIsEdit(!isEdit)} />
                    }
                </Stack>

                <Form.Label as={'h6'}>🖊 Task Name </Form.Label>
                {!isEdit ? <p className='mx-4 mb-3'> {props.item?.name}  </p>
                    :
                    <Form.Control className="me-auto mb-3 mx-4" defaultValue={props.item?.name} placeholder='task name..' value={name} onChange={e => setName(e.target.value)} />
                }
                <Form.Label as={'h6'}> 📃 Description </Form.Label>
                {!isEdit ?
                    <p className='mx-4'> {props.item?.description === "" ? "-" : props.item?.description} </p>
                    :
                    <Form.Control as="textarea" rows={3} className="me-auto mx-4" defaultValue={props.item?.description}
                        placeholder='description ..' value={description} onChange={e => setDescription(e.target.value)}
                    />
                }

            </Modal.Body>
            <Modal.Footer>
                <Button hidden={!isEdit}
                    onClick={() => {
                        props.handleSave(props.type, props.item, name, description)
                        props.onHide()
                    }}
                >
                    Save
                </Button>
                <Button onClick={() => {
                    setIsEdit(false);
                    setName('');
                    setDescription('')
                    props.onHide()
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewTask
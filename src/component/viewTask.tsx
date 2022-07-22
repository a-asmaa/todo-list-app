import React from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import { Item } from '../modules/columnTypes'
import { IViewTask } from '../modules/ViewTaskProps';

function ViewTask(props: IViewTask) {

    const [isEdit, setIsEdit] = React.useState(false);
    const [name, setName] = React.useState(props.item?.name);
    const [description, setDescription] = React.useState(props.item?.description);

    console.log(props, isEdit, name, description, props.item?.name);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body>
                <Stack direction='horizontal' gap={3} className="mb-4 justify-space-between">
                    {!isEdit ?
                        <h4> {props.item?.name} </h4>
                        :
                        <div>
                            <Form.Label> Task Name </Form.Label>
                            <Form.Control className="me-auto" defaultValue={props.item?.name} placeholder='task name..' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    }

                    {!isEdit ? <i role="button" className="bi bi-pencil-square" onClick={() => setIsEdit(!isEdit)} />
                        :
                        <i role="button" className="bi bi-x-lg" onClick={() => setIsEdit(!isEdit)} />
                    }
                </Stack>

                {!isEdit ?
                    <p> {props.item?.description} </p>
                    :
                    <>
                        <Form.Label> Description </Form.Label>
                        <Form.Control as="textarea" rows={3} className="me-auto" defaultValue={props.item?.description} placeholder='description ..' value={description} onChange={e => setDescription(e.target.value)} />

                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button hidden={!isEdit} onClick={() => props.handleSave(props.type, props.item, name, description)}>Save</Button>
                <Button onClick={() => {
                    setIsEdit(false);
                    setName('');
                    setDescription('')
                    props.onHide()
                }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewTask
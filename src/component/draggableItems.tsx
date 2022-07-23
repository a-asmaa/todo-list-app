import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Form, Stack } from 'react-bootstrap'
import { Item } from '../modules/columnTypes';
import { IDraggableItems } from '../modules/DragItemProps';
import ViewTask from './ViewTask/viewTask';

function DraggableItems(props: IDraggableItems) {

  const { index, handleEdit, handleInLineEdit, item, handleDelete, keyValue } = props;
  const [type, setType] = useState<string>('')
  const [viewItem, setViewItem] = useState<Item>()
  const [editTask, setEditTask] = useState<string>('')
  const [modalShow, setModalShow] = React.useState(false);


  return (<>
    <Draggable key={item.id} index={index} draggableId={item.id} isDragDisabled={keyValue === "done"} >
      {(provided, snapshot) => {
        return (
          <div
            className={`item ${snapshot.isDragging && "dragging"}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Stack direction='horizontal' className='justify-content-between'>

              {item.isEdit ?
                <Form.Control className="me-auto"
                  placeholder='task name'

                  value={editTask} onChange={e => setEditTask(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleEdit(keyValue, item, editTask, item.description)
                      setEditTask('')
                      setModalShow(false)
                    }
                  }}
                />
                :
                <span>{item.name}</span>
              }
              <div>
                <i role='button' className={`bi m-2 ${item.isEdit ? 'bi-x-lg' : 'bi-pencil-square'}`}
                  data-testid="edit-btn"
                  onClick={() => {
                    setEditTask(item.name)
                    handleInLineEdit(item, keyValue)

                  }} />

                <i role='button' className="bi bi-trash"
                  onClick={() => handleDelete(keyValue, index)}
                  hidden={item.isEdit} />
              </div>

            </Stack>

            <i role='button' className="bi bi-eye"
              data-testid="view-btn"
              onClick={() => {
                setType(keyValue)
                setViewItem(item)
                setModalShow(true)
              }}
            />
          </div>
        )
      }}
    </Draggable>

    {modalShow &&
      <ViewTask
        show={modalShow}
        type={type}
        item={viewItem!}
        onHide={() => setModalShow(false)}
        onSave={handleEdit}
      />
    }

  </>
  )
}

export default DraggableItems
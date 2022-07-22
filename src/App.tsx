import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import './App.css';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { ColumnsTypes, Item } from './modules/columnTypes';
import ViewTask from './component/viewTask';
import "bootstrap-icons/font/bootstrap-icons.css";
import { columnsTypes } from './modules/Data';




function App() {

  const [modalShow, setModalShow] = React.useState(false);
  const [state, setState] = useState<ColumnsTypes>(columnsTypes)
  const [task, setTask] = useState<string>('')
  const [editTask, setEditTask] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [viewItem, setViewItem] = useState<Item>()


  useEffect(() => {

    let data = localStorage.getItem('tasks');
    if (data) setState(JSON.parse(data))

  }, [])

  const handleDragEnd = (dragResult: DropResult) => {
    const { destination, source } = dragResult;

    if (!destination) return
    if (destination.index === source.index && destination.droppableId === source.droppableId) return

    const itemCopy = { ...state[source.droppableId].items[source.index] }

    setState(prev => {
      prev = { ...prev }

      prev[source.droppableId].items.splice(source.index, 1) // delete item 
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy) // Add to new destination 

      localStorage.setItem('tasks', JSON.stringify(prev));
      return prev
    })
  }

  const handleTaskAdd = () => {

    const newItem: Item = { id: Math.random().toString().slice(5), name: task, description: "", isEdit: false }
    setState(prev => {
      prev = { ...prev }
      prev["todo"].items.push(newItem)

      localStorage.setItem('tasks', JSON.stringify(prev));
      return prev
    })
    setTask('')
  }

  const handleDelete = (key: string, index: number) => {
    setState(prev => {
      prev = { ...prev }
      prev[key].items.splice(index, 1)

      localStorage.setItem('tasks', JSON.stringify(prev));
      return prev
    })

  }

  const handleEdit = (key: string, item: Item, name: string, description: string) => {

    setState(prev => {
      prev = { ...prev }
      let _item = prev[key].items.filter(x => x.id === item.id);

      _item[0].description = description;
      _item[0].name = name;
      _item[0].isEdit = false;
      console.log(_item, prev);

      localStorage.setItem('tasks', JSON.stringify(prev));
      return prev
    })
    setModalShow(false)
  }

  const handleInLineEdit = (item: Item, key: string) => {
    setEditTask(item.name)
    setState(prev => {
      prev = { ...prev }
      let _item = prev[key].items.filter(x => x.id === item.id);

      _item[0].isEdit = !_item[0].isEdit;
      localStorage.setItem('tasks', JSON.stringify(prev));
      return prev
    })
  }

  return (
    <Container className='mt-3' >

      <div className='header'>
        <h2> Track your Tasks </h2>

        <Stack direction="horizontal" gap={2} className="mb-3" style={{ width: "50%" }}>
          <Form.Control className="me-auto" placeholder="add new task.." value={task}
            onKeyDown={e => { if (e.key === 'Enter') handleTaskAdd() }}
            onChange={e => setTask(e.target.value)} />
          <Button variant='outline-primary' onClick={handleTaskAdd} > Add </Button>
        </Stack>
      </div>


      <div className="col-list">
        <DragDropContext onDragEnd={(e) => handleDragEnd(e)} >

          {Object.keys(state).map(key => {
            return <div key={key} className={"column"}>
              <h4>{state[key].title}</h4>
              <Droppable droppableId={key} >
                {(provided, snapshot) => {
                  return (<div ref={provided.innerRef} {...provided.droppableProps} className={"col-droppable"}>

                    {state[key].items.map((el: Item, index: any) => {
                      return (
                        <Draggable key={el.id} index={index} draggableId={el.id} isDragDisabled={key === "done"} >
                          {(provided, snapshot) => {
                            return (
                              <div
                                className={`item ${snapshot.isDragging && "dragging"}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Stack direction='horizontal' className='justify-content-between'>

                                  {el.isEdit ?
                                    <Form.Control className="me-auto"
                                      placeholder='task name'
                                      value={editTask} onChange={e => setEditTask(e.target.value)}
                                      onKeyDown={e => {
                                        if (e.key === "Enter") {
                                          handleEdit(key, el, editTask, el.description)
                                          setEditTask('')
                                        }
                                      }}
                                    />
                                    :
                                    <span>{el.name}</span>
                                  }
                                  <div>
                                    <i role='button' className={`bi m-2 ${el.isEdit ? 'bi-x-lg' : 'bi-pencil-square'}`}
                                      onClick={() => handleInLineEdit(el, key)} />

                                    <i role='button' className="bi bi-trash "
                                      onClick={() => handleDelete(key, index)}
                                      hidden={el.isEdit} />
                                  </div>

                                </Stack>

                                <i role='button' className="bi bi-eye"
                                  onClick={() => {
                                    setType(key)
                                    setViewItem(el)
                                    setModalShow(true)
                                  }}
                                />
                              </div>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                  )
                }}
              </Droppable>
            </div>
          })
          }
        </DragDropContext>
      </div>

      <ViewTask
        show={modalShow}
        type={type}
        item={viewItem!}
        onHide={() => setModalShow(false)}
        handleSave={handleEdit}
      />

    </Container>
  );
}

export default App;
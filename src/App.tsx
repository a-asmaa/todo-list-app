import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ColumnsTypes, Item } from './modules/columnTypes';
import "bootstrap-icons/font/bootstrap-icons.css";
import { columnsTypes } from './modules/Data';
import Header from './component/Header/header';
import DraggableItems from './component/draggableItems';


function App() {

  const [state, setState] = useState<ColumnsTypes>(columnsTypes)

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

  const handleTaskAdd = (task: string, setTask: any) => {

    const newItem: Item = { id: Math.random().toString().slice(5), name: task, description: "", isEdit: false }
    setState(prev => {
      prev = { ...prev }
      prev["todo"].items.splice(prev["todo"].items.length, 0, newItem)

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

      localStorage.setItem('tasks', JSON.stringify(prev));
      return prev
    })
  }

  const handleInLineEdit = (item: Item, key: string) => {
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
      <Header handleTaskAdd={handleTaskAdd} />

      <div className="col-list">
        <DragDropContext onDragEnd={(e) => handleDragEnd(e)} >

          {Object.keys(state).map(key => {
            return <div key={key} className={"column"}>
              <h4>{state[key].title}</h4>
              <Droppable droppableId={key} >
                {(provided, snapshot) => {
                  return (<div ref={provided.innerRef} {...provided.droppableProps} className={"col-droppable"}>

                    {state[key].items.map((el: Item, index: any) => {
                      return <DraggableItems item={el} index={index} key={el.id} keyValue={key}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleInLineEdit={handleInLineEdit} />
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
    </Container>
  );
}

export default App;
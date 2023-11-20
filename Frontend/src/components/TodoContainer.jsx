import React, { useState } from 'react'
import TodoItem from './TodoItem'
import style from "./TodoContainer.module.css"
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"

function TodoContainer({list,editTodo,deleteTodo,rearrangeList,toggleComplete}) {

  const todolist=list

  function handleOnDragEnd(result) {
    
    if (!result.destination) return;

    const items = Array.from(todolist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log(items)
    rearrangeList(items)
  }


  return (   
    <DragDropContext onDragEnd={(e)=>{
      document.getElementById(""+e.draggableId).classList.remove(style.dragging)
      handleOnDragEnd(e)
    }}
      onDragStart={(e)=>{
          document.getElementById(""+e.draggableId).classList.add(style.dragging)
      }}
    >
      <Droppable droppableId='list'>
        {
          (provided)=>(
            <div className={style.container}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                todolist.map((i,index)=>(
                    <Draggable key={i._id} draggableId={""+i._id} index={index}
                    
                    > 
                      {
                        (provided)=>(
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                            className={style.box}
                            id={`${i._id}`}
                          >
                            <TodoItem
                                key={i._id}
                                data={i}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                toggleComplete={toggleComplete}
                            />
                          </div>
                        )
                      }
                    </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default TodoContainer
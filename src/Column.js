import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Task from './Task.js';
import { Draggable, Droppable } from 'react-beautiful-dnd';
Column.propTypes = {
    
};

function Column(props) {
    const {column, tasks, index} = props;
    const [isDraggingOver, setDraggingOver] = useState(false);
    const Container = styled.div`
        margin: 8px;
        border: 1px solid lightgrey;
        border-radius: 2px;
        width: 33%;
        height: fit-content;
        display: flex;
        flex-direction: column;
    `;
    const Title = styled.h3`
        padding: 8px;
    `;
    const TaskList = styled.div`
        padding: 8px;        
    `;
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided)=>(
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{column.title}</Title>
                    <Droppable droppableId={column.id} type="task">
                        {(provided, snapshot)=>{
                            return (
                                <TaskList 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {tasks.map((task, index)=> <Task key={task.id} task={task} index={index}/>)}
                                {provided.placeholder}
                            </TaskList>
                            )
                        }}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
}

export default Column;
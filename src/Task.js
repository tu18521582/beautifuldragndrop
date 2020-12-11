import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

Task.propTypes = {
    
};


const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
background-color: white;
`; 
function Task(props) {
    const {task, index} = props;

    return (
        <Draggable draggableId={task.id} index={index} key={task.id}>
            {(provided, snapshot)=> {
                return (
                    (
                        <Container 
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                        >
                            {task.content}
                        </Container>
                    )
                )
            }}
        </Draggable>
    );
}

export default Task;
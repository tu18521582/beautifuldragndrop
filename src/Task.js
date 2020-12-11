import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

Task.propTypes = {
    
};


function Task(props) {
    const {task, index} = props;
    const [state,setState] = useState(false);
    const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${state ? 'lightgreen' : 'white'};
`; 

    return (
        <Draggable draggableId={task.id} index={index}>
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
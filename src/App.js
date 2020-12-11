import React, {useState} from 'react';
import '@atlaskit/css-reset';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './Column';
import initialData from './initialData';
import styled from 'styled-components';
const Container = styled.div`
    display: flex;
`;
function App() {


    const [state, setState] = useState(initialData);
    const column = state.columns;

    const onDragEnd = result => {
        console.log('drag end');
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            console.log('keo vao khoang trong');
            return;
        }

        //keo va tha cung 1 vi tri
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log('keo va tha cung 1 vi tri');
            return;
        }


        if (type === "column") {
            console.log('keo tha cot'); 
            const newColumnOrder = Array.from(state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            
            const newState = {
                ...state,
                columnOrder: newColumnOrder
            }

            setState(newState);
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        //keo tha cung cot
        if (start === finish) {
            console.log('keo tha cung cot');
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0 , draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            setState(prevState=>({
                ...prevState,
                columns: {
                    ...prevState.columns,
                    [newColumn.id]: newColumn,
                },
            }))
            return;
        }
        //keo tha khac cot

        console.log('keo tha khac cot');
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setState(newState);

    }
    return (
        <DragDropContext style={{height: '300px'}} onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided)=>(
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {state.columnOrder.map((columnID, index)=>{
                            const column = state.columns[columnID];
                            const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
                            return <Column key={column.id} column={column} tasks={tasks} index={index}/>;
                        })}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>  
    );
}

export default App;



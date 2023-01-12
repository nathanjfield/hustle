import React from "react";
import axios from 'axios';
import {
    Checkbox
    } from '@mantine/core';

const TaskComplete = ({ item, setTasks }: any ) => {

    //updates the task on the backend and updates the task table
    const HandleCompleteTask = async (item:any) => {
        const response = await axios.post(`http://localhost:8000/api/tasks/complete`, {
            id: item._id,
            status: !item.taskcomplete
        }, {});
        const updatedTasks = response.data;
        setTasks(updatedTasks);
    }

    return (
        <>
            <Checkbox
                checked={item.taskcomplete}
                onChange={() => HandleCompleteTask(item)}
                transitionDuration={0}
            />
        </>
    )
    
}

export default TaskComplete
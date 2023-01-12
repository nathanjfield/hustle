import React from "react";
import axios from 'axios';
import {
    ActionIcon
    } from '@mantine/core';
import { IconTrash } from '@tabler/icons';

const TaskDelete = ({ item, setTasks }: any ) => {

    //sends the delete request to the server and updates the task table
    const HandleDelete = async (id:any) => {
        const response = await axios.delete(`http://localhost:8000/api/tasks/delete/${id}`, {});
        const updatedTasks = response.data;
        setTasks(updatedTasks);
    }

    return (
        <>
            <ActionIcon color="red" onClick={() => HandleDelete(item._id)}>
                <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
        </>
    )
    
}

export default TaskDelete

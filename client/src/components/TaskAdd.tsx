import React, { useState } from "react";
import axios from 'axios';
import { Title, TextInput, Group, Button, Grid, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/en-gb';

const TaskAdd = ({ item, setTasks }: any ) => {

    //initial setup of controlled task form variables
    const [taskname, setTaskName] = useState('')
    const [taskdate, setTaskDate] = useState<any | null>();

    //function for adding task to the database, fetching current list, and resetting the form
    const addTask = async () => {
        const response = await axios.post(`http://localhost:8000/api/tasks/add`, {
        taskname: taskname,
        taskdate: Date.parse(taskdate),
        taskcomplete: false,
        });
        const updatedTasks = response.data;
        setTasks(updatedTasks);
        setTaskName('');
        setTaskDate(null);
    }

    const form = useForm({});

    return (
        <>
            <Grid.Col xs={4}>

            <Space h="xs" />
                <Title order={5}>Add a Task</Title>
            <Space h="md" />

            <form onSubmit={form.onSubmit((values) => addTask())}>
                <TextInput
                placeholder="Task Name"
                value={taskname} 
                onChange={(event) => setTaskName(event.currentTarget.value)}
                required
                />

                <Space h="md" />

                <DatePicker 
                placeholder="Pick date"
                value={taskdate} 
                onChange={setTaskDate}
                />

                <Group position="right" mt="md">
                <Button type="submit">+ Add</Button>
                </Group>
            </form>

            </Grid.Col>
        </>
    )
    
}

export default TaskAdd

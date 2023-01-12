import React, { useState } from "react";
import axios from 'axios';
import {
    Group,
    ActionIcon,
    Modal,
    Button,
    TextInput,
    Space
    } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconPencil } from '@tabler/icons';

    const TaskEdit = ({ item, setTasks }: any ) => {
        
        //setup of initial states for the modal and form fields
        const [opened, setOpened] = useState(false);
        const [editid, setEditId] = useState();
        const [edittaskname, setEditTaskName] = useState('')
        const [edittaskdate, setEditTaskDate] = useState<any | null>(null);

        //function to send edited task and updated task table
        const HandleEditTask = async () => {
            const response = await axios.post(`http://localhost:8000/api/tasks/edit`, {
                id: editid,
                taskname: edittaskname,
                taskdate: Date.parse(edittaskdate),
            }, {});
            const updatedTasks = response.data;
            setTasks(updatedTasks);
            setOpened(false);
        }

        //handles opening of the modal and population of the form with current item
        const HandleOpen = (item:any) => {
            setEditId(item._id);
            setEditTaskName(item.taskname);
            if (item.taskdate != null) {
                const editdate = new Date(item.taskdate);
                setEditTaskDate(editdate);
            }
            setOpened(true);
        }
        

        return (
            <>
                <ActionIcon color="yellow" onClick={() => HandleOpen(item)}>
                    <IconPencil size={16} stroke={1.5} />
                </ActionIcon>

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Edit Task"
                    centered
                >
                    <form onSubmit={HandleEditTask}>
                        <TextInput
                            placeholder="Task Name"
                            value={edittaskname} 
                            onChange={(event) => setEditTaskName(event.currentTarget.value)}
                            required
                        />
                        <Space h="md" />
                        <DatePicker 
                            placeholder="Pick date"
                            value={edittaskdate}
                            onChange={setEditTaskDate}
                        />

                        <Group position="right" mt="md">
                            <Button onClick={() => HandleEditTask()}>Save</Button>
                        </Group>
                    </form>
                </Modal>
            </>
        );
    }

export default TaskEdit;
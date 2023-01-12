import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MantineProvider, Title, Container, Center, Grid, Space } from '@mantine/core';

import TaskAdd from "../components/TaskAdd";
import TaskTable from "../components/TaskTable";

const Tasks = () => {

    //setup of tasks array
    const [tasks, setTasks] = useState([]);

    //initial fetch of data on page load only
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:8000/api/tasks`)
            const body = await result.data;
            setTasks(body);
        }
        fetchData();
    }, []);
    
    return (
    <>
    <MantineProvider theme={{ colorScheme:'dark' }} withGlobalStyles withNormalizeCSS>
        <Container>
            <Space h="xl" />
            <Center>
                <Title>Welcome to Hustle </Title>
            </Center>
        </Container>

        <Space h="xl" />

        <Container my="md">
            <Grid gutterXs="xl">
                <TaskAdd setTasks={setTasks} />
                <Grid.Col xs={8}>
                    <TaskTable tasks={tasks} setTasks={setTasks} />
                </Grid.Col>
            </Grid>
        </Container>
    </MantineProvider>
    </>
  );
}

export default Tasks;

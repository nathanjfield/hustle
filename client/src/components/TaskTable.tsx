import React from "react";
import {
    Table,
    Group,
    Text,
    createStyles,
    } from '@mantine/core';
import { format } from 'date-fns'
import TaskEdit from './TaskEdit';
import TaskDelete from "./TaskDelete";
import TaskComplete from "./TaskComplete";

//style class for completed task(s)
const useStyles = createStyles((theme) => ({
    rowSelected: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
          : theme.colors[theme.primaryColor][0],
    },
}));

const TaskTable = ({ tasks, setTasks }: any ) => {
    
    const { classes, cx } = useStyles();
    
    //definition of rows in the table
    const rows = tasks.map((item:any) => {
        return (
            <tr key={item._id} className={cx({ [classes.rowSelected]: item.taskcomplete })}>
            <td>
                <TaskComplete item={item} setTasks={setTasks} />
            </td>
            <td>
                <Group spacing="sm">
                <Text size="sm" weight={500}>
                    {item.taskname}
                </Text>
                </Group>
            </td>
            <td>
                <Text size="sm" color="dimmed">
                    { item.taskdate != null ? format(item.taskdate, 'dd/MM/yy') : ""}
                </Text>
            </td>
            <td className="hidden-icons">
                <Group spacing={0} position="right">
                    <TaskEdit item={item} setTasks={setTasks} />
                    <TaskDelete item={item} setTasks={setTasks} />
                </Group>
            </td>
            </tr>
        );
        });
    

    return (
        <>
            <Table fontSize="md" highlightOnHover verticalSpacing="sm">
                <thead>
                <tr>
                    <th />
                    <th>Task</th>
                    <th>Due Date</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </>
    );
}

export default TaskTable;
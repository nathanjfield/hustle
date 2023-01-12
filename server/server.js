//initial setup of server
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(express.json());

//links to database connection file
import { db, connectToDb, ObjectId } from './db.js'

//sort for all fetches of the tasks
var sort = {taskcomplete: 1, taskdate: 1, _id: 1}

//initial get request on page load
app.get('/api/tasks', async (req, res) => {
  const tasks = await db.collection('tasks').find().sort(sort).toArray();
  res.status(200).json(tasks);
});

//adds new tasks to the database and returns the current list
app.post('/api/tasks/add', async (req, res) => {
  await db.collection('tasks').insertOne(req.body);
  const tasks = await db.collection('tasks').find().sort(sort).toArray();
  res.status(200).json(tasks);
});

//deletes a task from the database and returns the current list
app.delete('/api/tasks/delete/:id', async (req, res) => {
  const { id } = req.params;
  await db.collection('tasks').deleteOne( { _id : new ObjectId(id) } );
  const tasks = await db.collection('tasks').find().sort(sort).toArray();
  res.status(200).json(tasks);
});

//updates an individual task in the database and returns the current list
app.post('/api/tasks/edit', async (req, res) => {
  const taskEdit = req.body;
      //filter
      const filter = { _id : new ObjectId(taskEdit.id) };

      //update array
      const updateTask = {
          $set: {
              taskname: taskEdit.taskname,
              taskdate: taskEdit.taskdate,
          },
      };
  
  await db.collection('tasks').updateOne(filter, updateTask);
  const tasks = await db.collection('tasks').find().sort(sort).toArray();
  res.status(200).json(tasks);

});

//updates a task as complete or incomplete and sends back the current list
app.post('/api/tasks/complete', async (req, res) => {
  const taskComplete = req.body;
      //filter
      const filter = { _id : new ObjectId(taskComplete.id) };

      //update array
      const updateTask = {
          $set: {
              taskcomplete: taskComplete.status,
          },
      };
  
  await db.collection('tasks').updateOne(filter, updateTask);
  const tasks = await db.collection('tasks').find().sort(sort).toArray();
  res.status(200).json(tasks);

});

//Port variable
const PORT = process.env.PORT || 8000;

//connects to the database and runs the server
connectToDb(() => {
  console.log('Connected to database');
  app.listen(PORT, () => {
      console.log(`Server is running on port ` + PORT);
    }); 
})
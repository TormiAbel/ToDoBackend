const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
app.use(express.json());

///tasks CRUD
//Get all tasks
app.get('/tasks', (req, res) => {
    let data = fs.readFileSync('runtime/tasks.json');
    let tasks = JSON.parse(data);
    res.send(tasks);
})

//Get by id
app.get('/tasks/:id', (req, res) => {
    let data = fs.readFileSync('runtime/tasks.json');
    let tasks = JSON.parse(data);
    res.send(tasks);
})

//Create
app.post("/tasks/", (req, res) => {
    const tasks = {id: Math.ceil(Math.random()*100000), ...req.body}
    //tasks.push(task)
    res.send(tasks);
})

//DELETE
app.delete("/tasks/:id", (req, res) => {
    let taskId = tasks.map(t => t.id).indexOf(parseInt(req.params.id));
    tasks.splice(taskId, 1);
    res.status(202).send();
})

//UPDATE
app.put("/tasks/:id", (req, res) => {
    let tasks = tasks.find(t => t.id == req.params.id);
    let taskid = tasks.map(t => t.id).indexOf(parseInt(req.params.id));
    let newTask = req.body;
  
    Object.keys(newTask).forEach(key => {
        tasks[key] = newTask[key];
    })
  
    tasks[taskid] = tasks;
  
    res.status(201).send({newTask: {...tasks}});
  
})

//users CRUD
//Get all
app.get('/users', (req, res) => {
    let data = fs.readFileSync('runtime/users.json');
    let users = JSON.parse(data);
    res.send(users);
  })
  
  //Get by id
  app.get('/users/:id', (req, res) => {
    let data = fs.readFileSync('runtime/users.json');
    let userId = users.find(user => user.id == req.params.id)
    let users = JSON.parse(data);
    res.send(users[userId]);
  })
  
  //Create
  app.post("/userscreate", (req, res) => {
      const users = {id: Math.ceil(Math.random()*100000), ...req.body}
      //users.push(user)
      res.send(users);
  })
  
  //DELETE
  app.delete("/users/:id", (req, res) => {
      let userId = users.map(t => t.id).indexOf(parseInt(req.params.id));
      users.splice(userId, 1);
      res.status(202).send();
  })
  
  //UPDATE
  app.put("/users/:id", (req, res) => {
      let users = users.find(t => t.id == req.params.id);
      let userid = users.map(t => t.id).indexOf(parseInt(req.params.id));
      let newUser = req.body;
    
      Object.keys(newUser).forEach(key => {
          users[key] = newUser[key];
      })
    
      users[userid] = users;
    
      res.status(201).send({newUser: {...users}});
    
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
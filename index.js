const express = require('express')
const app = express()
const fs = require('fs')
const crypto = require('crypto');
const port = 3000
app.use(express.json());

const sessions = [];

app.use((req, res, next) =>{
    if(req.url === "/login" ||  req.url === "/register"){
        next()
    } else {
        if(req.headers.authorization) {
            let session = sessions.find(s => s.token === req.headers.authorization)
            if(!session){
                res.status(401).send("Unauthorized")
                return;
            }

            req.userSession = session;
            next()
        } else {
            res.status(401).json({message:"Unauthorized"})
        }
    }
})

app.get('/login', (req, res) => {
    crypto.randomBytes(64, function(err, buffer) {
        var token = buffer.toString('hex');

        let session = {
            token:token,
            user: users[0],
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            createdAt: new Date().toString()
        }
        sessions.push(session);
        res.send(session)
    });
})

//initialise user data
let userData = fs.readFileSync('runtime/users.json');
let users = JSON.parse(userData);

//initialise task data
let taskData = fs.readFileSync('runtime/tasks.json');
let tasks = JSON.parse(taskData);

///tasks CRUD
//Get all tasks
app.get('/tasks', (req, res) => {
    let user = req.userSession.user;
    res.send(tasks.filter(task => task.userId === user.id));
})

//Get by id
app.get('/tasks/:id', (req, res) => {
    let taskId = tasks.tasks.map(t => t.id).indexOf(parseInt(req.params.id))
    res.send(tasks.tasks[taskId]);
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
    let task = tasks.tasks.find(t => t.id == req.params.id);
    let taskid = tasks.tasks.map(t => t.id).indexOf(parseInt(req.params.id));
    let newTask = req.body;
  
    Object.keys(newTask).forEach(key => {
        task[key] = newTask[key];
    })
  
    tasks[taskid] = task;
  
    res.status(201).send({newTask: {...task}});

})

//users CRUD
//Get all
app.get('/users', (req, res) => {
    res.send(users);
  })
  
  //Get by id
  app.get('/users/:id', (req, res) => {
    let userId = users.users.map(t => t.id).indexOf(parseInt(req.params.id))
    res.send(users.users[userId]);
  })
  
  //Create
  app.post("/users", (req, res) => {
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
      let user = users.users.find(t => t.id == req.params.id);
      let userId = users.users.map(t => t.id).indexOf(parseInt(req.params.id));
      let newUser = req.body;
    
      Object.keys(newUser).forEach(key => {
          user[key] = newUser[key];
      })
    
      users.users[userId] = user;
    
      res.status(201).send({newUser: {...user}});
    
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
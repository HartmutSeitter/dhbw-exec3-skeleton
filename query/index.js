// change history
// hs002 implement the event bus communication
//   when a new post is generated the post info will be sent via http req. to the eventbus service
//   listening on port 4005
// hs003 implement type ComnmnentUpdated
// hs006 restructuring and get the events from eventbus when the query serivce is started

const express = require('express');
const app = express();

const cors = require('cors'); 
app.use(cors());
// required to handle the request body
app.use(express.json());

const axios = require('axios');

const posts = {};

// hs006 restructure 
const handleEvent = (type, data) => {
    if (type === "PostCreated") {
      const { id, title } = data;
  
      posts[id] = { id, title, comments: [] };
    }
  
    if (type === "CommentCreated") {
      const { id, content, postId, status } = data;
  
      const post = posts[postId];
      post.comments.push({ id, content, status });
    }
    // hs003 we have a new event type to be handled
    if (type === ".......d") {
      const { id, content, postId, status } = data;
  
      const post = posts[postId];
      const comment = post.comments.find((comment) => {
        return comment.id === id;
      });
  
      comment.status = status;
      comment.content = content;
    }
};


app.get('/posts',(req,res)=> {
    console.log(posts);
    res.send(posts);
});

app.post('/events', (req,res)=> {
    const {type, data} = req.body;
    // hs006 restructure
    handleEvent(type, data);
    console.log(posts);
    res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  // 003hs add here on whicht event type the moderation event should do something
  if (type === '.....') {
    // 003hs add here which content should be apporved and rejected
    const status = data.content.includes('........') ? 'rejected' : 'approved';
    console.log("CommentCreated received, status set to = ", status);
    console.log(data);
    await axios.post('http://localhost:4005/events', {
      // 003hs now add here what should the neue event type be 
      type: '..............',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }
  // 003hs put here some useful comments to the console for monitoring and debugging purpose
  console.log(".......................", data);
  
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});

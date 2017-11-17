var objectID = require('mongodb').ObjectID;
module.exports = function(app,db){
  //Read Router to read all blogs
  app.get('/blog', (req,res)=>{
    db.collection('blog').find().toArray((err, item)=>{
      if(err){res.send({'error': 'An error has occured'});
    }else {
      res.send(item);
    }
  });
  });
  //Read Router to read the single blog
  app.get('/blog/:id', (req,res)=>{
    const blogid= req.params.id;
    const blogdetails = {'_id': new objectID(blogid)};
    db.collection('blog').findOne(blogdetails, (err, item)=>{
      if(err){res.send({'error': 'An error has occured'});
    }else {
      res.send(item);
    }
  });
  });
  // to create th new blog , either send back an error or send bak the newly created blog object.
 app.post('/blog', (req, res)=>{
   const blog = {author: req.body.author, title: req.body.title, date: req.body.date, content: req.body.content, comment: req.body.comment};
   db.collection('blog').insert(blog, (err, result)=>{
     if(err){
       res.send({'error': 'An error has occured'});
     }
     else {
       res.send(result.ops[0]);
     }
   });
 });
 //to update blog
 app.put('/blog/:id', (req, res)=>{
   const blogid= req.params.id;
   const blogdetails = {'_id': new objectID(blogid)};
     const blog = {author: req.body.author, title: req.body.title, date: req.body.date, content: req.body.content , comment: req.body.comment};
     db.collection('blog').update(blogdetails, blog, (err, result)=>{
       if (err) {
         res.send({'error': 'An error has occured'});
       } else {
         res.send(blog);
       }
     });
 });
 //to delete blog
 app.delete('/blog/:id', (req,res)=> {
   const blogid = req.params.id;
   const blogdetails = {'_id': new objectID(blogid)};
   db.collection('blog').remove(blogdetails, (err, item)=>{
     if (err) {
       res.send({'error': 'An error has occured'});
     } else {
       res.send('Note '+blogid+' deleted')
     }
   });
 });
/****************************************** Comment*******************/
//Read Router to read the single blog
app.get('/reader/:id', (req,res)=>{
  const blogid= req.params.id;
  const blogdetails = {'_id': new objectID(blogid)};
  db.collection('blog').findOne(blogdetails, (err, item)=>{
    if(err){res.send({'error': 'An error has occured'});
  }else {
    res.send(item);
  }
});
});
//  insert new comment
app.post('/reader/:id', (req, res)=>{
 const blogid= req.params.id;
 const blogdetails = {'_id': new objectID(blogid)};
 const comment = {author: req.body.author, comment: req.body.comment, blog: blogid};
 db.collection('comment').insert(comment, (err, result)=>{
   if(err){
     res.send({'error': 'An error has occured'});
   }
   else {
     res.send(result.ops[0]);
   }
 });
});

};

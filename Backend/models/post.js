const mongoos=require('mongoose');

const postSchema=mongoos.Schema({
  title:{type:String, required:true},
  content:{type:String, required:true}
});

module.export= mongoos.model('Post',postSchema);

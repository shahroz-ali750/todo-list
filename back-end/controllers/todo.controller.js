 const getTodo = function(req,res){
    res.status(200).json('Get todo is called')
 }
 const postTodo = function(req,res){
    res.status(200).json('post todo is called')
 }
 const patchTodo = function(req,res){
    res.status(200).json('patch todo is called')
 }
 const deleteTodo = function(req,res){
    res.status(200).json('delete todo is called')
 }



 module.exports = {getTodo,postTodo,patchTodo,deleteTodo}
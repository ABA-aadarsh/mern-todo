const {Todo}=require("../model/todo")
exports.createTodo=async (req,res)=>{
    try{
        const {title}=req.body
        const todo=new Todo({
            title:title,
            completeStatus:false
        })
        const data=await todo.save()
        res.status(201).json(data)
    }catch(error){
        res.status(400).json(error)
    }
}
exports.removeTodo=async (req,res)=>{
    try{
        const {id}=req.params
        const data=await Todo.findByIdAndDelete(id)
        res.status(200).json(data)
    }catch(error){
        res.status(409).json(error)
    }
}
exports.updateTodo=async (req,res)=>{
    try{
        const {id}=req.params
        const toUpdateData=req.body
        const data=await Todo.findByIdAndUpdate(id,
            toUpdateData  
        )
        res.status(202).json(data)
    }catch(error){
        res.status(403).json(error)
    }
}
exports.readTodos=async (req,res)=>{
    try{
        const todos=await Todo.find()
        res.status(203).json({
            data:todos
        })
    }catch(error){
        res.status(405).json(error)
    }
}
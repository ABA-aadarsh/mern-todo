const express=require("express")
const route=express.Router()
const {createTodo,readTodos,removeTodo,updateTodo}=require("../controller/todo")
route
.get("/",readTodos)
.post("/",createTodo)
.delete("/:id",removeTodo)
.patch("/:id",updateTodo)

exports.route=route
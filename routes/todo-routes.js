const express = require("express")
const { getAllTodo, createTodo, toggleTodo, getDoneTodo, getActiveTodo, editTodo, deleteTodo } = require("../controllers/todo-controller")
const route = express.Router()

route.get("/",getAllTodo)
route.post("/",createTodo)
route.patch("/:id/toggle",toggleTodo)
route.patch("/:id",editTodo)
route.delete("/:id",deleteTodo)
route.get("/done",getDoneTodo)
route.get("/active",getActiveTodo)

module.exports = route
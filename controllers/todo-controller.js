const { Todo } = require("../models")

module.exports = {
    getAllTodo: async (req, res) => {
        try {
            const user = req.user
            const data = await Todo.findAll({ where: { user_id: user.id } })
            if (data.length === 0)
                throw new Error("Tidak ada data yang ditampilkan")
            res.json({
                message: "Berhasil menampilkan Todo",
                todos: data
            })
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
    getDoneTodo: async (req, res) => {
        try {
            const user = req.user
            const data = await Todo.findAll({ where: { user_id: user.id, status: true } })
            if (data.length === 0)
                throw new Error("Tidak ada data yang ditampilkan")
            res.json({
                message: "Berhasil menampilkan Todo",
                todos: data
            })
        } catch (err) {
            console.log(err.message)
            res.status(400).json({ message: "Masalah Server" })

        }
    },
    getActiveTodo: async (req, res) => {
        try {
            const user = req.user
            const data = await Todo.findAll({ where: { user_id: user.id, status: false } })
            if (data.length === 0)
                throw new Error("Tidak ada data yang ditampilkan")
            res.json({
                message: "Berhasil menampilkan Todo",
                todos: data
            })
        } catch (err) {
            console.log(err.message)
            res.status(400).json({ message: "Masalah Server" })

        }
    },
    createTodo: async (req, res) => {
        try {
            const user = req.user
            const data = req.body
            const task = await Todo.create({ task: data.task, user_id: user.id })
            if (!task) throw new Error("Gagal Melakukan Insert Data")
            res.json({
                message: "Berhasil Membuat Todos",
                userId: task.user_id,
                task: task.task
            })
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
    toggleTodo: async (req, res) => {
        try {
            const id = req.params.id
            const todo = await Todo.findByPk(id)
            let statusTodo = (todo.status === false) ? true : false
            await Todo.update({ status: statusTodo }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({
                message: "Berhasil merubah status Todo",
            })
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
    editTodo: async (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            await Todo.update({ task: data.task }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({
                message: "Berhasil edit Todo",
            })
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
    deleteTodo: async (req, res) => {
try {
            const id = req.params.id
            await Todo.destroy({ where: { id:id } })
            res.status(200).json({
                message: "Berhasil Hapus Todo",
            })
        } catch (err) {
            res.status(400).json(err.message)
        }
    },
}
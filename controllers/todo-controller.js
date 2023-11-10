const { Todo } = require("../models")

module.exports = {
    getAllTodo: async (req, res) => {
        try {
            const user = req.user
            const data = await Todo.findAll({ where: { user_id: user.id } })
            if (data.length === 0)
                return res.status(200).json({
                    message: "Tidak ada Todo"
                })
            res.status(200).json({
                message: "Berhasil menampilkan Todo",
                todos: data
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Terjadi Kesalahan Internal pada server"
            })
        }
    },
    getDoneTodo: async (req, res) => {
        try {
            const user = req.user
            const data = await Todo.findAll({
                where: {
                    user_id: user.id,
                    status: true
                }
            })
            if (data.length === 0)
                return res.status(200).json({
                    message: "Tidak ada Todo"
                })
            res.status(200).json({
                message: "Berhasil menampilkan Todo yang selesai",
                todos: data
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Terjadi Kesalahan Internal pada server"
            })
        }
    },
    getActiveTodo: async (req, res) => {
        try {
            const user = req.user
            const data = await Todo.findAll({ where: { user_id: user.id, status: false } })
            if (data.length === 0)
                return res.status(200).json({
                    message: "Tidak ada Todo yang aktif"
                })
            res.status(200).json({
                message: "Berhasil menampilkan Todo yang aktif",
                todos: data
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Terjadi Kesalahan Internal pada server"
            })
        }
    },
    createTodo: async (req, res) => {
        try {
            const user = req.user
            const data = req.body
            const task = await Todo.create({ task: data.task, user_id: user.id })
            if (!task) return res.status(500).json({
                message: "Todos tidak berhasil dibuat"
            })
            res.status(201).json({
                message: "Berhasil Membuat Todos",
                userId: task.user_id,
                task: task.task
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Terjadi Kesalahan Internal pada server"
            })
        }
    },
    toggleTodo: async (req, res) => {
        try {
            const id = req.params.id
            const todo = await Todo.findByPk(id)

            if (!todo) {
                return res.status(404).json({
                    message: "Todo tidak ditemukan"
                });
            }

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
            console.error(err);

            res.status(500).json({
                message: "Terjadi kesalahan internal pada server"
            });
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
            console.error(err);

            res.status(500).json({
                message: "Terjadi kesalahan internal pada server"
            });
        }
    },
    deleteTodo: async (req, res) => {
        try {
            const id = req.params.id
            await Todo.destroy({ where: { id: id } })
            res.status(200).json({
                message: "Berhasil Hapus Todo",
            })
        } catch (err) {
            console.error(err);

            res.status(500).json({
                message: "Terjadi kesalahan internal pada server"
            });
        }
    },
}
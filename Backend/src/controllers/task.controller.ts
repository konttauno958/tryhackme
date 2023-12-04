const Task = require("../model/task.model")

export const fetchAllTasks = async (req: any, res: any) => {
  const { perPage, page, searchKey, sortKey, sortDir } = req.query
  const user = req.user
  const sort = {}

  if (sortDir !== null) {
    const key = sortKey || "title"
    sort[key] = sortDir
  }

  try {
    const skip = (page - 1) * perPage

    const tasksQuery = Task.find({
      title: { $regex: new RegExp(searchKey, "i") },
      author: user._id,
    })

    if (sortDir) {
      tasksQuery.sort(sort)
    }

    const tasks = await tasksQuery.skip(skip).limit(perPage)

    const totalCount = await Task.countDocuments({
      title: { $regex: new RegExp(searchKey, "i") },
      author: user._id,
    })

    res.status(200).json({ tasks: tasks, totalCount: totalCount })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const createTask = async (req: any, res: any) => {
  const taskData = req.body
  const user = req.user
  const newTask = new Task({ ...taskData, author: user._id })

  newTask
    .save()
    .then((task) => {
      res.json(task)
    })
    .catch((error) => {
      console.error("Error saving task:", error)
    })
}

export const updateTask = async (req: any, res: any) => {
  const taskData = req.body
  const taskId = req.params.id

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
      new: true,
    })
    res.json(updatedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const deleteTask = async (req: any, res: any) => {
  const taskId = req.params.id
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId)

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

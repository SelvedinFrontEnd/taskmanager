import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

function TaskModal({ setIsOpen }) {
  const today = new Date().toISOString().split("T")[0]
  const [task, setTask] = useState({
    title:"",
    description:"",
    startDate:"",
    dueDate:"",
    priority:"",
    tags:[]
  })

  const [tasks, setTasks] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  const addTask = () => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks, task];
      console.log("New tasks inside updater:", newTasks); // ✅ This WILL log correctly
      return newTasks;
    });
  
    setTask({
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      priority: "",
      tags: [],
    });
  
    // ❌ TEMPORARILY DISABLE THIS
    // setIsOpen(false);
  };
  
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-white text-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 z-50">
        <button
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <RiCloseLine size={24} />
        </button>
        
        <div className="flex flex-col p-4">
          <input 
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          name="title"
          />
          <textarea
          type="text"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          name="description"
          />
          <input
          type="date"
          min={today}
          value={task.startDate}
          onChange={handleChange}
          name="startDate"
          />
          <input
          type="date"
          min={today}
          value={task.dueDate}
          onChange={handleChange}
          name="dueDate"
          />
        </div>
        

        <div className="flex justify-center space-x-4">
          <button
            onClick={addTask}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Add Task
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;

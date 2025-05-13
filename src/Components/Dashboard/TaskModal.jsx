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
  const [selectedOption, setSelectedOption] = useState('');

  const [tasks, setTasks] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate" && task.dueDate && task.dueDate < value) {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
        dueDate: "", 
      }));
      return; 
    }
  
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = () => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks, task];
      console.log("New tasks inside updater:", newTasks); 
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
  };
  
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleKeyDown = (e) => {
    if((e.key === "Enter" || e.key === ",") && task.tags.trim() !== ""){
      console.log(task)
    }
  }

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
          min={task.startDate || today}
          value={task.dueDate}
          onChange={handleChange}
          name="dueDate"
          />
          <select
          id="dropdown"
          name="priority"
          onChange={handleChange}
          value={task.priority}
          >
            <option value="">-- Select --</option>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="Very Urgent">Very Urgent</option>
          </select>
          <input 
          value={task.tags}
          type="text"
          onChange={handleChange}
          name="tags" 
          placeholder="Type and press Enter or comma"
          onKeyDown={handleKeyDown}
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

import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { updateDoc, arrayUnion } from "firebase/firestore";
import { useUser } from "../../Contexts/UserContext"
import { useTasks } from "../../Contexts/TasksContext";

function TaskModal({ setIsOpen }) {
  const today = new Date().toISOString().split("T")[0]
  const [task, setTask] = useState({
    title:"",
    description:"",
    startDate:"",
    dueDate:"",
    priority:"",
    tags:[],
    completed: false,
  })
  const [tagInput, setTagInput] = useState("")
  const { userDocRef } = useUser(); // 🔥 already available
  const { tasks , setTasks } = useTasks()

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

 const addTask = async () => {
  if (!userDocRef) return;

  try {
    await updateDoc(userDocRef, {
      tasks: arrayUnion(task)
    });

    setTasks((prevTasks) => [...prevTasks, task]);
  } catch (err) {
    console.error("Error adding task:", err);
  } finally {
    setTask({
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      priority: "",
      tags: [],
    });

    setTagInput(""); 
  }
};

  const handleKeyDown = (e) => {
    if((e.key === "Enter" || e.key === ",") && tagInput.trim() !== ""){
      e.preventDefault();

      const newTag = tagInput.trim()

      
      setTask((prevTask) => {
  if (prevTask.tags.includes(newTag)) {
    return prevTask; 
  } return {
    ...prevTask,
    tags: [...prevTask.tags, newTag],
  };
});

    setTagInput(""); 
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
        
        <div className="flex flex-col gap-4 p-4">
        <div className="text-center font-bold text-2xl">Create your new task</div>
  {/* Title */}
  <input 
    type="text"
    placeholder="Title"
    value={task.title}
    onChange={handleChange}
    name="title"
    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Description */}
  <textarea
    placeholder="Description"
    value={task.description}
    onChange={handleChange}
    name="description"
    rows={4}
    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  />

  {/* Start Date */}
  <input
    type="date"
    min={today}
    value={task.startDate}
    onChange={handleChange}
    name="startDate"
    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Due Date */}
  <input
    type="date"
    min={task.startDate || today}
    value={task.dueDate}
    onChange={handleChange}
    name="dueDate"
    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Priority Dropdown */}
  <select
    id="dropdown"
    name="priority"
    onChange={handleChange}
    value={task.priority}
    className="border cursor-pointer border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">-- Select Priority --</option>
    <option value="Normal">Normal</option>
    <option value="Urgent">Urgent</option>
    <option value="Very Urgent">Very Urgent</option>
  </select>

  {/* Tags */}
  <div className="flex flex-wrap gap-2">
    {task.tags.map((tag, index) => (
      <span
        key={index}
        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
      >
        {tag}
      </span>
    ))}
  </div>

  {/* Tag Input */}
  <input 
    value={tagInput}
    type="text"
    onChange={(e) => setTagInput(e.target.value)}
    placeholder="Type a tag and press Enter or comma"
    onKeyDown={handleKeyDown}
    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

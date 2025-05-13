import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { getDoc } from "firebase/firestore";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { userDocRef } = useUser();

  // optional: fetch tasks from Firestore when mounted
  useEffect(() => {
    const fetchTasks = async () => {
      if (userDocRef) {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTasks(data.tasks || []);
        }
      }
    };
    fetchTasks();
  }, [userDocRef]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
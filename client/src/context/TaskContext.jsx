import { createContext } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => (
	<TaskContext.Provider value={{ text: "hello world" }}>
		{children}
	</TaskContext.Provider>
);

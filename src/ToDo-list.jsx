// importing necessary React hooks
import React, { useState, useEffect } from 'react';

function ToDoList() {
    // tasks - array of task objects { text: string, completed: boolean }
    // the initial value is loaded from localStorage (if available)
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks"); // get stored data
        return savedTasks ? JSON.parse(savedTasks) : []; // show it if found, else empty array
    });

    // newTask (string) - holds the text currently typed by the user
    const [newTask, setNewTask] = useState("");

    // filter - controls which tasks are displayed (All, Done, not Done)
    const [filter, setFilter] = useState("all");

    // save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); // runs everytime "tasks" updates

    // handles text input updates
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // adds a new task to the list when the "Add" button is clicked
    function addTask() {
        // only add the task if it's not empty
        if (newTask.trim() !== "") {
            // add a new object with text + completion status to the array
            setTasks(t => [...t, { text: newTask, completed: false }]);
            // clearing the input field after adding
            setNewTask("");
        }
    }

    // deletes a task by filtering out its index
    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // toggles whether a task is marked as completed or not
    function toggleCompletedTask(index) {
        setTasks(tasks.map((task, i) =>
            i === index ? {...task, completed: !task.completed } : task
        ));
    }

    // filters tasks based on selected filter button (All, Done, not Done)
    const filteredTasks = tasks.filter(task => {
        if (filter === "done") return task.completed; // show only done
        if (filter === "notDone") return !task.completed; // show only not done
        return true; // (All) shows everything
    });

    return (
        <div className="todo-list">
            <h1>TO-DO LIST</h1>

            {/* input field and Add button */}
            <div className="user-input">
                <input
                    type="text"
                    placeholder="Enter a Task..."
                    value={newTask}
                    onChange={handleInputChange} // updates state on change
                />
                <button
                    className = "add-button"
                    onClick = {addTask}>
                    Add
                    {/* adds a task when clicked */}
                </button>
            </div>

            {/* filter buttons to show All / Not Done / Done */}
            <div className="filter">
                <button
                    className={filter === "all" ? "active" : ""}
                    onClick={() => setFilter("all")}>
                    All
                  </button>
                  <button
                    className={filter === "notDone" ? "active" : ""}
                    onClick={() => setFilter("notDone")}>
                    Not Done
                  </button>
                  <button
                    className={filter === "done" ? "active" : ""}
                    onClick={() => setFilter("done")}>
                    Done
                  </button>
            </div>

            {/* list of tasks */}
            <ol>
                {filteredTasks.map((task, index) => (
                    <li key={index}>
                        <label className="complete-btn">
                            <input
                                type="checkbox"
                                checked={task.completed}    // completion status
                                onChange={() => toggleCompletedTask(index)} // toggle done/undone
                            />
                            <span className="checkmark"></span>     {/* custom styled checkbox */}
                        </label>
                         {/* task text (crossed out if completed) */}
                        <span className = {`text ${task.completed ? 'completed' : ''}`}>
                            {task.text}
                        </span>

                         {/* delete button with trash image */}
                        <button
                            className="delete-btn" onClick={() => deleteTask(index)}>
                            <img src="trash.png" alt="Delete" width="20" /> 
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;

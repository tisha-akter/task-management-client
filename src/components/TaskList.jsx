import { useState, useEffect } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the server
        fetch('https://task-management-server-nine-khaki.vercel.app/task')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    // eslint-disable-next-line no-unused-vars
    const handleUpdateStatus = (taskId, status) => {
        // Send a PUT request to update task status
        fetch(`https://task-management-server-nine-khaki.vercel.app/task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Completed' }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Update tasks state if needed
                // For example, you can update the status of the task in the 'tasks' state array
                setTasks((prevTasks) =>
                    prevTasks.map((task) => (task._id == taskId ? { ...task, status: 'Completed' } : task))
                );
            })
            .catch((error) => {
                console.error('Error updating task status:', error);
            });
    };

    const handleDeleteTask = (taskId) => {
        // Send a DELETE request to delete the task
        fetch(`https://task-management-server-nine-khaki.vercel.app/task/${taskId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Update tasks state to remove the deleted task
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            })
            .catch((error) => {
                console.error('Error deleting task:', error);
            });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Todo':
                return 'text-yellow-500';
            case 'Completed':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className='container mx-auto my-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-indigo-100 shadow-md rounded-md p-5 hover:shadow-xl">
                        <h3 className="text-xl font-medium mb-2 text-center">{task.title}</h3>
                        <p className="text-gray-600">{task.detail}</p>
                        <p className={`font-semibold mt-2 ${getStatusColor(task.status)}`}> <span className='text-blue-600'>Status: </span>{task.status}</p>
                        {/* Display task status with color indicator */}
                        <div className="flex gap-4 mt-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition duration-300"
                                onClick={() => handleUpdateStatus(task._id, 'Completed')}
                            >
                                Mark as Done
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() => handleDeleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;


import { Link } from "react-router-dom";

const TaskButton = () => {
    return (
        <div className="container mx-auto">
            <div className="flex gap-2 items-center justify-center">
                <div className="md:w-4/12 my-8">
                    <h5 className="text-gray-500 text-sm">Create new task.......</h5>
                    <h3 className="border-y-4 border-indigo-100"></h3>
                </div>
                <Link to="/create-task" className="btn bg-indigo-700 text-white">
                    Create a task
                </Link>
            </div>
        </div>
    );
};

export default TaskButton;

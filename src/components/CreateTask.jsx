import { useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CreateTask = () => {
    const formRef = useRef(null);

    const handleAddTask = event => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const detail = form.detail.value;

        const newTask = {
            title,
            detail,
        }
        console.log(newTask);

        // send data to the server 
        fetch('http://localhost:5000/task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    formRef.current.reset();
                    Swal.fire({
                        title: 'Success!!',
                        text: 'Task added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })

    }


    return (
        <div className="container mx-auto px-5">

            <div className="flex gap-2 items-center justify-center">
                <div className="md:w-4/12 my-8">
                    <h5 className="text-gray-500 text-sm">See all the task......</h5>
                    <h3 className="border-y-4 border-indigo-100"></h3>
                </div>
                <Link to="/" className="btn bg-indigo-700 text-white">
                    See all the task
                </Link>
            </div>


            <div className=' text-center font-light text-gray-500 sm:text-lg dark:text-gray-400 py-5'>
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Create A <span className="text-indigo-700">Task!</span>
                </h1>
            </div>
            <div className=" mx-auto mb-10">
                <div className="card-body bg-indigo-100 rounded-xl md:mx-20 md:mb-20">
                    <form ref={formRef} onSubmit={handleAddTask}>
                        <div className="mb-6  px-5">
                            <label form="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Title</label>
                            <input type="text" name="title" placeholder="Task Title" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className="mb-6 px-5">
                            <label form="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                            <textarea type="text" name="detail" placeholder="Task Description" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="mb-6 px-5">
                            <input type="submit" value="Add A Task" className="btn btn-block bg-indigo-700 text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
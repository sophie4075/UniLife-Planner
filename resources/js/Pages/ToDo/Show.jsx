import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import {
    COURSE_STATUS_CLASS_MAP,
    COURSE_STATUS_TEXT_MAP, TODO_PRIORITY_CLASS_MAP, TODO_PRIORITY_TEXT_MAP,
    TODO_STATUS_CLASS_MAP,
    TODO_STATUS_TEXT_MAP
} from "@/constants.jsx";
import ToDoTable from "@/Pages/ToDo/ToDoTable.jsx";
import {PencilSquareIcon} from "@heroicons/react/16/solid/index.js";

export default function Show({auth, todo, queryParams}) {




    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{`To-Do "${todo.name}"`}
                    </h2>
                    <Link href={route('todo.edit', todo.id)}
                          className="bg-blue-500 py-1.5 px-3 ml-2 text-white rounded shadow transition-all hover:bg-blue-800 w-25 flex items-center">
                        Edit <PencilSquareIcon className="h-4 w-4 ml-2"/>
                    </Link>
                </div>
            }>
            <Head title={`Course "${todo.name}"`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-center">
                            <img src={todo.image_path} alt="Course Cover Image"
                                 className="h-64 w-full object-contain"/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-500">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">To-Do</label>
                                        <p className="mt-1">{todo.name}</p>
                                    </div>
                                    <div>
                                        <label className="font-bold text-lg">Priority</label>
                                        <p className="mt-1">
                                            <span
                                                className={"px-2 py-1 rounded text-white " + TODO_PRIORITY_CLASS_MAP[todo.priority]}>
                                                {TODO_PRIORITY_TEXT_MAP[todo.priority]}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1">{todo.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Status</label>
                                        <p className="mt-1">
                                            <span
                                                className={"px-2 py-1 rounded text-white " + TODO_STATUS_CLASS_MAP[todo.status]}>
                                                {TODO_STATUS_TEXT_MAP[todo.status]}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Description</label>
                                <p className="mt-1">{todo.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Authenticated>
    )
}

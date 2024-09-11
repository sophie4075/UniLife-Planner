import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import ToDoTable from "@/Pages/ToDo/ToDoTable.jsx";

export default function Index({auth, todos, queryParams = null, success}){




    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">To-Do's</h2>
                <Link href={route("todo.create")}
                      className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-6000">Add
                    new</Link>
            </div>}

        >
            <Head title="todos"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
                        {success}
                    </div>}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ToDoTable todos={todos} queryParams={queryParams}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

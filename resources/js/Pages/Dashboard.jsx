import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {TODO_STATUS_CLASS_MAP, TODO_STATUS_TEXT_MAP} from "@/constants";
import {Head, Link} from "@inertiajs/react";

export default function Dashboard({auth, allMyToDos, myPendingToDos , myProgressTodos , myCompletedTodos ,activeTodos }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-indigo-50 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-rose-300 text-2xl font-semibold">
                                Pending To-Do's
                            </h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myPendingToDos}</span>/
                                <span className="ml-2">{allMyToDos}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-indigo-50 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-cyan-800 text-2xl font-semibold">
                                To-Do's In Progress
                            </h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myProgressTodos}</span>/
                                <span className="ml-2">{allMyToDos}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-indigo-50 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-teal-500 text-2xl font-semibold">
                                Completed To-Do's
                            </h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myCompletedTodos}</span>/
                                <span className="ml-2">{allMyToDos}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-indigo-50 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-gray-600 text-xl font-semibold">
                                Your Upcoming To-Dos: Due Within the Next Two Weeks
                            </h3>

                            <table
                                className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-indigo-50 border-b-2 border-indigo-200">
                                <tr>
                                    <th className="px-3 py-3">To-Do</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Due Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                { activeTodos.data.length > 0 ? (activeTodos.data.map((todo) => (
                                    <tr key={todo.id} className="bg-indigo-50 border-b">
                                        <td className="px-3 py-2 hover:underline">
                                            <Link href={route("todo.show", todo.id)}>
                                                {todo.name}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className={"px-2 py-1 rounded text-nowrap text-white " + TODO_STATUS_CLASS_MAP[todo.status]}>
                                                {TODO_STATUS_TEXT_MAP[todo.status]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">{todo.due_date}</td>
                                    </tr>
                                ))) : (<tr>
                                    <td colSpan="3" className="px-3 py-2 text-center">
                                        No outstanding todos within two weeks 😊<br/>
                                        Check your To-Do's to see what's up afterwards!
                                    </td>
                                </tr>)}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


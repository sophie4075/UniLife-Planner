import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import {COURSE_STATUS_CLASS_MAP, COURSE_STATUS_TEXT_MAP} from "@/constants.jsx";
import ToDoTable from "@/Pages/ToDo/ToDoTable.jsx";
import {PencilSquareIcon} from "@heroicons/react/16/solid/index.js";

export default function Show({auth, kurs, todos, queryParams}) {


    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Course "${kurs.name}"`}
                    </h2>
                    <Link href={route('kurs.edit', kurs.id)}
                          className="bg-blue-500 py-1.5 px-3 ml-2 text-white rounded shadow transition-all hover:bg-blue-800 w-25 flex items-center">
                        Edit<PencilSquareIcon className="h-4 w-4 ml-2"/>
                    </Link>
                </div>
            }>
            <Head title={`Course "${kurs.name}"`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-center">
                            <img src={kurs.image_path} alt="Course Cover Image"
                                 className="h-64 w-full object-contain"/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-500">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Course ID</label>
                                        <p className="mt-1">{kurs.id}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Course Name</label>
                                        <p className="mt-1">{kurs.name}</p>
                                    </div>

                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Date of exam</label>
                                        <p className="mt-1">{kurs.exam_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Course Status</label>
                                        <p className="mt-1">
                                            <span
                                                className={"px-2 py-1 rounded text-white " + COURSE_STATUS_CLASS_MAP[kurs.status]}>
                                                {COURSE_STATUS_TEXT_MAP[kurs.status]}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Description</label>
                                <p className="mt-1">{kurs.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-500">
                            <ToDoTable todos={todos} queryParams={queryParams} hideCourseNameColumn={true}></ToDoTable>
                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    )
}

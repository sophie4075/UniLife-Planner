import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {useEffect} from "react";


export default function Create({auth, todo, kurs}){

    const {data, setData, post, errors, reset} = useForm({
        kurs_id: todo.course.id || "",
        name: todo.name || "",
        description: todo.description || "",
        due_date: todo.due_date|| "",
        status: todo.status || "",
        priority: todo.priority || "",
        image: "",
        _method: "PUT",
    })

    //console.log("Deine kurs id " + JSON.stringify(todo.course.id));
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("todo.update", todo.id));
    }


    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit To-Do "{todo.name}"</h2>
                </div>
            }>

            <Head title="Edit To-Do"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {todo.image_path && <div className="text-center">
                            <img src={todo.image_path} alt="To-Do Cover Image"
                                 className="h-64 w-full object-contain"/>
                        </div>}
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mt-4">
                                <InputLabel htmlFor="kurs_id" value="Belongs to Course"/>
                                <SelectInput id="kurs_id"
                                             name="kurs_id"
                                             value={data.kurs_id}
                                             className="mt-1 block w-full bg-gray-200"
                                             onChange={(e) => setData('kurs_id', e.target.value)}
                                >
                                    <option value="">Select Course</option>
                                    {kurs.data.map(kurs => (
                                        <option value={kurs.id} key={kurs.id}>{kurs.name}</option>
                                    ))}

                                </SelectInput>
                                <InputError message={errors.kurs_id} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="todo_name" value="To-Do"/>
                                <TextInput id="todo_name" type="text" name="name" value={data.name}
                                           className="mt-1 block w-full bg-gray-200"
                                           isFocused={true}
                                           onChange={(e) => setData('name', e.target.value)}/>
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="todo_description" value="Description"/>
                                <TextAreaInput id="todo_description" type="text" name="description"
                                               value={data.description}
                                               className="mt-1 block w-full bg-gray-200"
                                               onChange={(e) => setData('description', e.target.value)}/>
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="due_date" value="Due Date"/>
                                <TextInput id="due_date" type="date" name="due_date"
                                           value={data.due_date}
                                           className="mt-1 block w-full bg-gray-200"
                                           onChange={(e) => setData('due_date', e.target.value)}/>
                                <InputError message={errors.due_date} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="status" value="Status"/>
                                <SelectInput id="status"
                                             name="status"
                                             className="mt-1 block w-full bg-gray-200"
                                             onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Discarded</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="priority" value="Priority"/>
                                <SelectInput id="priority"
                                             name="priority"
                                             className="mt-1 block w-full bg-gray-200"
                                             onChange={(e) => setData('priority', e.target.value)}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel htmlFor="course_image_path" value="Course Image"/>
                                <TextInput id="course_image_path" type="file" name="image"
                                           className="mt-1 block w-full bg-gray-200"
                                           onChange={e => setData('image', e.target.files[0])}/>
                                <InputError message={errors.image} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-800"
                                    type="submit">Update
                                </button>
                                <Link
                                    className="bg-red-600 py-1.5 px-3 ml-2 text-white rounded shadow transition-all hover:bg-red-800"
                                    href={route('todo.index')}>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Authenticated>
    )
}

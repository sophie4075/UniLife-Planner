import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Create({auth}){
    const {data, setData, post, errors, reset} = useForm({
        name: '',
        description: '',
        exam_date: '',
        status: '',
        image: '',
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("kurs.store"));

    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create a new Course</h2>
                </div>
            }>

            <Head title=" New Course"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                            <div className="mt-4">
                                <InputLabel htmlFor="course_name" value="Course Name"/>
                                <TextInput id="course_name" type="text" name="name" value={data.name}
                                           className="mt-1 block w-full bg-gray-200"
                                           isFocused={true}
                                           onChange={(e) => setData('name', e.target.value)}/>
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="course_description" value="Course Description"/>
                                <TextAreaInput id="course_description" type="text" name="description"
                                               value={data.description}
                                               className="mt-1 block w-full bg-gray-200"
                                               onChange={(e) => setData('description', e.target.value)}/>
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="exam_date" value="Date of Exam"/>
                                <TextInput id="exam_date" type="date" name="name" value={data.exam_date}
                                           className="mt-1 block w-full bg-gray-200"
                                           onChange={(e) => setData('exam_date', e.target.value)}/>
                                <InputError message={errors.exam_date} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="course_status" value="Status"/>
                                <SelectInput id="course_status"
                                             name="status"
                                             className="mt-1 block w-full bg-gray-200"
                                             onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="attending">Attending</option>
                                    <option value="completed">Completed</option>
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
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-800">Create</button>
                                <Link
                                    className="bg-red-600 py-1.5 px-3 ml-2 text-white rounded shadow transition-all hover:bg-red-800"
                                    href={route('kurs.index')}>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Authenticated>
    )
}

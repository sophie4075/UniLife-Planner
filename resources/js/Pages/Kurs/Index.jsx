import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {COURSE_STATUS_CLASS_MAP, COURSE_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import TableHeading from "@/Components/TableHeading.jsx";


export default function Index({auth, kurse, queryParams = null, success}){

    queryParams = queryParams || {};

    const formatDateForDisplay = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("kurs.index"), queryParams);

    };

    const onKeyPress = (name, e ) =>{
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route("kurs.index"), queryParams);
    }

    const deleteCourse = (kurs) => {
        if(!window.confirm("Do you really want to delete this course? All to-do's within this course will be lost forever.")){
            return;
        }
        console.log("course id " + kurs.id);
        router.delete(route('kurs.destroy', kurs));
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Courses</h2>
                    <Link href={route("kurs.create")} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-6000">Add new</Link>
                </div>
            }
        >
            <Head title="Courses"/>


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
                        {success}
                    </div>}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead
                                className="text xs text-gray-700 uppercase bg-indigo-50 ">
                            <tr className="text-nowrap">

                                <TableHeading name="id" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                    Id
                                </TableHeading>

                                <TableHeading name="name" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                    Name
                                </TableHeading>

                                <th className="px-3 py-3">Description</th>

                                <TableHeading name="exam_date" sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                                    Date of exam
                                </TableHeading>
                                <th className="px-3 py-3">Status</th>
                                <th className="px-3 py-3 text-right">Options</th>
                            </tr>
                            </thead>
                            <thead
                                className="text xs text-gray-700 uppercase bg-indigo-50 border-b-2 border-indigo-200">
                            <tr className="text-nowrap">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3">
                                    <TextInput className="w-full text-xs" defaultValue={queryParams.name} placeholder="Course Name" onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)} />
                                </th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3">
                                    <SelectInput className="w-full text-xs"
                                                 defaultValue={queryParams.status}
                                                 onChange={e => searchFieldChanged('status', e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="attending">Attending</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-3"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {kurse.data.map(kurs => (
                                <tr className="bg-indigo-50 border-b"
                                    key={kurs.id}>
                                    <td className="px-3 py-2">{kurs.id}</td>
                                    <td className="px-3 py-2 hover:underline font-bold">
                                        <Link href={route('kurs.show', kurs.id)}>
                                            {kurs.name}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2">{kurs.description}</td>
                                    <td className="px-3 py-2">{formatDateForDisplay(kurs.exam_date)}</td>
                                    <td className="px-3 py-2">
                                        <span
                                            className={"px-2 py-1 rounded text-white text-nowrap " + COURSE_STATUS_CLASS_MAP[kurs.status]}>
                                        {COURSE_STATUS_TEXT_MAP[kurs.status]}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 bg">
                                        <div className="flex items-center justify-between gap-1 " >
                                        <Link href={route('kurs.edit', kurs.id)}
                                              className="text-blue-400  hover:underline mx-1">
                                            <PencilSquareIcon className="h-6 w-6"/>
                                        </Link>
                                        <button onClick={e => deleteCourse(kurs)} className="text-red-400 bg-transparent hover:underline mx-1">
                                            <TrashIcon className="h-6 w-6"/>
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        <Pagination links={kurse.meta.links}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {
    TODO_PRIORITY_CLASS_MAP,
    TODO_PRIORITY_TEXT_MAP,
    TODO_STATUS_CLASS_MAP,
    TODO_STATUS_TEXT_MAP
} from "@/constants.jsx";
import {Link, router} from "@inertiajs/react";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import Pagination from "@/Components/Pagination.jsx";


export default function ToDoTable({todos, queryParams = null, hideCourseNameColumn = false}){
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

        router.get(route("todo.index"), queryParams);

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

        router.get(route("todo.index"), queryParams);
    }

    const deleteTodo = (todo) => {
        if(!window.confirm("Do you really want to delete this to-do?")){
            return;
        }
        console.log("course id " + todo.id);
        router.delete(route('todo.destroy', todo));
    }

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead
                        className="text xs text-gray-700 uppercase bg-indigo-50">
                    <tr className="text-nowrap">

                        <TableHeading name="id" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                            Id
                        </TableHeading>


                        <TableHeading name="name" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                            To-Do
                        </TableHeading>

                        {!hideCourseNameColumn && (<th className="px-3 py-3">Belongs to Course</th>)}

                        {/*<th className="px-3 py-3">Description</th>*/}

                        <TableHeading name="due_date" sort_field={queryParams.sort_field}
                                      sort_direction={queryParams.sort_direction} sortChanged={sortChanged}>
                            Due date
                        </TableHeading>
                        <th className="px-3 py-3">Priority</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3 text-right">Options</th>
                    </tr>
                    </thead>
                    <thead
                        className="text xs text-gray-700 uppercase bg-indigo-50 border-b-2 border-indigo-200">
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                            <TextInput className="w-full text-xs" defaultValue={queryParams.name}
                                       placeholder="Todo Name" onBlur={e => searchFieldChanged('name', e.target.value)}
                                       onKeyPress={e => onKeyPress('name', e)}/>
                        </th>
                        {!hideCourseNameColumn && (<th className="px-3 py-3"></th>)}
                        <th className="px-3 py-3"></th>
                        {/*<th className="px-3 py-3"></th>*/}
                        <th className="px-3 py-3">
                            <SelectInput className="w-full text-xs"
                                         defaultValue={queryParams.priority}
                                         onChange={e => searchFieldChanged('priority', e.target.value)}>
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </SelectInput>
                        </th>
                        <th className="px-3 py-3">
                            <SelectInput className="w-full text-xs"
                                         defaultValue={queryParams.status}
                                         onChange={e => searchFieldChanged('status', e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Discarded</option>
                            </SelectInput>
                        </th>
                        <th className="px-3 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos.data.map(todo => (
                        <tr className="bg-indigo-50 border-b"
                            key={todo.id}>
                            <td className="px-3 py-2">{todo.id}</td>


                            <td className="px-3 py-2 font-bold hover:underline"><Link
                                href={route('todo.show', todo.id)}>
                                {todo.name}
                            </Link></td>
                            {!hideCourseNameColumn && (<td className="px-3 py-2">{todo.course.name}</td>)}
                            {/* <td className="px-3 py-2">{todo.description}</td>*/}
                            <td className="px-3 py-2">{formatDateForDisplay(todo.due_date)}</td>
                            <td className="px-3 py-2">
                                        <span
                                            className={"px-2 py-1 rounded text-white text-nowrap " + TODO_PRIORITY_CLASS_MAP[todo.priority]}>
                                        {TODO_PRIORITY_TEXT_MAP[todo.priority]}
                                        </span>
                            </td>
                            <td className="px-3 py-2">
                                        <span
                                            className={"px-2 py-1 rounded text-white text-nowrap " + TODO_STATUS_CLASS_MAP[todo.status]}>
                                        {TODO_STATUS_TEXT_MAP[todo.status]}
                                        </span>
                            </td>
                            <td className="px-3 py-2">
                                <div className="flex items-center justify-between ">
                                    <Link href={route('todo.edit', todo.id)}
                                          className="text-blue-400 hover:underline mx-1">
                                        <PencilSquareIcon className="h-6 w-6"/>
                                    </Link>
                                    <button onClick={e => deleteTodo(todo)}
                                            className="text-red-400 bg-transparent hover:underline mx-1">
                                        <TrashIcon className="h-6 w-6"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={todos.meta.links}/>
        </>
    )
}

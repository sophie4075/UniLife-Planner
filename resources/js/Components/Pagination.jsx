import {Link} from "@inertiajs/react";

export default function Pagination({links}){
    return(
        <nav className="text-center bg-indigo-50 border-t-indigo-200 border-t-2">
            {links.map(link => (

                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={"inline-block py-2 px-3 rounded-lg mt-2 mb-3 text-gray-400 text-xs" + (link.active ? "bg-indigo-300 " : " ") +
                    (!link.url ? "!text-gray-400 cursor-not-allowed " : "hover:bg-rose-100")}
                      dangerouslySetInnerHTML={{__html: link.label}}>
                </Link>
            ))}
        </nav>
    )
}

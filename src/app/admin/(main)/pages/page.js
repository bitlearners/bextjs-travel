// /pages/admin/pages.js
import Image from "next/image";
import Link from "next/link";
import DeletePage from "../components/admin/Page/DeletePage";

const getPages = async () => {
    let data = await fetch("http://localhost:3000/api/pages/allpages", { cache: "no-cache" });
    data = await data.json();
    if (data.success) {
        return data.result;
    } else {
        return { success: false };
    }
};

export default async function PageList() {
    let pages = await getPages();
    const getStatusClass = (status) => {
        switch (status) {
            case "Published":
                return "badge badge-primary badge-outline"; // Green color for Published
            case "Draft":
                return "badge badge-secondary badge-outline"; // Yellow color for Draft
            default:
                return "badge badge-accent badge-outline"; // Default color if status is unknown
        }
    };

    return (
        <div>
            <div className="p-6 m-4 rounded-lg bg-white shadow-lg">
                <h2 className="mb-5 text-2xl font-semibold">Manage Pages</h2>
                <div className="mb-4 w-full">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Page Name</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.map((page) => (
                                    <tr key={page._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <Image src={page.imageUrl} alt={page.pageName} width={100} height={100} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{page.pageName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{page.slug}</td>
                                        <td>
                                            <p
                                                className={getStatusClass(page.status)}>{page.status}
                                            </p>
                                        </td>
                                        <td>
                                            <Link href={`/${page.slug}`}>
                                                <p className="mx-2 btn btn-primary btn-xs">View</   p>
                                            </Link>

                                            {page.slug !== '/' && <DeletePage slug={page.slug} />}

                                            {/* Add DeletePage component or functionality here if needed */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th>Page Name</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

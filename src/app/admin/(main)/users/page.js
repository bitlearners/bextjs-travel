import Image from "next/image";
import Link from "next/link";
import DeleteUser from "../components/admin/User/DeleteUser";

// Function to fetch users data
const getUsers = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const response = await fetch(`${baseUrl}/api/users`, { cache: "no-cache" });
    const data = await response.json();
    console.log("Fetched users data:", data); // Log the fetched data
    if (data.success) {
      return data.result;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
};

export default async function UserList() {
  const users = await getUsers();
  console.log("Users state:", users); // Log the users state

  const adminUrl = process.env.ADMIN_URL || "/admin";

  return (
    <div>
      <div className="p-6 m-4 rounded-lg bg-white shadow-lg">
        <h2 className="mb-5 text-2xl font-semibold">Manage Users</h2>

        <div className="mb-4 w-full">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src={item.avatar || "/profile.jpg"}
                                alt={item.name}
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-medium">{item.email}</div>
                      </td>
                      <td>{item.role}</td>
                      <th>
                        <Link href={`${adminUrl}/users/${item._id}/`} className="mx-2 btn btn-primary btn-xs">
                          Update
                        </Link>
                        <DeleteUser id={item._id} />
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
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

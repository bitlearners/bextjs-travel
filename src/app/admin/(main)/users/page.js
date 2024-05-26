import Image from "next/image";
import Link from "next/link";
import DeleteUser from "../components/admin/User/DeleteUser";

const getProduct = async () => {
    let data = await fetch("/api/auth/register", { cache: "no-cache" });
    data = await data.json();
    if (data.success) {
        return data.result;
    }
    else {
        return { success: false }
    }
}

export default async function UserList() {
  let users = await getProduct();

  const adminUrl = process.env.ADMIN_URL || "/admin";

  return (
    <div>
      <div className="p-6 m-4 rounded-lg bg-white shadow-lg">
        <h2 className="mb-5 text-2xl font-semibold">Manage Users</h2>

        <div className="mb-4 w-full">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
          
                {/* row 1 */}
                {users.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image src={item.avatar} alt="alt" width={100} height={100} />
                             
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
                    
                      <DeleteUser id={item._id}/>

                      
                      
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
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

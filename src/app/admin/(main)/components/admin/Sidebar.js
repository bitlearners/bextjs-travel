"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const currentPath = usePathname();
  const adminUrl = process.env.ADMIN_URL || "/admin";

  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <aside className="left-0 z-10 w-64 h-screen shadow-xl overflow-y-auto bg-[#8576FF] text-white dark:bg-gray-800">
      <div className="h-full px-3 py-4">
        <ul className="space-y-2 font-medium">
          <li className="text-xl font-bold text-center pb-6">Travel CMS | Admin</li>
          <hr />
          <hr />

          <li>
            <Link href={adminUrl} className="py-3">
              <p
                className={
                  currentPath === adminUrl
                    ? "text-[#8576FF] font-semibold bg-gray-100 flex items-center p-2 rounded-lg hover:bg-gray-100"
                    : "flex items-center p-2 rounded-lg text-gray-100 hover:text-[#8576FF] hover:bg-gray-100"
                }
              >
                <span className="ms-3">Dashboard</span>
              </p>
            </Link>
          </li>

      

          <li>
            <div
              onClick={() => toggleSubMenu('pages')}
              className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
            >
              Pages
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                  fill=""
                ></path>
              </svg>
            </div>
            {expandedMenu === 'pages' && (
              <div className="translate transform overflow-hidden">
                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                  <li>
                    <Link href={adminUrl + "/pages"} className="py-3">
                      <p
                        className={
                          currentPath === adminUrl + "/pages"
                            ? "text-[#8576FF] font-semibold bg-gray-100 flex items-center p-2 rounded-lg hover:bg-gray-100"
                            : "flex items-center p-2 rounded-lg text-gray-100 hover:text-[#8576FF] hover:bg-gray-100"
                        }
                      >
                        <span className="ms-3">Manage Pages</span>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={adminUrl + "/pages/add"} className="py-3">
                      <p
                        className={
                          currentPath === adminUrl + "/pages/add"
                            ? "text-[#8576FF] font-semibold bg-gray-100 flex items-center p-2 rounded-lg hover:bg-gray-100"
                            : "flex items-center p-2 rounded-lg text-gray-100 hover:text-[#8576FF] hover:bg-gray-100"
                        }
                      >
                        <span className="ms-3">Add New Page</span>
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <div
              onClick={() => toggleSubMenu('users')}
              className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
            >
              Users
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                  fill=""
                ></path>
              </svg>
            </div>
            {expandedMenu === 'users' && (
              <div className="translate transform overflow-hidden">
                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                  <li>
                    <Link href={adminUrl + "/users"} className="py-3">
                      <p
                        className={
                          currentPath === adminUrl + "/users"
                            ? "text-[#8576FF] font-semibold bg-gray-100 flex items-center p-2 rounded-lg hover:bg-gray-100"
                            : "flex items-center p-2 rounded-lg text-gray-100 hover:text-[#8576FF] hover:bg-gray-100"
                        }
                      >
                        <span className="ms-3">Manage Users</span>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={adminUrl + "/users/add"} className="py-3">
                      <p
                        className={
                          currentPath === adminUrl + "/users/add"
                            ? "text-[#8576FF] font-semibold bg-gray-100 flex items-center p-2 rounded-lg hover:bg-gray-100"
                            : "flex items-center p-2 rounded-lg text-gray-100 hover:text-[#8576FF] hover:bg-gray-100"
                        }
                      >
                        <span className="ms-3">Add New User</span>
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}

"use client";

import Loading from "@/src/components/Loading";
import { useGetUsers } from "@/src/hooks/useGetUsers";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { notFound } from "next/navigation";

const ManageUsersPage = () => {
  const { data, isLoading } = useGetUsers();

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.users?.length) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="wrapper">
        <h3 className="text-2xl md:text-3xl font-bold">Manage Users</h3>
        <p className="text-sm opacity-50">
          Carefully review and manage user details to ensure accuracy and prompt
          updates. Keeping user data well-organized helps maintain security,
          enhance customer satisfaction, and streamline user management
          processes.
        </p>
        <div className="overflow-x-auto mt-5">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Fullname</th>
                <th>Username</th>
                <th>Email Address</th>
                <th>Address</th>
                <th>Orders</th>
                <th>Joined</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user?.orders?.length || 0}</td>
                  <th>{format(new Date(user.createdAt!), "dd/MM/yyyy")}</th>
                  <th
                    className={cn(user.role === "admin" ? "text-sky-500" : "")}
                  >
                    {user.role.toUpperCase()}
                  </th>
                  <td>
                    <button className="btn btn-primary whitespace-nowrap">
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Fullname</th>
                <th>Username</th>
                <th>Email Address</th>
                <th>Address</th>
                <th>Orders</th>
                <th>Joined</th>
                <th>Role</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ManageUsersPage;

"use client";

import Loading from "@/src/components/Loading";
import Processing from "@/src/components/Processing";
import { useGetUsers } from "@/src/hooks/useGetUsers";
import { cn } from "@/src/lib/utils";
import { roleSchema, TRole } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { X } from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ManageUsersPage = () => {
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const { data, isLoading } = useGetUsers();
  const { handleSubmit, control, reset } = useForm<TRole>({
    resolver: zodResolver(roleSchema),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.users?.length) {
    return notFound();
  }

  const onSubmit = (formData: TRole) => {
    setActiveUser(null);
    reset();
    console.log(formData);
  };

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
                    <button
                      onClick={() => {
                        setActiveUser(user._id);
                        if (user.role === "user" || user.role === "admin") {
                          reset({ role: user.role });
                        } else {
                          console.error("Invalid role:", user.role);
                        }
                      }}
                      className="btn btn-primary whitespace-nowrap"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {activeUser && (
        <>
          <span
            onClick={() => setActiveUser(null)}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[49] bg-black/20"
          ></span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-base-100 w-full md:w-96 p-10 rounded shadow-lg"
          >
            <button
              onClick={() => setActiveUser(null)}
              className="absolute top-4 right-4"
              type="button"
            >
              <X size={16} />
            </button>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-4">
                  <select {...field} className="select select-bordered w-full">
                    {["admin", "user"].map((role) => (
                      <option key={role} value={role}>
                        {role.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    {isLoading ? <Processing /> : "Update"}
                  </button>
                </div>
              )}
            />
          </form>
        </>
      )}
    </main>
  );
};

export default ManageUsersPage;

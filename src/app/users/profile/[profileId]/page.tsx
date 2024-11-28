"use client";

import { RootState } from "@/src/redux/store";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { profileId } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  if (!user) {
    return notFound();
  }

  if (user._id !== profileId) {
    return notFound();
  }

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="w-full h-[calc(100vh-4rem)] order-1 md:order-first xl:col-span-2">
          <Image
            src={user.image as string}
            alt={user.name}
            width={1080}
            height={1920}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 justify-center wrapper">
          <h3 className="text-2xl md:text-3xl font-bold">{user.name}</h3>
          <p className="-mt-5 text-sm opacity-50">@{user.username}</p>
          {user.orders && user.orders?.length > 0 && (
            <div className="flex items-center gap-5 justify-between">
              <p className="badge badge-primary badge-outline uppercase whitespace-nowrap">
                {user.orders?.length > 0 &&
                  user.orders?.length < 6 &&
                  "New Customer"}
                {user.orders?.length > 5 &&
                  user.orders?.length < 11 &&
                  "Rising Customer"}
                {user.orders?.length > 10 &&
                  user.orders?.length < 21 &&
                  "Regular Customer"}
                {user.orders?.length > 20 && "Legend Customer"}
              </p>
              <p className="flex-shrink-0 whitespace-nowrap">
                Orders:{" "}
                <span className="badge badge-primary">
                  {user.orders?.length}
                </span>
              </p>
            </div>
          )}
          <div>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Address:</b> {user.address}
            </p>
            <p>
              <b>Role:</b> {user.role}
            </p>
            <p>
              <b>Joined:</b>{" "}
              {format(new Date(user.createdAt as Date), "dd/MM/yyyy")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center">
            <button className="btn" onClick={() => router.back()}>
              Go Back
            </button>
            <Link
              href={`/users/profile/update/${user._id}`}
              className="btn btn-primary"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;

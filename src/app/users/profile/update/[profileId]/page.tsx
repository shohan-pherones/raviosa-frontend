"use client";

import Processing from "@/src/components/Processing";
import { useMutateUser } from "@/src/hooks/useMutateUser";
import { IUpdateUserData } from "@/src/interfaces";
import { saveCredentials } from "@/src/redux/features/auth/authSlice";
import { RootState } from "@/src/redux/store";
import { updateUserSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfilePage = () => {
  const { profileId } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username,
      name: user?.name,
      address: user?.address,
    },
  });
  const { mutate, isLoading } = useMutateUser(profileId as string);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (data: IUpdateUserData) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("address", data.address);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        dispatch(saveCredentials(response));
        setTimeout(() => {
          router.push(`/users/profile/${response.user._id}`);
        }, 100);
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "An error occurred");
        } else {
          toast.error(err.message || "An unexpected error occurred");
        }
      },
    });
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-last md:order-first">
          <Image
            src={user?.image as string}
            alt={user?.name as string}
            width={1080}
            height={1920}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="wrapper flex flex-col gap-2 justify-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Update User Information
          </h3>
          <p className="text-sm opacity-50">
            Update your account details below to keep your profile up to date.
            Ensuring accurate information helps us provide better services,
            including personalized recommendations and smooth transactions!
          </p>
          <label htmlFor="username" className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="sarah_parker"
              className="input input-bordered w-full"
            />
            {errors.username && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.username.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="name" className="form-control w-full">
            <div className="label">
              <span className="label-text">Fullname</span>
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Sarah Parker"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.name.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="image" className="form-control w-full">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              id="image"
              className="file-input file-input-bordered w-full max-w-xl"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue("image", e.target.files[0]);
                }
              }}
            />
            {errors.image && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.image.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="address" className="form-control w-full">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <input
              {...register("address")}
              type="text"
              id="address"
              placeholder="123 Main Street, NY"
              className="input input-bordered w-full"
            />
            {errors.address && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.address.message}
                </span>
              </div>
            )}
          </label>
          <button
            disabled={isLoading}
            type="submit"
            className="mt-3 btn btn-primary"
          >
            {isLoading ? <Processing /> : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default UpdateProfilePage;

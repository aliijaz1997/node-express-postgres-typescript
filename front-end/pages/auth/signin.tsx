import axios from "axios";
import Router from "next/router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  Email: string;
  Password: string;
};
function SignIn() {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  async function HandleSubmit(data: FormData) {
    console.log(data);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email: data.Email,
          password: data.Password,
        },
        { withCredentials: true }
      );
      reset({ Email: "", Password: "" });
      Router.push("/");
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          "https://c4.wallpaperflare.com/wallpaper/517/669/110/5bd20237efe12-wallpaper-preview.jpg" +
          ")",
        height: "100vh",
      }}
      className="flex justify-end"
    >
      <div className="">
        <form
          className="bg-white mt-16 mr-4 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(HandleSubmit)}
        >
          <div className="flex flex-col">
            <label className="text-gray-900">Email</label>
            <Controller
              name="Email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <input
                  placeholder="Email"
                  className="h-8 text-white rounded mt-1 text-center bg-blue-900 border-black"
                  type="email"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{ required: true }}
            />
            <span className="text-red-700 text-sm">
              {errors.Email && "Email is required"}
            </span>
            <label className="text-gray-900">Password</label>
            <Controller
              name="Password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, formState }) => (
                <input
                  placeholder="Password"
                  className="h-8 text-white mt-1 rounded text-center bg-blue-900 border-black"
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{ required: true }}
            />

            <span className="text-red-700 text-sm">
              {errors.Password && "Password is required"}
            </span>
            <button
              className="mt-4 bg-green-600 text-white rounded"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

"use client";

import { setUsername } from "@/lib/redux/features/loginSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    if (!username) return;

    dispatch(setUsername(username));
    if (typeof window !== "undefined") {
      localStorage.setItem("username", username);
    }

    router.push("/");
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="border rounded-2xl h-auto w-96 flex flex-col p-4 bg-white"
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Login
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            name="username"
            id="username"
            className="border rounded-lg p-2"
          />
        </div>
        <div className="mt-auto flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

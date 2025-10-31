import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <form className="flex flex-col gap-4 mt-4">
          <label className="flex flex-col text-left">
            Email:
            <input
              type="email"
              name="email"
              className="bg-gray-800 text-white p-2 rounded"
            />
          </label>
          <label className="flex flex-col text-left">
            Password:
            <input
              type="password"
              name="password"
              className="bg-gray-800 text-white p-2 rounded"
            />
          </label>
          <Link href="/">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 mt-4"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

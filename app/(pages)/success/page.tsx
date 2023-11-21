import Button from "@/app/components/button";

export default function Success() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: 'url("/6103107.jpg")' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="text-green-500 w-12 h-12 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">
            User Created Successfully!
          </h1>
        </div>
        <p className="text-gray-600">
          Thank you for creating an account. You can now log in and explore our
          platform.
        </p>
        <div className="mt-6">
          <Button text="Login" to="/login" />
        </div>
      </div>
    </div>
  );
}

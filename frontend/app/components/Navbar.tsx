export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-blue-600">
          TaskTracker
        </h1>

        <span className="text-sm text-gray-500">
          Student Dashboard
        </span>
      </div>
    </nav>
  );
}
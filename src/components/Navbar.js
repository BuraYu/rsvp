export default function Navbar() {
  return (
    <nav className="h-[80px] w-full flex justify-between items-center px-[96px] bg-gray-900">
      <div className="flex items-center space-x-2 text-xl font-bold gap-2">
        <span>logo</span>
        <span>Text</span>
      </div>
      <ul className="flex space-x-6 gap-5">
        <li>
          <a href="" className="hover:text-gray-400 transition">
            Find Events
          </a>
        </li>
        <li>
          <a href="" className="hover:text-gray-400 transition">
            Dashboard
          </a>
        </li>
        <li>
          <a href="" className="hover:text-gray-400 transition">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

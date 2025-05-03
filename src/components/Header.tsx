import Link from "next/link";
import { usePathname } from "next/navigation";
import UserHeader from "./UserHeader";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r  from-gray-800 to-gray-700 text-white shadow-md ">
      <nav>
        <ul className="flex space-x-8 ml-2 sm:ml-10">
          <li>
            <Link
              href="/"
              className={`text-lg font-semibold transition-colors duration-300 ${
                pathname === "/" ? "text-blue-400" : "hover:text-gray-300"
              }`}
            >
              Players
            </Link>
          </li>
          <li>
            <Link
              href="/teams"
              className={`text-lg font-semibold transition-colors duration-300 ${
                pathname === "/teams" ? "text-blue-400" : "hover:text-gray-300"
              }`}
            >
              Teams
            </Link>
          </li>
        </ul>
      </nav>
      <UserHeader />
    </header>
  );
};

export default Header;

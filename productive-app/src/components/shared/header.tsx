import Link from 'next/link';

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-gray-100">
      <Link className="flex items-center justify-center font-bold text-xl" href="/">
        Productive
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
          Log In
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4 text-emerald-500" href="/signup">
          Sign Up
        </Link>
      </nav>
    </header>
  )
}
export default Header;
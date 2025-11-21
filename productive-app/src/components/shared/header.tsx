import Link from 'next/link';

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white border-b border-gray-200">
      
      <Link className="flex items-center gap-2 font-bold text-xl text-gray-800" href="/">Productive</Link>

      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4 text-emerald-500 flex flex items-center" href="/login">
        <button 
                type="submit" 
                className="py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
              >
                Login
              </button>
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4 text-emerald-500 flex items-center" href="/signup">
        <button 
                type="submit" 
                className="py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
              >
                Signup
              </button>
        </Link>
      </nav>
      
      {/* <div className="flex flex-1 justify-center px-4 lg:px-8">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
             </svg>
          </div>
          <input type="text" className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
            placeholder="Search Task"/>

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div> */}
      {/* <div className="flex items-center gap-3">
         <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-700 leading-none">Title</p>
            <p className="text-xs text-gray-400">Description</p>
         </div>
         <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
            <img 
              src="https://i.pravatar.cc/150?img=6" 
              alt="User Profile" 
              className="h-full w-full object-cover"
            />
         </div>
      </div> */}

    </header>
  )
}

export default Header;
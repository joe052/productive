"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

/**INTERFACES & TYPES */
interface HeaderProps {
  user: User | null;
}

/**COMPONENT */
const Header = ({ user: initialUser }: HeaderProps) => {
   /**VARIABLES */
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Simple state for mobile menu or dropdown

  /**FUNCTIONS */
  /**Sync state if prop changes (e.g. on route change) */
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null); // Optimistic UI update
      router.refresh(); // Refreshes server components
      router.push("/login"); // Redirect to login
    }
  };

  /**Helper to get initials or email prefix */
  const displayName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || "User";

  /**TEMPLATE */
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white border-b border-gray-200">
      <Link
        className="flex items-center font-bold text-xl text-gray-800"
        href="/"
      >
        {/* Ensure your image path is correct in public folder */}
        <img src="/calender.png" className="h-10 w-auto mr-2" alt="Logo" />
        Productive
      </Link>

      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {!user ? (
          /* ================= GUEST VIEW ================= */
          <>
            <Link
              className="text-sm font-medium text-emerald-500 hover:text-emerald-600"
              href="/login"
            >
              <button className="py-2 px-4 border border-green-500 rounded-full text-sm font-medium text-green-500 hover:bg-green-50 transition duration-150">
                Login
              </button>
            </Link>
            <Link
              className="text-sm font-medium"
              href="/signup"
            >
              <button className="py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition duration-150">
                Signup
              </button>
            </Link>
          </>
        ) : (
          /* ================= LOGGED IN VIEW ================= */
          <div className="flex items-center gap-4">
            {/* User Profile Info */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-700 leading-none capitalize">
                  {displayName}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              
              {/* Avatar Circle */}
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border border-green-200 text-green-700 font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-2 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
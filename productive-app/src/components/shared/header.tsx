"use client";

import React, { useState, useEffect} from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import HeaderDropdown from "./HeaderDropdown";

/**INTERFACES & TYPES */
interface HeaderProps {
  user: User | null;
}


/**COMPONENT */
const Header: React.FC<HeaderProps> = ({ user: initialUser }) => {
  /**VARIABLES */
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);

  /**FUNCTIONS */
  /**Sync state if prop changes (e.g. on route change) */
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  /**Function to handle logout */
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      router.refresh();
      router.push("/login");
    }
  };

  /**Helper to get initials or email prefix */
  /**Updated to check for Google specific keys (full_name/name) first */
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.first_name ||
    user?.email?.split("@")[0] ||
    "User";

  /**TEMPLATE */
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white border-b border-gray-200 relative z-[100]">
      <Link
        className="flex items-center font-bold text-xl text-gray-800"
        href="/"
      >
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
            <Link className="text-sm font-medium" href="/signup">
              <button className="py-2 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition duration-150">
                Signup
              </button>
            </Link>
          </>
        ) : (
          /* ================= LOGGED IN VIEW ================= */
          <HeaderDropdown
            user={user}
            displayName={displayName}
            handleLogout={handleLogout}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;

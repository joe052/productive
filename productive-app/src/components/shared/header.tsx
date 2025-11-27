"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useState, useEffect, useRef } from "react";

/**INTERFACES & TYPES */
interface HeaderProps {
  user: User | null;
}

interface UserDropdownProps {
  user: User;
  displayName: string;
  handleLogout: () => void;
}

/** * SUB-COMPONENT: User Dropdown 
 * Handles the "Pinterest-style" popup menu
 */
const UserDropdown = ({ user, displayName, handleLogout }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Safely get avatar url if it exists in metadata
  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ================= TRIGGER BUTTON ================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
      >
        {/* Avatar Circle (Trigger) */}
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border border-green-200 overflow-hidden text-green-700 font-bold">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <span>{displayName.charAt(0).toUpperCase()}</span>
          )}
        </div>
        
        {/* Down Arrow Icon */}
        <svg 
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ================= DROPDOWN MENU ================= */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-100">
          
          {/* Section: Currently In */}
          <p className="text-xs font-medium text-gray-500 mb-3">Currently in</p>

          {/* User Profile Card */}
          <div className="flex items-center gap-3 mb-6 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
            {/* Big Avatar */}
            <div className="h-14 w-14 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 text-xl font-bold text-green-700">
               {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span>{displayName.charAt(0).toUpperCase()}</span>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 min-w-0 text-left">
              <h3 className="font-bold text-gray-900 truncate">{displayName}</h3>
              <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
            </div>

            {/* Checkmark Icon */}
            <div className="text-gray-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Section: Your Accounts / Logout */}
          <div className="space-y-0.5">
            <button
              onClick={handleLogout}
              className="w-full text-left px-2 py-2 text-md font-bold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Log out
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

/**MAIN COMPONENT */
const Header = ({ user: initialUser }: HeaderProps) => {
   /**VARIABLES */
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // Unused in this snippet, can keep if needed for mobile nav

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
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white border-b border-gray-200 relative z-40">
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
          <UserDropdown 
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
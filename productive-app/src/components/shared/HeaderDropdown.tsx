import React, { useState, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";

/**INTERFACES & TYPES */
interface UserDropdownProps {
  user: User;
  displayName: string;
  handleLogout: () => void;
}

/**COMPONENT */
const HeaderDropdown: React.FC<UserDropdownProps> = ({
  user,
  displayName,
  handleLogout,
}) => {
  /**VARIABLES */
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**FUNCTIONS */
  /**Close dropdown if clicked outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /** EXTRACT AVATAR URL - Google usually provides 'avatar_url' or 'picture' */
  const avatarUrl =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    user.user_metadata?.avatar;

  /**TEMPLATE */
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
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
              /** Google images sometimes break without this policy */
              referrerPolicy="no-referrer"
            />
          ) : (
            /** Fallback for Email/Password users */
            <span>{displayName.charAt(0).toUpperCase()}</span>
          )}
        </div>

        {/* Down Arrow Icon */}
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ================= DROPDOWN MENU ================= */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-105 animate-in fade-in zoom-in-95 duration-100">
          {/* Section: Currently In */}
          <p className="text-xs font-medium text-gray-500 mb-3">Currently in</p>

          {/* User Profile Card */}
          <div className="flex items-center gap-3 mb-6 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
            {/* Big Avatar inside Dropdown */}
            <div className="h-14 w-14 rounded-full bg-green-100 shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 text-xl font-bold text-green-700">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{displayName.charAt(0).toUpperCase()}</span>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 min-w-0 text-left">
              <h3 className="font-bold text-gray-900 truncate">
                {displayName}
              </h3>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {user.email}
              </p>
            </div>

            {/* Checkmark Icon */}
            <div className="text-gray-700">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Section: Your Accounts / Logout */}
          <div className="space-y-0.5">
            <button
              onClick={handleLogout}
              className="w-full text-left px-2 py-2 text-md font-bold text-gray-800 hover:bg-gray-50 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;

import Header from "@/components/shared/header";
import { createClient } from "@/lib/supabase/server";
import { ReactNode } from "react";

/**INTERFACES & TYPES */
interface MainLayoutProps {
  children: ReactNode;
}

/**MAIN APP LAYOUT */
const MainLayout = async ({ children }: MainLayoutProps) => {
  /**VARIABLES */
  /**Fetch user */
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  /**FUNCTIONS */

  /**TEMPLATE */
  return (
    <div className="">
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;

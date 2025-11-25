import Header from "@/components/shared/header";
import { ReactNode } from "react";

/**INTERFACES & TYPES */
interface MainLayoutProps {
  children: ReactNode;
}

/**MAIN APP LAYOUT */
const MainLayout = ({ children }: MainLayoutProps) => {
  /**VARIABLES */

  /**FUNCTIONS */

  /**TEMPLATE */
  return (
    <div className="">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;

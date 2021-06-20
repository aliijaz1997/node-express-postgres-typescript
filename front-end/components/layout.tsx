import { ReactChild } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
interface LayoutProps {
  currentUser: { id: string; username: string; iat: number };
  children: ReactChild;
}
const Layout = ({ children, currentUser }: LayoutProps) => {
  return (
    <div className="content">
      <Navbar user={currentUser} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

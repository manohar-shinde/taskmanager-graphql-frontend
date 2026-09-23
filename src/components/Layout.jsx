import { logout } from "../auth/logout";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <button onClick={logout}>Logout</button>
      </header>
      {children}
    </>
  );
};

export default Layout;

import { Navigate, Outlet } from "react-router";

type PublicRouteProps = {
  user: boolean | null;
  restricted: boolean;
  children?: React.ReactNode;
};

const PublicRoute = ({ user, restricted, children }: PublicRouteProps) => {
  if (user && restricted) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
  
};

export default PublicRoute;

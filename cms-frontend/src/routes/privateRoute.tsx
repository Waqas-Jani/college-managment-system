import { Navigate, Outlet } from "react-router";

type PrivateRouteProps = {
  user: boolean | null;
  children?: React.ReactNode;
};

const PrivateRoute = ({ user, children }: PrivateRouteProps) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;

import { useContext, useEffect, ComponentType, ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  return (props: P): ReactElement | null => {
    const navigate: NavigateFunction = useNavigate();
    const { user } = useContext(UserContext);

    useEffect((): void => {
      if (!user) {
        navigate("/auth");
      }
    }, [user, navigate]);
    return user && <WrappedComponent {...props} />;
  };
};

export default withAuth;

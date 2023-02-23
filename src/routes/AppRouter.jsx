import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, HashRouter, useNavigate } from "react-router-dom";
import { Loading } from "../components/loading/Loading";
import { Home } from "../pages/home/Home";
import { Landing } from "../pages/landing/Landing";
import { startChecking } from "../redux/actions/auth";
import PrivateRoute from "./PrivateRouter";
import PublicRoute from "./PublicRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth);
  const { isLoading } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);


  return (
    <HashRouter>
      {isLoading && <Loading />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute isAuthenticated={!!id}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Landing />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path="/bank/*"
          element={
            <PrivateRoute isAuthenticated={!!id}>
              <Routes>
                <Route path="home" element={<Home />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

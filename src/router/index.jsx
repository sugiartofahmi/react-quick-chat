import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const Home = lazy(() => import("../views/Home"));
const NotFound = lazy(() => import("../views/NotFound"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

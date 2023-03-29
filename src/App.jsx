import { Suspense, lazy } from "react";
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const Loading = lazy(() => import("@/components/Loading"));
const Router = lazy(() => import("@/router"));
const App = () => {
  document.title = "Quick Chat";
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Router />
      </Suspense>
    </MainLayout>
  );
};

export default App;

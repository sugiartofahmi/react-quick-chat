import { lazy } from "react";
const ContentLayout = lazy(() => import("../../layouts/ContentLayout"));
const Home = () => {
  return (
    <ContentLayout>
      <div className="flex w-full h-full justify-center py-5 items-center ">
        <h1>Home</h1>
      </div>
    </ContentLayout>
  );
};

export default Home;

const ContentLayout = ({ children }) => {
  return (
    <section className="min-h-screen flex flex-col w-full bg-[#232932] text-white  items-center ">
      {children}
    </section>
  );
};

export default ContentLayout;

import Sidebar from "./sidebar/sidebar";
import Header from "./header/header";
import Content from "./content/content";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = async ({ children }) => {
  // const isOpenModal = data?.store?.id === null;

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="min-h-0 w-full">
        <Header />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default MainLayout;

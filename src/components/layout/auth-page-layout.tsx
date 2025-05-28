import Image from "next/image";

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex">
      <main className="w-full lg:w-[50%] p-[25px]">{children}</main>
      <aside className="hidden lg:block lg:w-[50%] relative p-12">
        <div className="absolute top-[68px] right-[68px]">
          <h1 className="!m-0 !p-0 leading-8 text-[28px] text-primary font-bold">
            Inven<span className="text-accent">Track</span>
          </h1>
        </div>
        <div className="w-full h-full bg-[#F5F8FF] rounded-[20px] flex flex-col gap-y-6 justify-between items-center p-16">
          <Image
            src="/image-auth.png"
            width={0}
            height={0}
            alt="Logo auth"
            className="w-auto h-auto"
            sizes="100vw"
          />
          <p className="text-center text-2xl leading-8 w-[480px]">
            Manage all your bookings and inventories in{" "}
            <strong>one platform</strong>.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default AuthPageLayout;

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
          <Image
            priority
            width={88}
            height={40}
            alt="logo"
            src="/dashboard-logo.png"
          />
        </div>
        <div className="w-full h-full bg-[#F5F8FF] rounded-[20px] flex flex-col gap-y-6 justify-center items-center p-16">
          <Image
            src="/image-auth.png"
            width={0}
            height={0}
            alt="Logo auth"
            className="w-auto h-auto"
            sizes="100vw"
          />
          <p className="text-center text-2xl leading-8 w-[480px]">
            Kelola semua pesanan dan pengirimanmu dalam{" "}
            <strong>satu platform</strong>.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default AuthPageLayout;

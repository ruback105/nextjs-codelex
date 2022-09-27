import { Button } from "@/components";
import { className } from "@/components/Button";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const routes = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Support",
      href: "/support",
    },
    {
      title: "Notification",
      href: "/notification",
    },
  ];

  return (
    <div className="p-[30px] bg-[#E5E5E5] h-screen flex flex-col">
      <header className="flex justify-between items-center pb-8">
        <h1 className="whitespace-nowrap font-bold text-xl ml-4">Quiz Time</h1>
        <div className="ml-[115px] p-[18px] flex space-x-[15px] bg-white border-2 shadow-sm rounded-full overflow-hidden min-w-[250px]">
          <Image
            src="/search.svg"
            width={20}
            height={20}
            className="text-black"
          />
          <input type="text" defaultValue="Search.." />
        </div>
        <div className="pl-[120px] flex items-center">
          <Button primary>Start Quiz</Button>

          <div className="pl-[134px] flex space-x-[15px] items-center">
            <Image
              src="/Profile.png"
              width={70}
              height={70}
              unoptimized
              className="text-black"
            />
            <p className="truncate">Lorem, ipsum.</p>
          </div>
        </div>
      </header>
      <div className="flex h-full w-full">
        <div className="flex flex-col w-[330px] h-full">
          <div className="space-y-[15px] flex flex-col">
            {routes.map((route) => (
              <Link href={route.href}>
                <a
                  className={classNames(
                    className(router.route === route.href, true),
                    "text-center"
                  )}
                >
                  {route.title}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex space-x-[35px] mt-auto justify-center w-full ">
            <Image src="/exit.svg" width={20} height={20} />
            <p className="text-[#696F79] text-lg">Log Out</p>
          </div>
        </div>

        <div className="w-full ml-[30px] p-[33px] pt-[50px] shadow-inner rounded-[30px] bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

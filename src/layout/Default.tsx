import { Button } from "@/components";
import { buttonClassName } from "@/components/Button";
import classNames from "classnames";
import Link from "next/link";
import { FC, ReactNode } from "react";
import {
  UserIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  AdjustmentsIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: <AcademicCapIcon width={20} height={20} />,
    },
    {
      title: "Support",
      href: "/support",
      icon: <QuestionMarkCircleIcon width={20} height={20} />,
    },
    {
      title: "Notification",
      href: "/notification",
      icon: <AdjustmentsIcon width={20} height={20} />,
    },
  ];

  function logout() {
    return null;
  }

  return (
    <div className="p-[30px] bg-[#E5E5E5] h-screen flex flex-col">
      <header className="flex justify-between items-center pb-8">
        <h1 className="whitespace-nowrap font-bold text-xl ml-4">Quiz Time</h1>
        <div className="p-[18px] flex space-x-[15px] bg-white border-2 shadow-sm rounded-full overflow-hidden min-w-[250px]">
          <SearchIcon />
          <input type="text" defaultValue="Search.." />
        </div>
        <Button primary>Start Quiz</Button>

        <button
          type="button"
          onClick={logout}
          className="flex space-x-[15px] items-center"
        >
          <UserIcon />
          <p className="truncate">Lorem, ipsum.</p>
        </button>
      </header>
      <div className="flex h-full w-full">
        <div className="flex flex-col w-[330px] h-full">
          <div className="space-y-[15px] flex flex-col">
            {routes.map(({ href, title, icon }) => {
              const activeRoute = router.route === href;

              return (
                <Link href={href} key={title}>
                  <a
                    className={classNames(
                      buttonClassName(activeRoute, true),
                      "gap-x-3 items-center flex justify-center",
                      {
                        "text-white": activeRoute,
                      }
                    )}
                  >
                    {icon}
                    {title}
                  </a>
                </Link>
              );
            })}
          </div>

          <button
            className="flex space-x-[35px] mt-auto justify-center items-center w-full"
            onClick={() => signOut()}
          >
            <ArrowLeftIcon width={20} height={20} />
            <p className="text-[#696F79] text-lg">Log Out</p>
          </button>
        </div>

        <div className="w-full ml-[30px] p-[33px] pt-[50px] shadow-inner rounded-[30px] bg-white overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

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
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: <AcademicCapIcon width={20} height={20} />,
    },
    {
      title: "Categories",
      href: "/category",
      icon: <QuestionMarkCircleIcon width={20} height={20} />,
    },
    {
      title: "Notification",
      href: "/notification",
      icon: <AdjustmentsIcon width={20} height={20} />,
    },
  ];

  function getProfileIcon(children: ReactNode) {
    if (session?.provider === "credentials") {
      return <Link href="/profile">{children}</Link>;
    }

    return children;
  }

  return (
    <div className="p-[30px] bg-[#E5E5E5] h-screen flex flex-col overflow-hidden">
      <header className="flex justify-between items-center pb-8">
        <h1 className="whitespace-nowrap font-bold text-xl ml-4">Quiz Time</h1>
        <div className="p-[18px] flex space-x-[15px] bg-white border-2 shadow-sm rounded-full overflow-hidden min-w-[250px]">
          <SearchIcon />
          <input type="text" defaultValue="Search.." />
        </div>
        <Button primary>Start Quiz</Button>

        {getProfileIcon(
          <div
            className={classNames("flex space-x-[15px] items-center", {
              "cursor-pointer": session?.provider === "credentials",
            })}
          >
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <UserIcon />
            )}
            <p className="truncate">{session?.user?.name || "No User Name"}</p>
          </div>
        )}
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

        <div className="w-full ml-[30px] p-[33px] shadow-inner rounded-[30px] bg-white max-h-[80vh] h-full overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

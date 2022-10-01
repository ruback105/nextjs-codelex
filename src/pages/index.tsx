import { CategoryCard, ProgressIcon, ProgressSlider } from "@/components";
import { CategoryProps } from "@/models/Category";
import { NextCustomPage } from "@/types/generic";
import { CheckCircleIcon, ClockIcon, FlagIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";

export type Props = {
  categories: CategoryProps[];
};

const Dashboard: NextCustomPage<Props> = ({ categories }) => {
  const router = useRouter();

  const mockedProgress = [
    {
      title: "Quiz Passed",
      value: 27,
      Icon: FlagIcon,
    },
    {
      title: "Fastest Time",
      value: "27min",
      Icon: ClockIcon,
    },
    {
      title: "Correct Answers",
      value: 200,
      Icon: CheckCircleIcon,
    },
  ];

  const mockedAchievements = ["Comeback", "Winner", "Lucky", "Happy"];

  const ProfileHeader = () => (
    <div className="flex space-x-10">
      <div className="w-1/4 relative rounded-[30px] overflow-hidden">
        <Image
          src="/profile.png"
          layout="fill"
          objectFit="cover"
          className="scale-150"
        />
      </div>
      <div className="w-3/4">
        <h2 className="font-bold text-xl">Oluwatobi Olowu</h2>
        <p>Bonus booster 24lv</p>

        <div className="mt-4">
          <ProgressSlider percentage={45} />
        </div>

        <div className="grid grid-cols-3 mt-4">
          {mockedProgress.map((progressIcon) => (
            <ProgressIcon {...progressIcon} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <ProfileHeader />
      <div className="mt-4 flex space-x-[30px] w-full">
        <div className="w-1/2 flex flex-col flex-1 h-[360px]">
          <div className="flex justify-between w-full items-center">
            <h3 className="font-bold text-lg">Achievements</h3>

            <div className="w-[160px]">
              <ProgressSlider percentage={80} />
            </div>
          </div>

          <div className="rounded-[30px] overflow-hidden shadow-md p-4">
            <div className="grid grid-cols-2">
              {mockedAchievements.map((achievement) => (
                <button type="button" className="flex flex-col items-center">
                  <div className="w-[100px] h-[100px] bg-gray-300 rounded-md"></div>
                  <p>{achievement}</p>
                </button>
              ))}
            </div>

            <hr className="my-4 w-4/5 mx-auto" />

            <button type="button" className="w-full text-center">
              View All
            </button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col flex-1 h-[360px]">
          <div className="flex justify-between w-full items-center">
            <h3 className="font-bold text-lg">Featured Category</h3>
            <div className="w-[160px] text-right">
              <button type="button" onClick={() => router.push("/category")}>
                View all
              </button>
            </div>
          </div>

          <div className="mt-2 rounded-[30px] overflow-hidden grid grid-cols-2 gap-5 h-full">
            {categories.map(({ key, title }) => (
              <CategoryCard
                onClick={() => router.push(`/category/${key ?? ""}`)}
                title={title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { categories } = await fetch(
    "http://localhost:3000/api/category?limit=4"
  ).then((res) => res.json());

  return {
    props: { categories },
  };
};

Dashboard.layout = "default";

export default Dashboard;

import { NextCustomPage } from "@/types/generic";

export type Props = {};

const Dashboard: NextCustomPage<Props> = () => {
  return <div className="grid grid-cols-3 md:grid-cols-5"></div>;
};

export const getServerSideProps = async () => {
  const { categories } = await fetch("http://localhost:3000/api/category").then(
    (res) => res.json()
  );

  return {
    props: {
      categories,
    },
  };
};

Dashboard.layout = "default";

export default Dashboard;

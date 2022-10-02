import config from "@/config";
import { CategoryProps } from "@/models/Category";
import { NextCustomPage } from "@/types/generic";
import { GetServerSidePropsContext } from "next";

export type Props = {
  categoryKey: string;
  categories: CategoryProps[];
};

const Category: NextCustomPage<Props> = ({ categoryKey, categories }) => {
  return <div>{categoryKey}</div>;
};

Category.layout = "default";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const { categories } = await fetch(
    `${config.baseUrl}/api/category/${query.key}}`
  ).then((res) => res.json());

  return {
    props: {
      categoryKey: query.key,
      categories,
    },
  };
};

export default Category;

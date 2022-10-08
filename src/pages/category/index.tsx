import { Button, CategoryCard } from "@/components";
import config from "@/config";
import { CategoryProps } from "@/models/Category";
import { NextCustomPage } from "@/types/generic";
import { BaseSyntheticEvent } from "react";

type Props = {
  categories: CategoryProps[];
};

const Categories: NextCustomPage<Props> = ({ categories }) => {
  const handleSubmit = (
    e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement, HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    fetch(`${config.baseUrl}/api/category`, {
      method: "POST",
      body: JSON.stringify(formProps),
    });
  };

  return (
    <div className="p-4 w-full h-full rounded-[30px]">
      <form
        action=""
        className="w-full flex items-center justify-center bg-gray-300"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>New Category:</legend>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
          <label htmlFor="key">Category key</label>
          <input type="text" id="key" name="key" />
          <Button type="submit" primary>
            Create new Category
          </Button>
        </fieldset>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 pt-10">
        {categories.map(({ key, title }) => (
          <CategoryCard href={`/category/${key}`} title={title} key={key} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { categories } = await fetch(
    `${config.baseUrl}/api/category?limit=6`
  ).then((res) => res.json());
  return {
    props: { categories },
  };
};

Categories.layout = "default";

export default Categories;

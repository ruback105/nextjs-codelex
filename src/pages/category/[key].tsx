import config from "@/config";
import Topic, { TopicProps } from "@/models/Topic";
import { NextCustomPage } from "@/types/generic";
import {
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { CategoryCard } from "@/components";
import { useForm } from "react-hook-form";
import dbConnect from "@/lib/dbConnect";

export type Props = {
  categoryKey: string;
  topics: TopicProps[];
};

const Category: NextCustomPage<Props> = ({ categoryKey, topics }) => {
  const { register, handleSubmit } = useForm<TopicProps>({
    defaultValues: {
      title: "World War II",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, inventore nobis. Dolorum enim voluptates assumenda obcaecati, dolore incidunt quaerat id?",
      category_key: "history",
      date: new Date(),
      points: 100,
      time_limit: "40 min",
      attempts: 3,
      questions: [
        {
          question_description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, inventore nobis. Dolorum",
          answers: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
          correct_answer: 1,
        },
        {
          question_description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, inventore nobis. Dolorum",
          answers: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
          correct_answer: 2,
        },
        {
          question_description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, inventore nobis. Dolorum",
          answers: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
          correct_answer: 3,
        },
        {
          question_description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, inventore nobis. Dolorum",
          answers: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
          correct_answer: 0,
        },
      ],
    },
  });

  function Form() {
    async function onSubmit(data: TopicProps) {
      const topic = await fetch("/api/topic", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json());

      console.log(topic);
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("category_key")}
          value={categoryKey}
          type="text"
          hidden
        />
        <input {...register("title")} type="text" placeholder="Topic title" />
        <input
          {...register("description")}
          type="text"
          placeholder="Topic description"
        />
        <input {...register("date")} type="date" placeholder="Topic date" />
        <input
          {...register("time_limit")}
          type="string"
          placeholder="Time limit"
        />
        <input
          {...register("points")}
          type="number"
          placeholder="Topic point count"
        />
        <input
          {...register("attempts")}
          type="number"
          placeholder="Topic attempt count"
        />
        Questions:
        {/* <input
          {...register("question_description")}
          type="string"
          placeholder="Enter question description"
        />
        <input
          {...register("answers")}
          type="string"
          placeholder="Answers, separated by comma"
        />
        <input
          {...register("correct_answer")}
          type="number"
          placeholder="Enter correct answer index"
        /> */}
        <button type="submit">Create new Topic</button>
      </form>
    );
  }

  return (
    <div className="h-full">
      <h2 className="text-3xl font-bold">Select Topic</h2>

      <h5 className="text-xl pt-2 font-semibold">
        Featured Category: <span className="capitalize">{categoryKey}</span>
      </h5>

      <div className="grid mt-[25px] grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[30px] overflow-y-scroll">
        {topics.length ? (
          topics.map(({ _id, title }) => (
            <CategoryCard title={title} href={`/topics/${_id}`} key={_id} />
          ))
        ) : (
          <Form />
        )}
      </div>
    </div>
  );
};

Category.layout = "default";

export async function getStaticPaths() {
  return {
    paths: ["/category/history"],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  await dbConnect();

  const { params } = context;

  const topics = await Topic.find({ category_key: params.key });

  return {
    props: {
      categoryKey: params.key,
      topics: JSON.parse(JSON.stringify(topics)),
    },
    revalidate: 15,
  };
};

export default Category;

import config from "@/config";
import { TopicProps } from "@/models/Topic";
import { NextCustomPage } from "@/types/generic";
import { GetServerSidePropsContext } from "next";
import { CategoryCard } from "@/components";
import { useForm } from "react-hook-form";

export type Props = {
  categoryKey: string;
  topics: TopicProps[];
};

const Category: NextCustomPage<Props> = ({ categoryKey, topics }) => {
  const { register, handleSubmit } = useForm<TopicProps>({
    defaultValues: {
      title: "World War I",
      description:
        "Involving all the world’s superpowers, World War I resulted in more than 35 million casualties. In what strange way did the French get troops to the front line? What animals carried messages during the war? Test your knowledge of World War I with this quiz.",
      category_key: "history",
      date: new Date(),
      points: 40,
      time_limit: "30 min",
      attempts: 1,
      questions: [
        {
          question_description:
            "On the event that sparked World War I, The New York Times headline for June 29, 1914, was “HEIR TO AUSTRIA'S THRONE IS” what?",
          answers: ["IMPRISONED", "SLAIN", "CROWNED", "STEPPING DOWN"],
          correct_answer: 1,
        },
        {
          question_description:
            "What caused Great Britain to join World War I?",
          answers: [
            "German troops marching through Belgium",
            "Germans sinking British civilian ships",
            "German bombing raids on London",
            "German use of illegal chemical weapons",
          ],
          correct_answer: 0,
        },
        {
          question_description:
            "What novel way were French troops transported to the First Battle of the Marne, just 30 miles from Paris?",
          answers: [
            "dogsleds",
            "horse-drawn carriages",
            "taxicabs",
            "bicycles",
          ],
          correct_answer: 2,
        },
        {
          question_description:
            "How were aircraft primarily used at the beginning of World War I?",
          answers: [
            "making bomb runs",
            "transporting paratroopers",
            "locating targets for artillery",
            "making supply drops",
          ],
          correct_answer: 2,
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
        Featured Category: {categoryKey}
      </h5>

      <div className="grid mt-[25px] grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full">
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const { topics } = await fetch(
    `${config.baseUrl}/api/topic/${query.key}`
  ).then((res) => res.json());

  return {
    props: {
      categoryKey: query.key,
      topics,
    },
  };
};

export default Category;

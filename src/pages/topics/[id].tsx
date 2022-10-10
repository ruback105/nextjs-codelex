import { TopicProps } from "@/models/Topic";
import { NextCustomPage } from "@/types/generic";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components";

const Topic: NextCustomPage = () => {
  const [topic, setTopic] = useState<TopicProps>();

  const { query } = useRouter();

  useEffect(() => {
    if (query.id) {
      fetch(`/api/topic?id=${query.id}`).then((res) =>
        res.json().then(({ topic }) => setTopic(topic))
      );
    }
  }, [query]);

  type WizardProps = {
    defaultStep?: number;
    children: (step: number) => JSX.Element;
  };

  type WizardStepProps = {
    isActive: boolean;
    children: JSX.Element;
  };

  type WizardQuestionStepProps = {
    isActive: boolean;
    children: (
      selectedAnswer: number,
      setSelectedAnser: Dispatch<SetStateAction<number>>
    ) => JSX.Element;
  };

  const Wizard: FC<WizardProps> & {
    Step: FC<WizardStepProps>;
    QuestionStep: FC<WizardQuestionStepProps>;
  } = ({ defaultStep = 0, children }) => {
    const [step, setStep] = useState(defaultStep);

    return (
      <div className="flex flex-col h-full">
        {children(step)}
        <div className="mt-auto max-w-[200px] ml-auto">
          <Button primary type="button" onClick={() => setStep(step + 1)}>
            Next Step
          </Button>
        </div>
      </div>
    );
  };

  const Step = ({ isActive, children }: WizardStepProps) => {
    if (!isActive) return null;

    return children;
  };

  Wizard.Step = Step;

  const QuestionStep = ({ isActive, children }: WizardQuestionStepProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState(0);

    if (!isActive) return null;

    return children(selectedAnswer, setSelectedAnswer);
  };

  Wizard.QuestionStep = QuestionStep;

  if (!topic) return <>Loading ...</>;

  return (
    <>
      <Wizard>
        {(step) => (
          <>
            <Wizard.Step isActive={step === 0}>
              <div className="flex flex-col">
                <h2 className="font-bold">{topic.title} Quiz</h2>
                <p className="pt-1">Read the following description</p>
                <div className="flex space-x-10 pt-2">
                  <div className="aspect-video min-w-[25vw] bg-slate-300 rounded-[30px]" />
                  <div className="flex flex-col space-y-5 flex-grow">
                    {[
                      {
                        key: "Date:",
                        value: new Date(topic.date).toLocaleDateString(),
                      },
                      { key: "Time Limit:", value: topic.time_limit },
                      { key: "Attempts:", value: topic.attempts },
                      { key: "Points:", value: `${topic.points} Points` },
                    ].map(({ key, value }) => (
                      <div className="flex w-full" key={key}>
                        <p className="font-bold w-1/2">{key}</p>
                        <p className="w-1/2">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <h4 className="pt-2 font-bold">Description</h4>
                <p className="text-xs pt-2">{topic.description}</p>
              </div>
            </Wizard.Step>
            {topic.questions.map(({ answers, question_description }, idx) => (
              <Wizard.QuestionStep
                isActive={idx + 1 === step}
                key={question_description}
              >
                {(selectedAnswer, setSelectedAnswer) => (
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <h2 className="font-bold">{topic.title} Quiz</h2>
                      <h2 className="font-bold">Timer: {topic.time_limit}</h2>
                    </div>
                    <p className="pt-1">Answer the question below</p>
                    <div className="flex space-x-10 pt-2">
                      <div className="aspect-video min-w-[25vw] bg-slate-300 rounded-[30px]" />
                      <div className="flex flex-col space-y-5 flex-grow">
                        <h2 className="font-bold">
                          Question{" "}
                          <span>
                            {step}/{topic.questions.length}
                          </span>
                        </h2>

                        <p className="text-sm">{question_description}</p>
                      </div>
                    </div>
                    <h4 className="pt-2 font-bold">Choose answer</h4>
                    <p className="text-xs pt-4 space-y-6 flex flex-col">
                      {answers.map((answer, idx) => (
                        <div className="flex space-x-3" key={answer}>
                          <input
                            type="radio"
                            checked={idx === selectedAnswer}
                            onClick={() => setSelectedAnswer(idx)}
                          />
                          <p>{answer}</p>
                        </div>
                      ))}
                    </p>
                  </div>
                )}
              </Wizard.QuestionStep>
            ))}
          </>
        )}
      </Wizard>
    </>
  );
};

Topic.layout = "default";

export default Topic;

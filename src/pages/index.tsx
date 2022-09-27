import { NextCustomPage } from "@/types/generic";

const Dashboard: NextCustomPage = () => {
  return (
    <div className="w-full h-full bg-red-700 rounded-[30px]">
      <button
        onClick={() => {
          fetch("http://localhost:3000/api/category", {
            method: "POST",
            body: JSON.stringify({
              title: "New Category",
            }),
          });
        }}
      >
        New
      </button>
      <div className="my-10"></div>
      <button
        onClick={() => {
          fetch("http://localhost:3000/api/category");
        }}
      >
        Get All
      </button>
    </div>
  );
};

Dashboard.layout = "default";

export default Dashboard;

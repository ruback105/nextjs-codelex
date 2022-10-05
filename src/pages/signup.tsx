import { NextCustomPage } from "@/types/generic";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type FormProps = {
  email: string;
  password: string;
};

const SignUp: NextCustomPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      email: "test@email.com",
      password: "",
    },
  });

  useEffect(() => {
    if (session?.user?.email) {
      router.replace("/");
    }
  }, [session]);

  async function onSubmit(formData: FormProps) {
    await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => res.json());
  }

  return (
    <section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
              <div className="mb-6">
                <input
                  {...register("email", {
                    required: true,
                  })}
                  type="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <input
                  {...register("password", {
                    required: true,
                  })}
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <a
                  href="#!"
                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign in
              </button>
            </form>

            <div className="w-full text-center">
              <Link href="/signin">
                <a className="font-bold text-lg">Login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SignUp.layout = "none";

export default SignUp;

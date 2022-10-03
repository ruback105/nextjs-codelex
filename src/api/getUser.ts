import { UserProps } from "@/models/User";

function getUser(email: string): Promise<UserProps> {
  return fetch(`http://localhost:3000/api/user/${email}`).then((res) =>
    res.json()
  );
}

export default getUser;

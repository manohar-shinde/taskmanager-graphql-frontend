import { useQuery } from "@apollo/client/react";
import { GET_ME } from "../graphql/user/queries";
import { getToken } from "../auth/token";

export default function useCurrentUser() {
  return useQuery(GET_ME, {
    skip: !getToken(),
  });
}

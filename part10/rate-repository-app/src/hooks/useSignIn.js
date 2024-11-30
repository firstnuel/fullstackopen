import { useMutation } from "@apollo/client";
import { AUTH_USER } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTH_USER);
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient();
  
    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { credentials: { username, password }} })
        if (data?.authenticate?.accessToken) {
            await authStorage.setAccessToken(data.authenticate.accessToken);
            apolloClient.resetStore();
        }
        return data;

    };
  
    return [signIn, result];
  };

export default useSignIn
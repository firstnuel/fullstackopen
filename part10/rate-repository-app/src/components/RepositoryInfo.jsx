import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { View } from "react-native";
import { useParams } from 'react-router-native';
import { GET_REPO } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import SingleRepository from "./SingleRepository";

const RepositoryInfo = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_REPO, { variables: { repositoryId: id } });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const repo = data?.repository;

    return (
        <View style={{ flex: 1 }}> 
            {repo ? <RepositoryItem item={repo} button={true} /> : <Text>Repository not found</Text>}
            <SingleRepository reviews={repo.reviews} />
        </View>
    );
};

export default RepositoryInfo;

import { useQuery } from "@apollo/client";
import { View, Text, StyleSheet } from "react-native";
import SingleRepository from "./SingleRepository";
import { GET_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

const UserReviews = () => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading</Text>;

  const { me } = data;

  return (
    <View style={styles.container}>
      {me.reviews && <SingleRepository reviews={me.reviews} usrRv />}
    </View>
  );
};

export default UserReviews;

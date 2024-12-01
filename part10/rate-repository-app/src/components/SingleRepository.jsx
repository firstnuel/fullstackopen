import { styles } from "./RepositoryList";
import ReviewItem from "./ReviewItem";
import { FlatList, View } from "react-native";

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = ({ reviews, usrRv=false }) => {
    const reviewsNodes = reviews.edges.map((edge) => edge.node);
  
    return (
      <FlatList
        data={reviewsNodes}
        renderItem={({ item }) => <ReviewItem review={item}  usrRv={usrRv} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
      />
    );
  };
  
  export default SingleRepository;
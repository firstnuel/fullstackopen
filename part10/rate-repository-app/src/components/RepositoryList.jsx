import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import repositories from '../data';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#E1E5E7'

  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
      // other props
    />
  );
};

export default RepositoryList;
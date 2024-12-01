import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({  
  selectedSort,
  setSelectedSort,
  searchKeyword,
  setSearchKeyword,
}) => (
<View style={styles.container}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
    <Picker
    style={styles.pickerContainer}
      selectedValue={selectedSort}
      onValueChange={(value) => setSelectedSort(value)}
      // style={styles.picker}
      mode="dropdown"
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker>
  </View>
);




class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      selectedSort,
      setSelectedSort,
      searchKeyword,
      setSearchKeyword,
    } = this.props;

    return (
      <RepositoryListHeader
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories } = this.props;

    return (
      <FlatList
        data={repositories}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
}



const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const sortOptions = {
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
    highestRated: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    lowestRated: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  };

  const variables = {
    ...sortOptions[selectedSort],
    searchKeyword: debouncedSearchKeyword,
  };

  const { repositories, loading } = useRepositories(variables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSort={selectedSort}
      loading={loading}
      setSelectedSort={setSelectedSort}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};


export default RepositoryList;




export const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E1E5E7',
    height: 10,
  },
  pickerContainer: {
    padding: 8,
    backgroundColor:  '#E1E5E7',
    borderColor: '#E1E5E7',
    fontSize: 16,
  },
  container: {
    padding: 10,
    backgroundColor:  '#E1E5E7',
  },
  searchInput: {
    borderColor: '#E1E5E7',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
});
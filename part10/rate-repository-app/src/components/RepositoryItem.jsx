import { View, Image, StyleSheet} from 'react-native';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 3,
    },
    logo: {
      width: 66,
      height: 58,
      flex: 0
    },
    repoInfo: {
        flexDirection: 'row',
        gap: 15,
        margin: 12, 
    },
    textInfo: {
        gap: 10,
        flex: 1,
    },
    langStyle: {
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        color: 'white',
        fontSize: 15
    },
    ratings: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        margin: 12, 
        justifyContent: 'space-around',
    },
    ratingItems: {
        alignItems: 'center',
        gap: 10,
    },
  });

const RepositoryItem = ({ item }) => {
    return (
        <View>
            <View style={styles.repoInfo}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }}/>
                <View style={styles.textInfo}>
                    <Text fontSize='subheading' fontWeight='bold'> {item.fullName} </Text>
                    <Text  color='textSecondary' fontSize='body' >{item.description} </Text>
                    <Text style={styles.langStyle}>{item.language}</Text>
                </View>
            </View>

            <View style={styles.ratings}>
                <RatingElement name='Stars' count={item.stargazersCount} />
                <RatingElement name='Forks' count={item.forksCount} />
                <RatingElement name='Reviews' count={item.reviewCount} />
                <RatingElement name='Rating' count={item.ratingAverage} />
            </View>
        </View>
    );
};

export default RepositoryItem;


const RatingElement = ({ name, count }) => {
    return (
    <View style={styles.ratingItems} >
        <Text                      
            fontWeight='bold' 
            fontSize='body' >
            {
            count > 1000
            ? `${(count/1000).toFixed(1)}k`
            : count
            }
        </Text>
        <Text fontSize='body' color='textSecondary'>{name}</Text>
    </View>
    )
};
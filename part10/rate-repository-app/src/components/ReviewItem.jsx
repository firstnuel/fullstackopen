import { View , StyleSheet, Pressable, Alert } from "react-native"
import Text from "./Text"
import { formatDate } from "../utils/formatDate"
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { GET_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";

const ReviewItem = ({ review, usrRv=false }) => {

  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_USER, variables: { includeReviews: true } }],
  });

  const handleViewRepository = () => {
    navigate(`/repo/${review.repository.id}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: review.id } });
            } catch (e) {
              console.error(e);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

    return (
        <View>
          <View style={styles.container}>
            <View style={styles.rating} >
                <Text fontWeight="bold" style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View  style={styles.reviewInfo}>
                <Text fontSize="subheading" fontWeight="bold">
                    { usrRv ? 
                    `${review.repository.ownerName}/${review.repository.name}`
                    : review.user.username
                    } </Text>
                <Text fontWeight="bold" color="textSecondary">{formatDate(review.createdAt)}</Text>
                <Text fontSize="body" color="body" style={{ flexShrink: 1 }}>{review.text}</Text>
            </View>
          </View>
          {usrRv && 
            (<View style={styles.buttonContainer}>
                <Pressable onPress={handleViewRepository} style={styles.blueButton} >
                    <Text style={styles.buttonText}>View Repository</Text>
                </Pressable>

                <Pressable onPress={handleDeleteReview} style={styles.redButton}  >
                    <Text style={styles.buttonText}>Delete Repository</Text>
                </Pressable>
            </View>
            )}
        </View>
    )
};

export default ReviewItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 12,
        gap: 10,
    },
    rating: {
        borderWidth: 2,
        borderColor: '#235C97',
        borderRadius: 50, 
        width: 50,      
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    ratingText: {
        color: '#235C97',
        fontSize: 20,
        textAlign: 'center',
    },
    reviewInfo: {
        flexDirection: 'column',
        gap: 10,
        flex: 1
    },
    blueButton: {
        alignItems: 'center',
        backgroundColor: '#0065D3',
        borderRadius: 4,
        height: 50,
        justifyContent: 'center',
        width: '48%',
    },
    redButton: {
        alignItems: 'center',
        backgroundColor: '#D32F2F',
        borderRadius: 4,
        height: 50,
        justifyContent: 'center',
        width: '48%',
    },
        buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
        buttonContainer: {
        flexDirection: 'row',
        margin: 10,
        gap: 10,
        justifyContent: 'center'
    }
});

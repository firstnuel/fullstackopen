import { View, TextInput, Pressable } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { styles } from './SignIn';
import { CREATE_REVIEW, GET_REPO } from '../graphql/mutations';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    name: yup
      .string()
      .required('name is required'),
    rating: yup
      .number()
      .min(0, 'Rating can not be less than 0')
      .max(100, 'Rating can not be less than 100')
      .required('Rating is required'),
    review: yup
      .string(),
  });


export const ReviewContainer = ({ onSubmit, error }) => {
    const formik = useFormik({
      initialValues: {
        username: '',
        name: '',
        rating: 0,
        review: '',
      },
      validationSchema,
      onSubmit,
    });
  
    return (
      <View style={styles.container}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TextInput
          testID="usernameInput"
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          style={styles.input}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
  
        <TextInput
          testID="nameInput"
          placeholder="Name"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          style={styles.input}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.errorText}>{formik.errors.name}</Text>
        )}

        <TextInput
          testID="ratingInput"
          placeholder="Rating"
          value={formik.values.rating}
          onChangeText={(text) => {
            const numericValue = parseInt(text, 10);
            formik.setFieldValue('rating', isNaN(numericValue) ? '' : numericValue);
          }}
          onBlur={formik.handleBlur('rating')}
          style={styles.input}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={styles.errorText}>{formik.errors.rating}</Text>
        )}

        <TextInput
          testID="reviewInput"
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          onBlur={formik.handleBlur('review')}
          style={styles.input}
          multiline
        />
        {formik.touched.review && formik.errors.review && (
          <Text style={styles.errorText}>{formik.errors.review}</Text>
        )}
  
        <Pressable 
          testID="submitButton"
          onPress={formik.handleSubmit} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create a review</Text>
        </Pressable>
      </View>
    );
  };

const ReviewForm = () => {
    const [mutate] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();
    const [error, setError] = useState(null)
  
    const handleSubmit = async (values) => {
        const { username, name, rating, review } = values;

        try {
          const { data } = await mutate({
            variables: { review: { ownerName: username, repositoryName: name, rating, text: review } },
            refetchQueries: [
              {
                query: GET_REPO,
                variables: { repositoryId: `${username}.${name}` },
              },
            ],
          });
      
          if (data && data.createReview) {
            navigate(`/repo/${username}.${name}`);
            setError(null); 
          }
        } catch (err) {
          setError(err.message || 'An error occurred while submitting the review');
        }
      };
      
  
    return( <ReviewContainer onSubmit={handleSubmit} error={error} />);
  };
  
export default ReviewForm;
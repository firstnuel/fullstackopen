import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../../components/SignIn';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // Create a mock function to verify form submission
      const onSubmit = jest.fn();

      // Render the SignInContainer with the mock onSubmit
      render(<SignInContainer onSubmit={onSubmit} />);

      // Find input fields and submit button
      const usernameInput = screen.getByTestId('usernameInput');
      const passwordInput = screen.getByTestId('passwordInput');
      const submitButton = screen.getByTestId('submitButton');

      // Simulate user input
      fireEvent.changeText(usernameInput, 'kalle');
      fireEvent.changeText(passwordInput, 'password');

      // Simulate form submission
      fireEvent.press(submitButton);

      // Wait for onSubmit to be called
      await waitFor(() => {
        // Check that onSubmit was called once
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Check the arguments passed to onSubmit
        expect(onSubmit).toHaveBeenCalledWith(
          {
            username: 'kalle',
            password: 'password'
          },
          expect.anything() // Formik provides additional arguments we can ignore
        );
      });
    });
  });
});
import React from 'react';
import { render, fireEvent, getByTestId, screen , waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Profilecard from '../Components/succ_login/profilecard';




test('clicking log out button removes token', () => {
    const { getByTestId } = render(<Profilecard />);
    const logoutButton = getByTestId('logout-button');
  
    fireEvent.click(logoutButton);
  
    expect(sessionStorage.getItem('sometoken')).toBeNull();
  });
  
  test('should find the Edit button via testid', () => {

    const {getByTestId} = render(<Profilecard/>);
    const testIdName = 'Edit Button';
    const foundEditButton = getByTestId(testIdName);

    expect(foundEditButton).toBeTruthy();
  });

  test('clicking Edit button sets isEditing state to true', () => {
    const { getByTestId } = render(<Profilecard />);
    const editButton = getByTestId('Edit Button');
  
    fireEvent.click(editButton);
  
    expect(screen.getByPlaceholderText('Enter Mobile Number')).toBeEnabled();
  });
  
  test('clicking Edit button enables phone number input field', () => {
    const { getByTestId, getByPlaceholderText } = render(<Profilecard />);
    const editButton = getByTestId('Edit Button');
    const phoneNumberInput = getByPlaceholderText('Enter Mobile Number');
  
    fireEvent.click(editButton);
  
    expect(phoneNumberInput).toBeEnabled();
  });
  
  test('renders Save button when isEditing state is true', () => {
    const { getByTestId } = render(<Profilecard />);
    const editButton = getByTestId('Edit Button');
  
    fireEvent.click(editButton);
  
    const saveButton = screen.getByRole('button', { name: /Save/i });
    expect(saveButton).toBeInTheDocument();
  });
  
  test('updates phoneNumber state when input field value changes', () => {
    const { getByPlaceholderText } = render(<Profilecard />);
    const phoneNumberInput = getByPlaceholderText('Enter Mobile Number');
  
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
  
    expect(phoneNumberInput.value).toBe('1234567890');
  });
  
  test('displays error message in red text when there is an error', () => {
    const mockErrorMessage = '(Please enter a valid 10-digit phone number.)';
    const { getByText, getByPlaceholderText, getByTestId } = render(<Profilecard />);
    
    // Make sure the error message is not displayed initially
    expect(() => getByText(mockErrorMessage)).toThrow();
  
    // Enable edit mode
    const editButton = getByTestId('Edit Button');
    fireEvent.click(editButton);
  
    // Change phone number input to an invalid value
    const phoneNumberInput = getByPlaceholderText('Enter Mobile Number');
    fireEvent.change(phoneNumberInput, { target: { value: '123' } });
  
    // Submit the form
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
  
    // Make sure the error message is displayed in red text
    const errorMessage = getByText(mockErrorMessage);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle('color: red');
  });
  
  test('handles phone number submit correctly', async () => {
    const mockResponse = { data: { message: 'Phone number updated successfully' } };
    axios.post.mockResolvedValue(mockResponse);

    render(<Profilecard />);

    // Click the Edit button to enable editing mode
    const editButton = screen.getByTestId('Edit Button');
    fireEvent.click(editButton);

    // Enter a new phone number
    const phoneInput = screen.getByPlaceholderText('Enter Mobile Number');
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    // Click the Save button to submit the updated phone number
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Check that the axios.post method was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith('/profile3', { phoneNumber: '1234567890' });

    // Check that the isEditing state is set back to false
    // expect(screen.getByTestId('Edit Button')).toBeInTheDocument();
    // expect(screen.getByText('Edit')).toBeInTheDocument();

  });

  
  jest.mock('axios');

test('renders User details correctly', async () => {
      const testData = { 
        email: "rithviksharma2002@gmail.com",
        name: "Kondapalkala Rithvik",
        phone: "9390263348",
        photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
        
    };
      axios.get.mockResolvedValue({ data: testData });
      render(<Profilecard />);
      
    await waitFor(() => expect(screen.getByTestId('name-display')).toHaveTextContent('Kondapalkala Rithvik'));
    await waitFor(() => expect(screen.getByTestId('email-display')).toHaveTextContent('rithviksharma2002@gmail.com'));
    await waitFor(() => expect(screen.getByPlaceholderText('Enter Mobile Number').value).toMatch('9390263348'));
    await waitFor(() => expect(screen.getByTestId('photo-display')).toHaveAttribute('src','https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c'));

    });


  
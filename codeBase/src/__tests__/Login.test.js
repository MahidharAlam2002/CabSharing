import { render, screen } from '@testing-library/react'
import Login from '../Components/Login';

test("login page test case", () => {
    render(<Login/>);

    const button = screen.getByRole('button', {name: /Sign In With IITH Google Account/i});


    
    expect(button).toBeInTheDocument();
})
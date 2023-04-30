import { render, screen } from '@testing-library/react';
import NavBar from '../Components/succ_login/NavBar';

test("user navbar test case", () => {
    render(<NavBar/>);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const mybookingsLink = screen.getByRole('link', { name: 'My Bookings' });
    const profileLink = screen.getByRole('link', { name: 'My Profile' });


    expect(homeLink).toBeInTheDocument();
    expect(mybookingsLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();

});
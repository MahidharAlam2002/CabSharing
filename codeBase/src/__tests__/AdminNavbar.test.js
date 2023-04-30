import { render, screen } from '@testing-library/react';
import AdminNavbar from '../Components/succ_login/AdminNavbar';

test("admin navbar test case", () => {
    render(<AdminNavbar/>);

    const schedulesLink = screen.getByRole('link', { name: 'Schedules List' });
    const usersLink = screen.getByRole('link', { name: 'Users List' });
    const placesLink = screen.getByRole('link', { name: 'Edit Start & End Places' });
    const profileLink = screen.getByRole('link', { name: 'My Profile' });


    expect(schedulesLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(placesLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();

});
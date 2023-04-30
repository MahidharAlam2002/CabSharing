import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import AdminUsers from '../Components/succ_login/adminUsers';

jest.mock('axios');

test("admin users page test case",async () => {

    const users = [ {google_id: '1', name: 'name1', email: 'email1', phone: 'phone1'}, {google_id: '2', name: 'name2', email: 'email2', phone: 'phone2'}]
    const response = {data: users};
    
    axios.get.mockResolvedValue(response);
    
    
    await act(() => {
        render(<AdminUsers/>);
    });

    const rows = screen.getAllByRole('row');


    const deleteButtons = screen.getAllByRole('button', {name: 'Delete This User'});

    expect(deleteButtons.length).toBe(2);
    expect(rows.length).toBe(3);

});

test("admin users page, empty data axios.get() test case",async () => {

    const response = {data: ""};

    const spy = jest.spyOn(console, 'log');
    
    axios.get.mockResolvedValue(response);
    
    
    await act(() => {
        render(<AdminUsers/>);
    });

    const rows = screen.getAllByRole('row');



    expect(spy).toHaveBeenCalledWith('users data not retrieved yet.');
    spy.mockRestore();

    expect(rows.length).toBe(1);

});


test("Delete This User button ON CLICK", async () => {
    const users = [ {google_id: '1', name: 'name1', email: 'email1', phone: 'phone1'}];
    const response = {data: users};
    const postResponse = {data: 'post response'};
    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(postResponse);
    const spy = jest.spyOn(console, 'log');

    // const onClickMock = jest.fn();
    
    await act(() =>{
        render(<AdminUsers />);
    });

    await act(() =>{
        fireEvent.click(screen.getByRole('button', {name: 'Delete This User'}));
    });

    // expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('post response');
    spy.mockRestore();
});

test("Delete This User button ON CLICK && EMPTY POST RESPONSE", async () => {
    const users = [{google_id: '1', name: 'name1', email: 'email1', phone: 'phone1'}];
    const response = {data: users};
    const postResponse = {data: ''};

    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(postResponse);
    const spy = jest.spyOn(console, 'log');
    
    // const onClickMock = jest.fn();
    
    await act(() =>{
        render(<AdminUsers />);
    });


    await act(() =>{
        fireEvent.click(screen.getByRole('button', {name: 'Delete This User'}));
    });

    // expect(onClickMock).toHaveBeenCalledTimes(1);

    expect(spy).toHaveBeenCalledWith('user data not sent yet.');
    spy.mockRestore();
});
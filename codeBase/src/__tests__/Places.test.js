import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import Places from '../Components/succ_login/Places';

jest.mock('axios');

test("admin Places page test case",async () => {

    const places = [ {place_name: 'place1'}, {place_name: 'place2'}];
    const response = {data: places};
    
    axios.get.mockResolvedValue(response);
    
    
    await act(() => {
        render(<Places/>);
    });

    const rows = screen.getAllByRole('row');


    const deleteButtons = screen.getAllByRole('button', {name: 'Remove This Place'});
    const submitButton = screen.getByRole('button', {name: 'Add This Place To The Allowed List'})

    expect(deleteButtons.length).toBe(2);
    expect(rows.length).toBe(3);
    expect(submitButton).toBeInTheDocument();

});

test("admin Places page, empty data axios.get() test case",async () => {

    const response = {data: ""};

    const spy = jest.spyOn(console, 'log');
    
    axios.get.mockResolvedValue(response);
    
    
    await act(() => {
        render(<Places/>);
    });

    const rows = screen.getAllByRole('row');

    const submitButton = screen.getByRole('button', {name: 'Add This Place To The Allowed List'})


    expect(spy).toHaveBeenCalledWith('places data not retrieved yet.');
    spy.mockRestore();

    expect(rows.length).toBe(1);
    expect(submitButton).toBeInTheDocument();

});

test("Remove This Place button ON CLICK", async () => {
    const places = [ {place_name: 'place1'}];
    const response = {data: places};
    const postResponse = {data: 'post response'};
    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(postResponse);
    const spy = jest.spyOn(console, 'log');

    // const onClickMock = jest.fn();
    
    await act(() =>{
        render(<Places />);
    });

    await act(() =>{
        fireEvent.click(screen.getByRole('button', {name: 'Remove This Place'}));
    });

    // expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('post response');
    spy.mockRestore();
});

test("Remove This Place button ON CLICK && EMPTY POST RESPONSE", async () => {
    const places = [ {place_name: 'place1'}];
    const response = {data: places};
    const postResponse = {data: ''};

    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(postResponse);
    const spy = jest.spyOn(console, 'log');
    
    // const onClickMock = jest.fn();
    
    await act(() =>{
        render(<Places />);
    });


    await act(() =>{
        fireEvent.click(screen.getByRole('button', {name: 'Remove This Place'}));
    });

    // expect(onClickMock).toHaveBeenCalledTimes(1);

    expect(spy).toHaveBeenCalledWith('place data not sent yet.');
    spy.mockRestore();
});
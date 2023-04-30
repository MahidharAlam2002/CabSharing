import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import AdminSchedules from '../Components/succ_login/adminSchedules';

jest.mock('axios');

test("admin schedules page test case",async () => {

    const schedules = [ {schedule_id: '1', start_plcae: 'iith', end_place: 'iit', date: 'date', time: 'time'}, {schedule_id: '2', start_plcae: 'iit2', end_place: 'iit2', date: 'date2', time: 'time2'}]
    const response = {data: schedules};
    
    axios.get.mockResolvedValue(response);
    
    
    await act(() => {
        render(<AdminSchedules/>);
    });

    const rows = screen.getAllByRole('row');

    const deleteButtons = screen.getAllByRole('button', {name: 'Delete This Schedule'});

    expect(deleteButtons.length).toBe(2);

    expect(rows.length).toBe(3);

});


test("admin schedules page, empty data axios.get() test case",async () => {

    const response = {data: ""};

    const spy = jest.spyOn(console, 'log');
    
    axios.get.mockResolvedValue(response);
    
    
    await act(() => {
        render(<AdminSchedules/>);
    });

    const rows = screen.getAllByRole('row');



    expect(spy).toHaveBeenCalledWith('schedules data not retrieved yet.');
    spy.mockRestore();

    expect(rows.length).toBe(1);

});


test("Delete This Schedule button ON CLICK", async () => {
    const schedules = [ {schedule_id: '1', start_plcae: 'iith', end_place: 'iit', date: 'date', time: 'time'} ];
    const response = {data: schedules};
    const postResponse = {data: 'post response'};
    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(postResponse);
    const spy = jest.spyOn(console, 'log');

    // const onClickMock = jest.fn();
    
    await act(() =>{
        render(<AdminSchedules />);
    });

    await act(() =>{
        fireEvent.click(screen.getByRole('button', {name: 'Delete This Schedule'}));
    });

    // expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('post response');
    spy.mockRestore();
});

test("Delete This Schedule button ON CLICK && EMPTY POST RESPONSE", async () => {
    const schedules = [{schedule_id: '1', start_plcae: 'iith', end_place: 'iit', date: 'date', time: 'time'}];
    const response = {data: schedules};
    const postResponse = {data: ''};

    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(postResponse);
    const spy = jest.spyOn(console, 'log');
    
    // const onClickMock = jest.fn();
    
    await act(() =>{
        render(<AdminSchedules />);
    });


    await act(() =>{
        fireEvent.click(screen.getByRole('button', {name: 'Delete This Schedule'}));
    });

    // expect(onClickMock).toHaveBeenCalledTimes(1);

    expect(spy).toHaveBeenCalledWith('schedule data not sent yet.');
    spy.mockRestore();
});
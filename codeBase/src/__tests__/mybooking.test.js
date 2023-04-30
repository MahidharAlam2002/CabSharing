
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import MyBooking from '../Components/succ_login/myBookings';
import axios from 'axios';
import {act} from 'react-dom/test-utils'
jest.mock('axios');
test('my booking ',async()=>{
    axios.get.mockResolvedValue([{
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Unjoin",
        time: "2023-04-30T10:59:00.000Z"
    }]);
    act(()=>{render(<MyBooking/>);});
    
    // await expect(screen.getByTestId('TbUB')).toBeInTheDocument();
    // await expect(screen.getByTestId('TbPB')).toBeInTheDocument();

})
test('my booking  on click Upcoming',async()=>{
    axios.get.mockResolvedValue([{
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Unjoin",
        time: "2023-04-30T10:59:00.000Z"
    }]);
    render(<MyBooking/>);
    await userEvent.click(screen.getByTestId('btnUpcomingBooking'));
   

})
test('my booking  on click pastBooking',async()=>{
    axios.get.mockResolvedValue([{
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Unjoin",
        time: "2023-04-30T10:59:00.000Z"
    }]);
    act(()=>{render(<MyBooking/>);})
    await userEvent.click(screen.getByTestId('btnPastBooking'));
   

})


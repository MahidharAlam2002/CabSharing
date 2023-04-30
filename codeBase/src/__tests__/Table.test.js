import { render, screen } from '@testing-library/react'
import TableUI from '../Components/succ_login/Table';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
jest.mock('axios');
import {act} from 'react-dom/test-utils'
test('Table element with confirmbutton and status unjoin',async()=>{
    const mockdata=[{
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Unjoin",
        time: "2023-04-30T10:59:00.000Z"
    }];
    const mockHandleSearch=jest.fn();
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const MockshowCount=true;
    const MockshowStatus=true;
    axios.get.mockResolvedValue(true);
    await act(()=>{render(<TableUI data={mockdata} handleSearch={mockHandleSearch} profileDetails={mockProfileDetails} showStatus={MockshowStatus} showCount={MockshowCount}/>)})
    
    const tableui=screen.getByTestId('TableTableUI');
    expect(tableui).toBeInTheDocument();
    await act(()=>{ userEvent.click(screen.getByTestId('btnJoinTabletest'))})
    const indexjoin=screen.getByTestId('indexjoin');
    expect(indexjoin).toBeInTheDocument();
    await act(()=>{ userEvent.click(screen.getByTestId('joinConfirmBtn'))})
    

})  
test('Table element ',async()=>{
    const mockdata=[{
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Unjoin",
        time: "2023-04-30T10:59:00.000Z"
    }];
    const mockHandleSearch=jest.fn();
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const MockshowCount=true;
    const MockshowStatus=true;
    axios.get.mockResolvedValue(true);
    await act(()=>{render(<TableUI data={mockdata} handleSearch={mockHandleSearch} profileDetails={mockProfileDetails} showStatus={MockshowStatus} showCount={MockshowCount}/>)}) 
    const tableui=screen.getByTestId('TableTableUI');
    expect(tableui).toBeInTheDocument();
    await act(()=>{userEvent.click(screen.getByTestId('btnJoinTabletest'))}); 
    const indexjoin=screen.getByTestId('indexjoin');
    expect(indexjoin).toBeInTheDocument();
    await act(()=>{userEvent.click(screen.getByTestId('joinCancelBtn'))}) 
    
    
})  
test('Table element with confirm button with status join ',async()=>{
    const mockdata=[{
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Join",
        time: "2023-04-30T10:59:00.000Z"
    }];
    const mockHandleSearch=jest.fn();
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const MockshowCount=true;
    const MockshowStatus=true;
    // 
    // const users = [{name: 'Bob'}];
    // const resp = {data: users};
    // axios.get=jest.fn();
    axios.get.mockResolvedValue(true);
    const mockData = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ];
    
     
     
    // axios.get.mockResolvedValueOnce({ data: mockData });
    //   console.log(axios.get);
    await act(()=>{render(<TableUI data={mockdata} handleSearch={mockHandleSearch} profileDetails={mockProfileDetails} showStatus={MockshowStatus} showCount={MockshowCount}/>)})
        
    const tableui=screen.getByTestId('TableTableUI');
    expect(tableui).toBeInTheDocument();
    
    
    await  act(()=>{userEvent.click(screen.getByTestId('btnJoinTabletest'))})
    const indexjoin=screen.getByTestId('indexjoin');
    expect(indexjoin).toBeInTheDocument();
    await act(()=>{userEvent.click(screen.getByTestId('joinConfirmBtn'))})
   
    
}) 


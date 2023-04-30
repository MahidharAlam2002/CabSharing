import TableTest from "../Components/succ_login/Tabletest";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';


//with props 
test("TableTest Element is being shown for showstatus element true with join status",async()=>{
    const mockrow={
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Join",
        time: "2023-04-30T10:59:00.000Z"
    }
    const mockHandleStatusClick=jest.fn();
    const mockindex=1;
    const MockshowCount=true;
    const MockshowStatus=true;
    render(<TableTest row={mockrow} handleStatusClick={mockHandleStatusClick} index={mockindex} showStatus={MockshowStatus} showCount={MockshowCount}  />)
    const btn=screen.getByTestId('btnTableTestUpDown');
    expect(btn).toBeInTheDocument();
    const rowdata=screen.getByTestId('divRowData');
    expect(rowdata).toBeInTheDocument();
    const btnJoin=screen.getByTestId('btnJoinTabletest');
    expect(btnJoin).toBeInTheDocument();
    expect(btnJoin).toHaveTextContent('Join')
    await userEvent.click(btnJoin);
    expect(mockHandleStatusClick).toHaveBeenCalled();
   
    await userEvent.click(btn);
    const tabledata=screen.getByTestId('TablePassengersTestTable');
    expect(tabledata).toBeInTheDocument();
    const listPass=screen.getAllByTestId('listpassTableTest');
    expect(listPass.length).toBe(1);
    expect(listPass[0]).toHaveTextContent('8688445200')
 })
 test("TableTest Element is being shown for showstatus element true with unjoin",async()=>{
    const mockrow={
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Unjoin",
        time: "2023-04-30T10:59:00.000Z"
    }
    const mockHandleStatusClick=jest.fn();
    const mockindex=1;
    const MockshowCount=true;
    const MockshowStatus=true;
    render(<TableTest row={mockrow} handleStatusClick={mockHandleStatusClick} index={mockindex} showStatus={MockshowStatus} showCount={MockshowCount}  />)
    const btn=screen.getByTestId('btnTableTestUpDown');
    expect(btn).toBeInTheDocument();
    const rowdata=screen.getByTestId('divRowData');
    expect(rowdata).toBeInTheDocument();
    const btnJoin=screen.getByTestId('btnJoinTabletest');
    expect(btnJoin).toBeInTheDocument();
    expect(btnJoin).toHaveTextContent('Unjoin')
    await userEvent.click(btnJoin);
    expect(mockHandleStatusClick).toHaveBeenCalled();
   
    await userEvent.click(btn);
    const tabledata=screen.getByTestId('TablePassengersTestTable');
    expect(tabledata).toBeInTheDocument();
    const listPass=screen.getAllByTestId('listpassTableTest');
    expect(listPass.length).toBe(1);
    expect(listPass[0]).toHaveTextContent('8688445200')
 })
 test("TableTest Element is being shown for showstatus element false",async()=>{
    const mockrow={
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[{\"name\": \"Varahasai Gnaneswar\", \"phone_number\": \"8688445200\"}]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Join",
        time: "2023-04-30T10:59:00.000Z"
    }
    const mockHandleStatusClick=jest.fn();
    const mockindex=1;
    const MockshowCount=false;
    const MockshowStatus=false;
    render(<TableTest row={mockrow} handleStatusClick={mockHandleStatusClick} index={mockindex} showStatus={MockshowStatus} showCount={MockshowCount}  />)
    
    const rowdata=screen.getByTestId('divRowData');
    expect(rowdata).toBeInTheDocument();

    
   
   
    

 })
 test("TableTest Element is being shown for showstatus  element true with empty list",async()=>{
    const mockrow={
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[[]]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Join",
        time: "2023-04-30T10:59:00.000Z"
    }
    const mockHandleStatusClick=jest.fn();
    const mockindex=1;
    const MockshowCount=true;
    const MockshowStatus=true;
    render(<TableTest row={mockrow} handleStatusClick={mockHandleStatusClick} index={mockindex} showStatus={MockshowStatus} showCount={MockshowCount}  />)
    const btn=screen.getByTestId('btnTableTestUpDown');
    expect(btn).toBeInTheDocument();
    const rowdata=screen.getByTestId('divRowData');
    expect(rowdata).toBeInTheDocument();
    const btnJoin=screen.getByTestId('btnJoinTabletest');
    expect(btnJoin).toBeInTheDocument();
    expect(btnJoin).toHaveTextContent('Join')
    await userEvent.click(btnJoin);
    expect(mockHandleStatusClick).toHaveBeenCalled();
   
    await userEvent.click(btn);
    const tabledata=screen.getByTestId('TablePassengersTestTable');
    expect(tabledata).toBeInTheDocument();
    
    
    
 })

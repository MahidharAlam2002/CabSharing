import { render,screen } from "@testing-library/react";
import JoinDialoguebox from "../Components/succ_login/JoinDialoguebox";
import userEvent from "@testing-library/user-event";
import {act} from 'react-dom/test-utils'
test("Join dailoguebox elements",async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockrow={
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[[]]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Unjoin",
        time: "2023-04-30T10:59:00.000Z"
    }
    const mockindex=0;
    const mockstatus=mockrow.status;
    const mockconfirmbtn=jest.fn();
    const mockcancelbtn=jest.fn();
    act(()=>{render( <JoinDialoguebox profileDetails={mockProfileDetails} row={mockrow} index={mockindex} status={mockstatus} confirmButton={mockconfirmbtn} cancelButton={mockcancelbtn} /> )})
    expect(screen.getByTestId('profilenamejoinDB')).toHaveTextContent('Kondapalkala Rithvik')
   
    
})
test("Join dailoguebox testconfirm btn",async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockrow={
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[[]]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Join",
        time: "2023-04-30T10:59:00.000Z"
    }
    const mockindex=0;
    const mockstatus=mockrow.status;
    const mockconfirmbtn=jest.fn();
    const mockcancelbtn=jest.fn();
    act(()=>{render( <JoinDialoguebox profileDetails={mockProfileDetails} row={mockrow} index={mockindex} status={mockstatus} confirmButton={mockconfirmbtn} cancelButton={mockcancelbtn} /> )})
    expect(screen.getByTestId('profilenamejoinDB')).toHaveTextContent('Kondapalkala Rithvik')
    await act(()=>{ userEvent.click(screen.getByTestId('joinConfirmBtn'))})
    expect(mockconfirmbtn).toHaveBeenCalled();
    
})
test("Join dailoguebox testcancel btn",async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockrow={
        date: "2023-04-29T18:30:00.000Z",
        end_place: "Rajiv Gandhi International Airport",
        listofpassengers: "[[]]",
        schedule_id: "1.9485705490732914e38",
        start_place: "IIT Hyderabad",
        status: "Join",
        time: "2023-04-30T10:59:00.000Z"
    }
    const mockindex=0;
    const mockstatus=mockrow.status;
    const mockconfirmbtn=jest.fn();
    const mockcancelbtn=jest.fn();
    act(()=>{render( <JoinDialoguebox profileDetails={mockProfileDetails} row={mockrow} index={mockindex} status={mockstatus} confirmButton={mockconfirmbtn} cancelButton={mockcancelbtn} /> )})
    expect(screen.getByTestId('profilenamejoinDB')).toHaveTextContent('Kondapalkala Rithvik')
    await act(()=>{ userEvent.click(screen.getByTestId('joinCancelBtn'))})
    expect(mockcancelbtn).toHaveBeenCalled();
    
})
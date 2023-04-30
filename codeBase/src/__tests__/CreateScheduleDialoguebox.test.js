import { render, screen,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';
import CreateScheduleDialoguebox from '../Components/succ_login/CreateScheduleDialoguebox';
import axios from 'axios';
jest.mock('axios');
test('CreateScheduleDialogue Box elements ',()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{value:"IIT Hyderabad",label:"IIT Hyderabad"}]
    const mockValuelist=jest.fn();
    
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    expect(screen.getByTestId('FromDropDownCSDB')).toBeInTheDocument();
    expect(screen.getByTestId('ToDropDownCSDB')).toBeInTheDocument();
    expect(screen.getByTestId('inputdateCSDB')).toBeInTheDocument();
    expect(screen.getByTestId('inputtimeCSDB')).toBeInTheDocument();
})
test('CreateScheduleDialogue Box click cancel button',async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{value:"IIT Hyderabad",label:"IIT Hyderabad"}]
    const mockValuelist=jest.fn();
    
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    await userEvent.click(screen.getByTestId('CancelBtnCSDB'));
    
})
test('CreateScheduleDialogue Box click confirm button with null schedules',async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{value:"IIT Hyderabad",label:"IIT Hyderabad"}]
    const mockValuelist=jest.fn();
    
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    await userEvent.click(screen.getByTestId('ConfirmBtnCSDB'));
    
})

test('CreateScheduleDialogue Box click confirm button with startplace and endplace are same schedules',async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{label: "IIT Hyderabad",value:"IIT Hyderabad"},{label: "JBS Bus Stand",value: "JBS Bus Stand"}]
    const mockValuelist=jest.fn((jsonList)=>{
        const values=[]
        if(jsonList["value"]!==undefined)
        {
          values.push(jsonList["value"]);
        }
        else{
          jsonList.forEach(obj => {
            if (obj["value"]) {
              values.push(obj["value"]);
            }
          });
        }
       
        return values;
      })
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    const FromDropdown =screen.getByTestId('FromDropDownCSDB');
    const ToDropdown=screen.getByTestId('ToDropDownCSDB');
    const dateinput=screen.getByTestId('inputdateCSDB');
    const timeinput=screen.getByTestId('inputtimeCSDB');
   
    const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[0];
    await act(()=>{userEvent.click(handleinputclicktest);})
    const onitemclicktest=screen.getAllByTestId("onitemclickcheck");
    console.log(onitemclicktest[0]);
    await act(()=>{userEvent.click(onitemclicktest[0]);})
    const handleinputclicktest2=screen.getAllByTestId("handleinputclickcheck")[1];
    await act(()=>{userEvent.click(handleinputclicktest2);})
    const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[0];
    
    await userEvent.click(onitemclicktest2);
    console.log(onitemclicktest2)
    await fireEvent.change(dateinput, { target: { value: '2002-02-02' } });
    await fireEvent.change(timeinput, { target: { value: '23:00' } });
    await userEvent.click(screen.getByTestId('ConfirmBtnCSDB'));
})
test('CreateScheduleDialogue Box click confirm button with startplace and endplace are different schedules',async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{label: "IIT Hyderabad",value:"IIT Hyderabad"},{label: "JBS Bus Stand",value: "JBS Bus Stand"}]
    const mockValuelist=jest.fn((jsonList)=>{
        const values=[]
        if(jsonList["value"]!==undefined)
        {
          values.push(jsonList["value"]);
        }
        else{
          jsonList.forEach(obj => {
            if (obj["value"]) {
              values.push(obj["value"]);
            }
          });
        }
       
        return values;
      })
      
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    const FromDropdown =screen.getByTestId('FromDropDownCSDB');
    const ToDropdown=screen.getByTestId('ToDropDownCSDB');
    const dateinput=screen.getByTestId('inputdateCSDB');
    const timeinput=screen.getByTestId('inputtimeCSDB');
   
    const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[0];
    await act(()=>{userEvent.click(handleinputclicktest);})
    const onitemclicktest=screen.getAllByTestId("onitemclickcheck");
    console.log(onitemclicktest[0]);
    await act(()=>{userEvent.click(onitemclicktest[0]);})
    const handleinputclicktest2=screen.getAllByTestId("handleinputclickcheck")[1];
    await act(()=>{userEvent.click(handleinputclicktest2);})
    const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[1];
    
    await userEvent.click(onitemclicktest2);
    // console.log(onitemclicktest2)
    await fireEvent.change(dateinput, { target: { value: '2002-02-02' } });
    await fireEvent.change(timeinput, { target: { value: '23:00' } });
    await userEvent.click(screen.getByTestId('ConfirmBtnCSDB'));
})
test('CreateScheduleDialogue Box click confirm button with startplace and endplace are different schedules BUT past booking',async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{label: "IIT Hyderabad",value:"IIT Hyderabad"},{label: "JBS Bus Stand",value: "JBS Bus Stand"}]
    const mockValuelist=jest.fn((jsonList)=>{
        const values=[]
        if(jsonList["value"]!==undefined)
        {
          values.push(jsonList["value"]);
        }
        else{
          jsonList.forEach(obj => {
            if (obj["value"]) {
              values.push(obj["value"]);
            }
          });
        }
       
        return values;
      })
      
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    const FromDropdown =screen.getByTestId('FromDropDownCSDB');
    const ToDropdown=screen.getByTestId('ToDropDownCSDB');
    const dateinput=screen.getByTestId('inputdateCSDB');
    const timeinput=screen.getByTestId('inputtimeCSDB');
   
    const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[0];
    await act(()=>{userEvent.click(handleinputclicktest);})
    const onitemclicktest=screen.getAllByTestId("onitemclickcheck");
    // console.log(onitemclicktest[0]);
    await act(()=>{userEvent.click(onitemclicktest[0]);})
    const handleinputclicktest2=screen.getAllByTestId("handleinputclickcheck")[1];
    await act(()=>{userEvent.click(handleinputclicktest2);})
    const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[1];
    
    await userEvent.click(onitemclicktest2);
    // console.log(onitemclicktest2)
    await fireEvent.change(dateinput, { target: { value: '2024-02-02' } });
    await fireEvent.change(timeinput, { target: { value: '23:00' } });
    await userEvent.click(screen.getByTestId('ConfirmBtnCSDB'));
    
})
test('CreateScheduleDialogue Box click confirm button with startplace and endplace are different schedules BUT past booking',async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{label: "IIT Hyderabad",value:"IIT Hyderabad"},{label: "JBS Bus Stand",value: "JBS Bus Stand"}]
    const mockValuelist=jest.fn((jsonList)=>{
        const values=[]
        if(jsonList["value"]!==undefined)
        {
          values.push(jsonList["value"]);
        }
        else{
          jsonList.forEach(obj => {
            if (obj["value"]) {
              values.push(obj["value"]);
            }
          });
        }
       
        return values;
      })
      axios.get.mockResolvedValue({data:{code:'ER_DUP_ENTRY' }})
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    const FromDropdown =screen.getByTestId('FromDropDownCSDB');
    const ToDropdown=screen.getByTestId('ToDropDownCSDB');
    const dateinput=screen.getByTestId('inputdateCSDB');
    const timeinput=screen.getByTestId('inputtimeCSDB');
   
    const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[0];
    await act(()=>{userEvent.click(handleinputclicktest);})
    const onitemclicktest=screen.getAllByTestId("onitemclickcheck");
    // console.log(onitemclicktest[0]);
    await act(()=>{userEvent.click(onitemclicktest[0]);})
    const handleinputclicktest2=screen.getAllByTestId("handleinputclickcheck")[1];
    await act(()=>{userEvent.click(handleinputclicktest2);})
    const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[1];
    
    await userEvent.click(onitemclicktest2);
    // console.log(onitemclicktest2)
    await fireEvent.change(dateinput, { target: { value: '2025-02-02' } });
    await fireEvent.change(timeinput, { target: { value: '23:00' } });
    await userEvent.click(screen.getByTestId('ConfirmBtnCSDB'));
    
})
test('CreateScheduleDialogue Box click confirm button with startplace and endplace are different schedules',async()=>{
    const mockProfileDetails={
        email: "rithviksharma2002@gmail.com",
    google_id: "101198790023363025346",
    name: "Kondapalkala Rithvik",
    phone: "9390263348",
    photo: "https://lh3.googleusercontent.com/a/AGNmyxbUgYdMFFAh-FCK1z6D2LFyioSgwRfjsXcOmFMX=s96-c"
    }
    const mockcancelButton=jest.fn();
    const mockreloadButton=jest.fn();
    const mockoptions=[{label: "IIT Hyderabad",value:"IIT Hyderabad"},{label: "JBS Bus Stand",value: "JBS Bus Stand"}]
    const mockValuelist=jest.fn((jsonList)=>{
        const values=[]
        if(jsonList["value"]!==undefined)
        {
          values.push(jsonList["value"]);
        }
        else{
          jsonList.forEach(obj => {
            if (obj["value"]) {
              values.push(obj["value"]);
            }
          });
        }
       
        return values;
      })
      axios.get.mockResolvedValue({data:{code:'200' }})
    act(()=>{render(<CreateScheduleDialoguebox cancelButton={mockcancelButton} reloadButton={mockreloadButton} options={mockoptions} Valuelist={mockValuelist} profileDetails={mockProfileDetails}/>)});
    const FromDropdown =screen.getByTestId('FromDropDownCSDB');
    const ToDropdown=screen.getByTestId('ToDropDownCSDB');
    const dateinput=screen.getByTestId('inputdateCSDB');
    const timeinput=screen.getByTestId('inputtimeCSDB');
   
    const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[0];
    await act(()=>{userEvent.click(handleinputclicktest);})
    const onitemclicktest=screen.getAllByTestId("onitemclickcheck");
    // console.log(onitemclicktest[0]);
    await act(()=>{userEvent.click(onitemclicktest[0]);})
    const handleinputclicktest2=screen.getAllByTestId("handleinputclickcheck")[1];
    await act(()=>{userEvent.click(handleinputclicktest2);})
    const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[1];
    
    await userEvent.click(onitemclicktest2);
    // console.log(onitemclicktest2)
    await fireEvent.change(dateinput, { target: { value: '2025-02-02' } });
    await fireEvent.change(timeinput, { target: { value: '23:00' } });
    await userEvent.click(screen.getByTestId('ConfirmBtnCSDB'));
    
})

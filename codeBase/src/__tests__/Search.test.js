// import { render, screen, fireEvent } from '@testing-library/react';
// import SearchAndAddForm from '../Components/succ_login/Search';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
// import axios, { HttpStatusCode } from 'axios';
// jest.mock('axios');
// import MockAdapter from 'axios-mock-adapter';

// test("testing input items", async() => {
//     act(()=>render(<SearchAndAddForm/>));

//     const mock = new MockAdapter(axios);

//     const response1 = { data: {place_name: 'IIT Hyderabad'} };
//     mock.onGet('/dropdownlist').reply(200, response1);

//     // const result1 = await axios.get('/dropdownlist');
//     // expect(result1.data).toEqual(response1.data)

//     // const sampleoptions=[{value: "IIT HYDERABAD", label: "IIT HYDERABAD"}];
//     // axios.get.mockResolvedValueOnce(sampleoptions);
//     // const result = await SearchAndAddForm();

//     //   // then
//     // expect(axios.get).toHaveBeenCalledWith('/dropdownlist');
//     // expect(result).toEqual(users);

//     // for 96-109 it requires 79-84
//     // const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[0];
//     // await userEvent.click(handleinputclicktest);
//     // const onitemclicktest=screen.getAllByTestId("onitemclickcheck")[0];
//     // await userEvent.click(onitemclicktest);

//     const handleinputchangetest=screen.getByTestId("handleinputchangecheck");
//     fireEvent.change(handleinputchangetest, { target: { value: '2002-02-02' } });

//     const searchicontest=screen.getByTestId("searchiconcheck");
//     await userEvent.click(searchicontest);

//     const addicontest=screen.getByTestId("addiconcheck");
//     await userEvent.click(addicontest);
// });

import { render, screen, fireEvent } from '@testing-library/react';
import SearchAndAddForm from '../Components/succ_login/Search';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
// import { AxiosInstance } from 'axios';
// import MockAdapter from 'axios-mock-adapter'; // <-- import MockAdapter
jest.mock('axios');


test("testing add and close", async() => {
  const fetchoptdet = { data:[ {place_name: 'IIT Hyderabad'},{place_name: 'JBS'}] };
  const fetchprofdet={data: {email: "varahasaignaneswar3@gmail.com",google_id: "104151385015525007289",name: "Varahasai Gnaneswar",phone: "8688445200",photo: "https://lh3.googleusercontent.com/a/AGNmyxadLFVCbaiDSAq34wl0Qc5J8SDTNeoXvdYUHkJ5=s96-c"}}
  const searchdet={data: [{date: "2023-04-30T18:30:00.000Z",end_place: "JBS Bus Stand",listofpassengers: "[{\"name\": \"Kondapalkala Rithvik\", \"phone_number\": \"9390263348\"}]",schedule_id: "2.822446970171285e38",start_place: "IIT Hyderabad",status: "Join",time: "2023-04-30T20:16:00.000Z"}]}
  const csdbdet = {data:{code:'200' }};
  axios.get.mockImplementation( jest.fn((url)=>{
      switch(url) {
        case "/dropdownlist":
          return Promise.resolve(fetchoptdet);
        case "/profile2":
          return Promise.resolve(fetchprofdet);
        case "/search":
          return Promise.resolve(searchdet);
        case "/createschedule":
          return Promise.resolve(csdbdet);
      }
    }));

  act(() => render(<SearchAndAddForm />));

  // const mockedGet = jest.fn();
  // mockedGet.mockResolvedValueOnce(searchdet);
  // mockedGet.mockResolvedValueOnce(fetchoptdet);
  // mockedGet.mockResolvedValueOnce(fetchprofdet);
  // axios.get.mockImplementation(mockedGet);

  // const data = await SearchAndAddForm();
  // expect(mockedGet).toHaveBeenNthCalledWith(1, '/search');
  // expect(mockedGet).toHaveBeenNthCalledWith(2, '/dropdownlist');
  // expect(mockedGet).toHaveBeenNthCalledWith(3, '/profile2');
  // // expect(data).toEqual({ users: mockedUsersData, posts: mockedPostsData });
  

//   const axiosInstance1 = axios.create({
//     baseURL: '/dropdownlist',
//   });

//   const mock1 = new axiosMockAdapter(axiosInstance1);
//   const mock = new MockAdapter(axios);
//   const response1 = { data: {place_name: 'IIT Hyderabad'} };
//   mock.onGet('/data').reply(200, response1);


//   axiosInstance1.get.mockResolvedValue(response1);

//   const result1 = await axiosInstance1.get('/data');
//   expect(result1.data).toEqual(response1.data);

//   const mock = new MockAdapter(axios); // <-- create new instance of MockAdapter

//   const response1 = { data: {place_name: 'IIT Hyderabad'} };
//   mock.onGet('/dropdownlist').reply(200, response1);

  // const fetchoptdet = { data: {place_name: 'IIT Hyderabad'} };
  // const fetchprofdet={data: {email: "varahasaignaneswar3@gmail.com",google_id: "104151385015525007289",name: "Varahasai Gnaneswar",phone: "8688445200",photo: "https://lh3.googleusercontent.com/a/AGNmyxadLFVCbaiDSAq34wl0Qc5J8SDTNeoXvdYUHkJ5=s96-c"}}
  // const searchdet={data: [{date: "2023-04-30T18:30:00.000Z",end_place: "JBS Bus Stand",listofpassengers: "[{\"name\": \"Kondapalkala Rithvik\", \"phone_number\": \"9390263348\"}]",schedule_id: "2.822446970171285e38",start_place: "IIT Hyderabad",status: "Join",time: "2023-04-30T20:16:00.000Z"}]}
  
  // const axiosInstance1 = axios.create({
  //   baseURL: '/search',
  // });
  // const axiosInstance2 = axios.create({
  //   baseURL: '/dropdownlist',
  // });
  // const axiosInstance3 = axios.create({
  //   baseURL: '/profile2',
  // });
  // axiosInstance1.get.mockResolvedValueOnce({searchdet});
  // axiosInstance2.get.mockResolvedValueOnce({fetchoptdet});
  // axiosInstance3.get.mockResolvedValueOnce({fetchprofdet});

  // const dropdownList = await axios.get('/dropdownlist');
  // const profile = await axios.get('/profile2');
  // const searchResults = await axios.get('/search');



  // const handleinputchangetest = screen.getByTestId("handleinputchangecheck");
  // fireEvent.change(handleinputchangetest, { target: { value: '2002-02-02' } });

  // const searchicontest = screen.getByTestId("searchiconcheck");
  // await userEvent.click(searchicontest);

  const addicontest = screen.getByTestId("addiconcheck");
  await userEvent.click(addicontest);

  // const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck");
  // await userEvent.click(handleinputclicktest[0]);
  // const onitemclicktest0=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest0);

  // awaitf userEvent.click(handleinputclicktest[1]);
  // const onitemclicktest1=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest1);
  
  // //for testing dropdown in csdb through valuelist
  // await userEvent.click(handleinputclicktest[2]);
  // const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest2);

  const CancelBtnCSDBtest=screen.getByTestId("CancelBtnCSDB");
  await userEvent.click(CancelBtnCSDBtest);



  // const ConfirmBtnCSDBtest=screen.getByTestId("ConfirmBtnCSDB");
  // await userEvent.click(ConfirmBtnCSDBtest);

  // const FromDropDownCSDBtest=screen.getByTestId("FromDropDownCSDB");


});

test("testing date input", async() => {
  const fetchoptdet = { data:[ {place_name: 'IIT Hyderabad'},{place_name: 'JBS'}] };
  const fetchprofdet={data: {email: "varahasaignaneswar3@gmail.com",google_id: "104151385015525007289",name: "Varahasai Gnaneswar",phone: "8688445200",photo: "https://lh3.googleusercontent.com/a/AGNmyxadLFVCbaiDSAq34wl0Qc5J8SDTNeoXvdYUHkJ5=s96-c"}}
  const searchdet={data: [{date: "2023-04-30T18:30:00.000Z",end_place: "JBS Bus Stand",listofpassengers: "[{\"name\": \"Kondapalkala Rithvik\", \"phone_number\": \"9390263348\"}]",schedule_id: "2.822446970171285e38",start_place: "IIT Hyderabad",status: "Join",time: "2023-04-30T20:16:00.000Z"}]}
  const csdbdet = {data:{code:'200' }};
  axios.get.mockImplementation( jest.fn((url)=>{
      switch(url) {
        case "/dropdownlist":
          return Promise.resolve(fetchoptdet);
        case "/profile2":
          return Promise.resolve(fetchprofdet);
        case "/search":
          return Promise.resolve(searchdet);
        case "/createschedule":
          return Promise.resolve(csdbdet);
      }
    }));

  act(() => render(<SearchAndAddForm />));

  


  const handleinputchangetest = screen.getByTestId("handleinputchangecheck");
  fireEvent.change(handleinputchangetest, { target: { value: '2002-02-02' } });

  // const searchicontest = screen.getByTestId("searchiconcheck");
  // await userEvent.click(searchicontest);


  // const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck");
  // await userEvent.click(handleinputclicktest[0]);
  // const onitemclicktest0=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest0);

  // awaitf userEvent.click(handleinputclicktest[1]);
  // const onitemclicktest1=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest1);
  
  // //for testing dropdown in csdb through valuelist
  // await userEvent.click(handleinputclicktest[2]);
  // const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest2);




  // const ConfirmBtnCSDBtest=screen.getByTestId("ConfirmBtnCSDB");
  // await userEvent.click(ConfirmBtnCSDBtest);

  // const FromDropDownCSDBtest=screen.getByTestId("FromDropDownCSDB");


});

test("testing date input", async() => {
  const fetchoptdet = { data:[ {place_name: 'IIT Hyderabad'},{place_name: 'JBS'}] };
  const fetchprofdet={data: {email: "varahasaignaneswar3@gmail.com",google_id: "104151385015525007289",name: "Varahasai Gnaneswar",phone: "8688445200",photo: "https://lh3.googleusercontent.com/a/AGNmyxadLFVCbaiDSAq34wl0Qc5J8SDTNeoXvdYUHkJ5=s96-c"}}
  const searchdet={data: [{date: "2023-04-30T18:30:00.000Z",end_place: "JBS Bus Stand",listofpassengers: "[{\"name\": \"Kondapalkala Rithvik\", \"phone_number\": \"9390263348\"}]",schedule_id: "2.822446970171285e38",start_place: "IIT Hyderabad",status: "Join",time: "2023-04-30T20:16:00.000Z"}]}
  const csdbdet = {data:{code:'200' }};
  axios.get.mockImplementation( jest.fn((url)=>{
      switch(url) {
        case "/dropdownlist":
          return Promise.resolve(fetchoptdet);
        case "/profile2":
          return Promise.resolve(fetchprofdet);
        case "/search":
          return Promise.resolve(searchdet);
        case "/createschedule":
          return Promise.resolve(csdbdet);
      }
    }));

  act(() => render(<SearchAndAddForm />));


  // const searchicontest = screen.getByTestId("searchiconcheck");
  // await userEvent.click(searchicontest);
  

  // const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck");
  // // console.log(`line 247 ${handleinputclicktest.length()}`)
  // await act(()=>{fireEvent.click(handleinputclicktest[0]);})
  // // const onitemclicktest=screen.getAllByTestId("onitemclickcheck");
  // await act(()=>{fireEvent.click(screen.getAllByTestId("onitemclickcheck")[0]);})
  // // // console.log(onitemclicktest[0]);
  // // await act(()=>{userEvent.click(onitemclicktest[0]);})

  // await fireEvent.click(screen.getAllByTestId("handleinputclickcheck")[0]);
  // expect(screen.getByTestId("menucheck")).toBeInTheDocument();

  // const onitemcheck1=screen.getByTestId("onitemclickcheck");
  // await userEvent.click(onitemcheck1);

 
  // const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck");

  // await userEvent.click(handleinputclicktest[0]);
  // const onitemclicktest1=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest1);
  
  // //for testing dropdown in csdb through valuelist
  // await userEvent.click(handleinputclicktest[0]);
  // const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[1];
  // await userEvent.click(onitemclicktest2);




  // const ConfirmBtnCSDBtest=screen.getByTestId("ConfirmBtnCSDB");
  // await userEvent.click(ConfirmBtnCSDBtest);

  // const FromDropDownCSDBtest=screen.getByTestId("FromDropDownCSDB");


});

test("testing axios console log erors", async() => {

  // const fetchoptdet = { data:[ {place_name: 'IIT Hyderabad'}] };
  // const fetchprofdet={data: {email: "varahasaignaneswar3@gmail.com",google_id: "104151385015525007289",name: "Varahasai Gnaneswar",phone: "8688445200",photo: "https://lh3.googleusercontent.com/a/AGNmyxadLFVCbaiDSAq34wl0Qc5J8SDTNeoXvdYUHkJ5=s96-c"}}
  // const searchdet={data: [{date: "2023-04-30T18:30:00.000Z",end_place: "JBS Bus Stand",listofpassengers: "[{\"name\": \"Kondapalkala Rithvik\", \"phone_number\": \"9390263348\"}]",schedule_id: "2.822446970171285e38",start_place: "IIT Hyderabad",status: "Join",time: "2023-04-30T20:16:00.000Z"}]}


  // axios.get.mockImplementation( jest.fn((url)=>{
  //     switch(url) {
  //       case "/dropdownlist":
  //         return Promise.resolve(fetchoptdet);
  //       case "/profile2":
  //         return Promise.resolve(fetchprofdet);
  //       case "/search":
  //         return Promise.resolve(searchdet);
  //     }
  //   }));

  act(() => render(<SearchAndAddForm />));

  // const mockedGet = jest.fn();
  // mockedGet.mockResolvedValueOnce(searchdet);
  // mockedGet.mockResolvedValueOnce(fetchoptdet);
  // mockedGet.mockResolvedValueOnce(fetchprofdet);
  // axios.get.mockImplementation(mockedGet);

  // const data = await SearchAndAddForm();
  // expect(mockedGet).toHaveBeenNthCalledWith(1, '/search');
  // expect(mockedGet).toHaveBeenNthCalledWith(2, '/dropdownlist');
  // expect(mockedGet).toHaveBeenNthCalledWith(3, '/profile2');
  // // expect(data).toEqual({ users: mockedUsersData, posts: mockedPostsData });
  

//   const axiosInstance1 = axios.create({
//     baseURL: '/dropdownlist',
//   });

//   const mock1 = new axiosMockAdapter(axiosInstance1);
//   const mock = new MockAdapter(axios);
//   const response1 = { data: {place_name: 'IIT Hyderabad'} };
//   mock.onGet('/data').reply(200, response1);


//   axiosInstance1.get.mockResolvedValue(response1);

//   const result1 = await axiosInstance1.get('/data');
//   expect(result1.data).toEqual(response1.data);

//   const mock = new MockAdapter(axios); // <-- create new instance of MockAdapter

//   const response1 = { data: {place_name: 'IIT Hyderabad'} };
//   mock.onGet('/dropdownlist').reply(200, response1);

  // const fetchoptdet = { data: {place_name: 'IIT Hyderabad'} };
  // const fetchprofdet={data: {email: "varahasaignaneswar3@gmail.com",google_id: "104151385015525007289",name: "Varahasai Gnaneswar",phone: "8688445200",photo: "https://lh3.googleusercontent.com/a/AGNmyxadLFVCbaiDSAq34wl0Qc5J8SDTNeoXvdYUHkJ5=s96-c"}}
  // const searchdet={data: [{date: "2023-04-30T18:30:00.000Z",end_place: "JBS Bus Stand",listofpassengers: "[{\"name\": \"Kondapalkala Rithvik\", \"phone_number\": \"9390263348\"}]",schedule_id: "2.822446970171285e38",start_place: "IIT Hyderabad",status: "Join",time: "2023-04-30T20:16:00.000Z"}]}
  
  // const axiosInstance1 = axios.create({
  //   baseURL: '/search',
  // });
  // const axiosInstance2 = axios.create({
  //   baseURL: '/dropdownlist',
  // });
  // const axiosInstance3 = axios.create({
  //   baseURL: '/profile2',
  // });
  // axiosInstance1.get.mockResolvedValueOnce({searchdet});
  // axiosInstance2.get.mockResolvedValueOnce({fetchoptdet});
  // axiosInstance3.get.mockResolvedValueOnce({fetchprofdet});

  // const dropdownList = await axios.get('/dropdownlist');
  // const profile = await axios.get('/profile2');
  // const searchResults = await axios.get('/search');



  const handleinputchangetest = screen.getByTestId("handleinputchangecheck");
  fireEvent.change(handleinputchangetest, { target: { value: '2002-02-02' } });

  const searchicontest = screen.getByTestId("searchiconcheck");
  await userEvent.click(searchicontest);

  const addicontest = screen.getByTestId("addiconcheck");
  await userEvent.click(addicontest);

  // const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck");
  // await userEvent.click(handleinputclicktest[0]);
  // const onitemclicktest0=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest0);

  // await userEvent.click(handleinputclicktest[1]);
  // const onitemclicktest1=screen.getAllByTestId("onitemclickcheck")[0];
  // await userEvent.click(onitemclicktest1);

});

test("testing axios console log erors", async() => {

  const fetchoptdet = { data:[ {place_name: 'IIT Hyderabad'},{place_name: 'JBS'}] };
  const fetchprofdet={data: {email: "varahasaignaneswar3@gmail.com",google_id: "104151385015525007289",name: "Varahasai Gnaneswar",phone: "8688445200",photo: "https://lh3.googleusercontent.com/a/AGNmyxadLFVCbaiDSAq34wl0Qc5J8SDTNeoXvdYUHkJ5=s96-c"}}
  const searchdet={data: [{date: "2023-04-30T18:30:00.000Z",end_place: "JBS Bus Stand",listofpassengers: "[{\"name\": \"Kondapalkala Rithvik\", \"phone_number\": \"9390263348\"}]",schedule_id: "2.822446970171285e38",start_place: "IIT Hyderabad",status: "Join",time: "2023-04-30T20:16:00.000Z"}]}
  const csdbdet = {data:{code:'200' }};

  axios.get.mockImplementation( jest.fn((url)=>{
      switch(url) {
        case "/dropdownlist":
          return Promise.resolve(fetchoptdet);
        case "/profile2":
          return Promise.resolve(fetchprofdet);
        case "/search":
          return Promise.resolve(searchdet);
        case "/createschedule":
          return Promise.resolve(csdbdet);
      }
    }));

  act(() => render(<SearchAndAddForm />));

    const addicontest = screen.getByTestId("addiconcheck");
    await userEvent.click(addicontest);

    const FromDropdown =screen.getByTestId('FromDropDownCSDB');
    const ToDropdown=screen.getByTestId('ToDropDownCSDB');
    const dateinput=screen.getByTestId('inputdateCSDB');
    const timeinput=screen.getByTestId('inputtimeCSDB');
   
    const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[2];
    await act(()=>{userEvent.click(handleinputclicktest);})
    const onitemclicktest=screen.getAllByTestId("onitemclickcheck");
    // console.log(onitemclicktest[0]);
    await act(()=>{userEvent.click(onitemclicktest[0]);})
    const handleinputclicktest2=screen.getAllByTestId("handleinputclickcheck")[3];
    await act(()=>{userEvent.click(handleinputclicktest2);})
    const onitemclicktest2=screen.getAllByTestId("onitemclickcheck")[1];
    
    await userEvent.click(onitemclicktest2);
    // console.log(onitemclicktest2)
    await fireEvent.change(dateinput, { target: { value: '2025-02-02' } });
    await fireEvent.change(timeinput, { target: { value: '23:00' } });
    await userEvent.click(screen.getByTestId('ConfirmBtnCSDB'));

});
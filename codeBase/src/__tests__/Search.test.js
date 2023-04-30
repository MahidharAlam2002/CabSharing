import { render, screen, fireEvent } from '@testing-library/react';
import SearchAndAddForm from '../Components/succ_login/Search';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
jest.mock('axios');

test("testing input items", async() => {
    act(()=>render(<SearchAndAddForm/>));

    // const sampleoptions=[{value: "IIT HYDERABAD", label: "IIT HYDERABAD"}];
    // axios.get.mockResolvedValueOnce(sampleoptions);
    // const result = await FetchOptions();

    //   // then
    // expect(axios.get).toHaveBeenCalledWith('/dropdownlist');
    // expect(result).toEqual(users);

    // for 96-109 it requires 79-84
    // const handleinputclicktest=screen.getAllByTestId("handleinputclickcheck")[0];
    // await userEvent.click(handleinputclicktest);
    // const onitemclicktest=screen.getAllByTestId("onitemclickcheck")[0];
    // await userEvent.click(onitemclicktest);

    const handleinputchangetest=screen.getByTestId("handleinputchangecheck");
    fireEvent.change(handleinputchangetest, { target: { value: '2002-02-02' } });

    const searchicontest=screen.getByTestId("searchiconcheck");
    await userEvent.click(searchicontest);

    const addicontest=screen.getByTestId("addiconcheck");
    await userEvent.click(addicontest);
});
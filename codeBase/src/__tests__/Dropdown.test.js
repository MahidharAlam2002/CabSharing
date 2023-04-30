import userEvent from '@testing-library/user-event';
import { render, fireEvent ,screen } from '@testing-library/react';
import Dropdown from '../Components/succ_login/Dropdown';

test("Test by clicking an item from menu and deleting it by pressing cross icon", async() => {
    const mockonchange=jest.fn(
        (data)=> {
            return data;
        }
    );
    const options=[{value: "IIT HYDERABAD", label: "IIT HYDERABAD"}];
    
    render(
        <Dropdown 
            placeHolder="destination" 
            options={options} 
            isMulti={true} 
            isSearchable={true}
            onChange={mockonchange}
        />
    );

    await userEvent.click(screen.getByTestId("handleinputclickcheck"));
    expect(screen.getByTestId("menucheck")).toBeInTheDocument();

    const onitemcheck=screen.getByTestId("onitemclickcheck");
    await userEvent.click(onitemcheck);

    await userEvent.click(screen.getByTestId("ontagremovecheck"));
    
})

test("Testing by clicking the same input twice", async() => {
    const mockonchange=jest.fn(
        (data)=> {
            return data;
        }
    );
    const options=[{value: "IIT HYDERABAD", label: "IIT HYDERABAD"}]

    render(
        <Dropdown 
            placeHolder="destination" 
            options={options} 
            isMulti={true} 
            isSearchable={true}
            onChange={mockonchange}
        />
    );

    await userEvent.click(screen.getByTestId("handleinputclickcheck"));
    expect(screen.getByTestId("menucheck")).toBeInTheDocument();

    const onitemcheck=screen.getByTestId("onitemclickcheck");
    await userEvent.click(onitemcheck);

    await userEvent.click(screen.getByTestId("handleinputclickcheck"));
    expect(screen.getByTestId("menucheck")).toBeInTheDocument();

    const onitemcheck1=screen.getByTestId("onitemclickcheck");
    await userEvent.click(onitemcheck1);
})

test("Test isMulti false and isSelected", async() => {
    const mockonchange=jest.fn(
        (data)=> {
            return data;
        }
    );
    render(
        <Dropdown 
            placeHolder="destination" 
            options={[{value: "IIT HYDERABAD", label: "IIT HYDERABAD"}]} 
            isMulti={false} 
            isSearchable={true}
            onChange={mockonchange}
        />
    );

    await userEvent.click(screen.getByTestId("handleinputclickcheck"));
    expect(screen.getByTestId("menucheck")).toBeInTheDocument();

    const onitemcheck=screen.getByTestId("onitemclickcheck");
    await userEvent.click(onitemcheck);

    await userEvent.click(screen.getByTestId("handleinputclickcheck"));
    expect(screen.getByTestId("menucheck")).toBeInTheDocument();
    
})

test("Testing the search bar of dropdown menu", async() => {
    const mockonchange=jest.fn(
        (data)=> {
            return data;
        }
    );
    const options=[{value: "IIT HYDERABAD", label: "IIT HYDERABAD"}]

    render(
        <Dropdown 
            placeHolder="destination" 
            options={options} 
            isMulti={true} 
            isSearchable={true}
            onChange={mockonchange}
        />
    );

    await userEvent.click(screen.getByTestId("handleinputclickcheck"));
    expect(screen.getByTestId("menucheck")).toBeInTheDocument();
    
    const searchcheck=screen.getByTestId('searchboxcheck');
    fireEvent.change(searchcheck, { target: { value: 'test' } });
})

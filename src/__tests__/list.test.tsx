import EmployeeHome from "@/pages/employee/list";
import { Employee } from "@/types";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];

jest.mock("next/router", () => require("next-router-mock"));

describe("EmployeeHome", () => {
  const initialState = {
    employees: {
      all: {
        data: [] as Employee[],
        loading: false,
      },
      query: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        orderBy: "",
        order: "",
      },
    },
  };

  const mockStore = configureStore(middlewares);

  it("'Add Employee' button should be in the Employee Home page", () => {
    const store = mockStore(initialState);

    const { getByRole } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const addEmployeeBtn = getByRole("button", { name: "Add Employee" });
    expect(addEmployeeBtn).toBeTruthy();
  });

  it("Layout switch button should be in the Employee Home page", () => {
    const store = mockStore(initialState);
    const { getByTitle } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const layoutSwitchBtn = getByTitle("Switch Layout");
    expect(layoutSwitchBtn).toBeTruthy();
  });

  it("Layout should change when switch layout button is clicked", () => {
    const newState = { ...initialState };
    newState.employees.all.data.push({ _id: "1", firstName: "", lastName: "", email: "", phoneNumber: "", gender: "" });

    const store = mockStore(newState);
    const { getByTitle, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const layoutSwitchBtn = getByTitle("Switch Layout");
    expect(layoutSwitchBtn).toBeTruthy();

    fireEvent.click(layoutSwitchBtn);

    const employeeTable = getByLabelText("employee-table");
    expect(employeeTable).toBeTruthy();

    fireEvent.click(layoutSwitchBtn);

    const employeeGrid = getByTestId("employee-grid");
    expect(employeeGrid).toBeTruthy();
  });
});

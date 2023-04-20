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

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);

  it("'Filter' button should be in the Employee Home page", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const filterBtn = getByRole("button", { name: "Filter" });
    expect(filterBtn).toBeTruthy();
  });

  it("Filtering inputs and Clear Filters button should be in the Employee Home page", () => {
    const { container } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const firstNameInput = container.querySelector("#first-name-filter");
    const lastNameInput = container.querySelector("#last-name-filter");
    const emailInput = container.querySelector("#email-filter");
    const phoneNumberInput = container.querySelector("#phone-number-filter");
    const genderSelect = container.querySelector("#gender-filter");

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(genderSelect).toBeTruthy();
  });

  it("Filtering inputs visibility should be handled by Filter button click", () => {
    const { getByRole, getByTestId } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const filterBtn = getByRole("button", { name: "Filter" });
    const filterBar = getByTestId("filter-bar");

    expect(filterBar).not.toBeVisible();
    fireEvent.click(filterBtn);
    expect(filterBar).toBeVisible();
  });

  describe("'Sort by' button", () => {
    it("should be visible when page is in Grid View", () => {
      const { findByRole } = render(
        <Provider store={store}>
          <EmployeeHome />
        </Provider>
      );

      const sortBtn = findByRole("group", { name: "split button" });
      expect(sortBtn).toBeTruthy();
    });

    it("should not be visible when page is in List View", () => {
      const { queryByRole, getByTitle } = render(
        <Provider store={store}>
          <EmployeeHome />
        </Provider>
      );

      const layoutSwitchBtn = getByTitle("Switch Layout");
      fireEvent.click(layoutSwitchBtn);

      const sortBtn = queryByRole("group", { name: "split button" });
      expect(sortBtn).toBeFalsy();
    });
  });

  it("'Add Employee' button should be in the Employee Home page", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const addEmployeeBtn = getByRole("button", { name: "Add Employee" });
    expect(addEmployeeBtn).toBeTruthy();
  });

  it("Layout switch button should be in the Employee Home page", () => {
    const { getByTitle } = render(
      <Provider store={store}>
        <EmployeeHome />
      </Provider>
    );

    const layoutSwitchBtn = getByTitle("Switch Layout");
    expect(layoutSwitchBtn).toBeTruthy();
  });

  it("Layout should change from Grid View to List View when switch layout button is clicked", () => {
    const newState = { ...initialState };
    newState.employees.all.data.push({ _id: "1", firstName: "", lastName: "", email: "", phoneNumber: "", gender: "" });

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

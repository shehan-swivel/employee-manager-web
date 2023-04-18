import EditForm from "@/pages/employee/edit/[id]";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("next/router", () => require("next-router-mock"));

describe("EditForm", () => {
  const initialState = {
    employees: {
      selected: {
        data: {},
        loading: false,
      },
      submit: {
        loading: false,
        success: false,
      },
    },
  };

  const mockStore = configureStore();

  it("Edit Employee page title should be 'Edit Employee'", () => {
    const store = mockStore(initialState);
    const { getByRole } = render(
      <Provider store={store}>
        <EditForm />
      </Provider>
    );

    const title = getByRole("heading", { name: "Edit Employee" });
    expect(title).toBeTruthy();
  });

  it("All the edit form elements should be in the Edit Employee page", () => {
    const store = mockStore(initialState);
    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <EditForm />
      </Provider>
    );

    const firstNameInput = getByRole("textbox", { name: "First Name" });
    const lastNameInput = getByRole("textbox", { name: "Last Name" });
    const emailInput = getByRole("textbox", { name: "Email" });
    const phoneNumberInput = getByRole("textbox", { name: "Phone" });
    const genderSelect = getByLabelText("Gender");
    const addBtn = getByRole("button", { name: "Save" });

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(genderSelect).toBeTruthy();
    expect(addBtn).toBeTruthy();
  });
});

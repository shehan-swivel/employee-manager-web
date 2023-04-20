import AddForm from "@/pages/employee/add";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];

jest.mock("next/router", () => require("next-router-mock"));

describe("AddForm", () => {
  const initialState = {
    employees: {
      submit: {
        loading: false,
        success: false,
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);

  it("'List View' button should be in the Add Employee page", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <AddForm />
      </Provider>
    );

    const listViewBtn = getByRole("button", { name: "List View" });
    expect(listViewBtn).toBeTruthy();
  });

  it("Add Employee page title should be 'Add Employee'", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <AddForm />
      </Provider>
    );

    const title = getByRole("heading", { name: "Add Employee" });
    expect(title).toBeTruthy();
  });

  it("All the add form elements should be in the Add Employee page", () => {
    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <AddForm />
      </Provider>
    );

    const firstNameInput = getByRole("textbox", { name: "First Name" });
    const lastNameInput = getByRole("textbox", { name: "Last Name" });
    const emailInput = getByRole("textbox", { name: "Email" });
    const phoneNumberInput = getByRole("textbox", { name: "Phone" });
    const genderSelect = getByLabelText("Gender");
    const addBtn = getByRole("button", { name: "Add" });

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(genderSelect).toBeTruthy();
    expect(addBtn).toBeTruthy();
  });

  describe("Validation should failed", () => {
    let firstNameInput: HTMLElement,
      lastNameInput: HTMLElement,
      emailInput: HTMLElement,
      phoneNumberInput: HTMLElement,
      addBtn: HTMLElement;

    beforeEach(async () => {
      const { getByLabelText, getByRole } = render(
        <Provider store={store}>
          <AddForm />
        </Provider>
      );

      firstNameInput = getByLabelText("First Name");
      lastNameInput = getByLabelText("Last Name");
      emailInput = getByLabelText("Email");
      phoneNumberInput = getByLabelText("Phone");

      addBtn = getByRole("button", { name: "Add" });
    });

    it("when first name is empty.", async () => {
      fireEvent.change(firstNameInput, { target: { value: "" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(firstNameInput).toBeInvalid();
      });
    });

    it("when first name is less than 6 characters.", async () => {
      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(firstNameInput).toBeInvalid();
      });
    });

    it("when first name is greater than 10 characters.", async () => {
      fireEvent.change(firstNameInput, { target: { value: "Constantine" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(firstNameInput).toBeInvalid();
      });
    });

    it("when first name contains non-alphabetic characters.", async () => {
      fireEvent.change(firstNameInput, { target: { value: "John123" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(firstNameInput).toBeInvalid();
      });
    });

    it("when last name is empty.", async () => {
      fireEvent.change(lastNameInput, { target: { value: "" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(lastNameInput).toBeInvalid();
      });
    });

    it("when last name is less than 6 characters.", async () => {
      fireEvent.change(lastNameInput, { target: { value: "John" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(lastNameInput).toBeInvalid();
      });
    });

    it("when last name is greater than 10 characters.", async () => {
      fireEvent.change(lastNameInput, { target: { value: "Constantine" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(lastNameInput).toBeInvalid();
      });
    });

    it("when last name contains non-alphabetic characters.", async () => {
      fireEvent.change(lastNameInput, { target: { value: "John123" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(lastNameInput).toBeInvalid();
      });
    });

    it("when email is invalid.", async () => {
      fireEvent.change(emailInput, { target: { value: "john@" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(emailInput).toBeInvalid();
      });
    });

    it("when phone number is invalid.", async () => {
      fireEvent.change(phoneNumberInput, { target: { value: "456712819101" } });
      fireEvent.click(addBtn);

      await waitFor(async () => {
        expect(phoneNumberInput).toBeInvalid();
      });
    });
  });
});

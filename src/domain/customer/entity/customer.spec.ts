import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit teste", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("customer: Name is required");
  });

  it("should throw error when id is empty and name is empty", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError("customer: Id is required,customer: Name is required");
  });

  it("should change name", () => {
    //Arange
    const customer = new Customer("123", "John");

    //Act
    customer.changeName("Jane");

    //Assert
    expect(customer.name).toBe("Jane");
  });

  it("should throw error when address is undefined", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");

      customer.activate();
    }).toThrowError("customer: Address is mandatory to activate a customer");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "123124", "Aracaju");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });
});

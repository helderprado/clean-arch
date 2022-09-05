import { Customer } from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "zip", "city");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find customer usecase", () => {
  it("should find a customer", async () => {
    const customerReposity = MockRepository();
    const usecase = new FindCustomerUseCase(customerReposity);

    const input = { id: "123" };

    const result = await usecase.execute(input);

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        city: "city",
        number: 123,
        zip: "zip",
      },
    };

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerReposity = MockRepository();
    customerReposity.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUseCase(customerReposity);

    const input = { id: "123" };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});

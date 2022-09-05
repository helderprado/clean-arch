import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "zip",
    city: "city",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerReposity = MockRepository();
    const customerCreateCustomerUseCase = new CreateCustomerUseCase(
      customerReposity
    );

    const output = await customerCreateCustomerUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerReposity = MockRepository();
    const customerCreateCustomerUseCase = new CreateCustomerUseCase(
      customerReposity
    );

    input.name = "";

    await expect(customerCreateCustomerUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when street is missing", async () => {
    const customerReposity = MockRepository();
    const customerCreateCustomerUseCase = new CreateCustomerUseCase(
      customerReposity
    );

    input.address.street = "";

    await expect(customerCreateCustomerUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});

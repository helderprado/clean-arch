import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer usecase", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerReposity = new CustomerRepository();

    const usecase = new FindCustomerUseCase(customerReposity);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "zip", "city");
    customer.changeAddress(address);

    await customerReposity.create(customer);

    const input = { id: "123" };

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

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});

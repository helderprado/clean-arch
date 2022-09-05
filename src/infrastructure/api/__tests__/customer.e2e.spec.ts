import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const res = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 24,
          zip: "zip",
        },
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("John");
    expect(res.body.address.street).toBe("Street");
    expect(res.body.address.city).toBe("City");
    expect(res.body.address.number).toBe(24);
    expect(res.body.address.zip).toBe("zip");
  });

  it("should not create a customer", async () => {
    const res = await request(app).post("/customer").send({ name: "John" });

    expect(res.status).toBe(500);
  });

  it("should list customers", async () => {
    const res1 = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 24,
          zip: "zip",
        },
      });

    expect(res1.status).toBe(200);

    const res2 = await request(app)
      .post("/customer")
      .send({
        name: "John 2",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 25,
          zip: "zip 2",
        },
      });

    expect(res2.status).toBe(200);

    const res3 = await request(app).get("/customer");

    expect(res3.status).toBe(200);

    const customer1 = res3.body.customers[0];

    const customer2 = res3.body.customers[1];

    // customer 1
    expect(customer1.name).toBe("John");
    expect(customer1.address.street).toBe("Street");
    expect(customer1.address.city).toBe("City");
    expect(customer1.address.number).toBe(24);
    expect(customer1.address.zip).toBe("zip");

    //customer 2
    expect(customer2.name).toBe("John 2");
    expect(customer2.address.street).toBe("Street 2");
    expect(customer2.address.city).toBe("City 2");
    expect(customer2.address.number).toBe(25);
    expect(customer2.address.zip).toBe("zip 2");
  });

  it("should find a customer", async () => {
    const res = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 24,
          zip: "zip",
        },
      });

    expect(res.status).toBe(200);

    const res2 = await request(app).get(`/customer/${res.body.id}`);

    const customer = res2.body;

    expect(customer.name).toBe("John");
    expect(customer.address.street).toBe("Street");
    expect(customer.address.city).toBe("City");
  });
});

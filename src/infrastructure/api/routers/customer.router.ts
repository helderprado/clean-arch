import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRouter = express.Router();

customerRouter.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRouter.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {};

    const output = await usecase.execute(customerDto);

    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXML(output)),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRouter.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = { id: req.params.id };

    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

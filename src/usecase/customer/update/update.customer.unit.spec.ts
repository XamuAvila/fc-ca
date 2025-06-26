import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const costumer = CustomerFactory.createWithAddress("John", new Address("Street", 123, "Zip", "City"));


const input = {
    id: costumer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 456,
        zip: "Zip Updated",
        city: "City Updated",
    },
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(costumer)),
        update: jest.fn(),
    }
}

describe("Customer update unit tests", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual({
            id: costumer.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        });
    })
})

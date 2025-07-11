import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import {v4 as uuid} from "uuid";
export default class CreateCustomerUseCase {
    private repository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this.repository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customerId = uuid();
        const customer = CustomerFactory.createWithAddress(input.name, new Address(
            input.address.street, input.address.number, input.address.zip, input.address.city
        ))

        await this.repository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            }
        }
    }
}

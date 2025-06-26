import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { OutputCreateCustomerDto } from "../create/create.customer.dto";
import { InputUpdateCustomerDto } from "./update.customer.dto";
export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputCreateCustomerDto> {
        const costumer = await this.customerRepository.find(input.id);
        costumer.changeName(input.name);
        costumer.changeAddress(new Address(input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city));
        await this.customerRepository.update(costumer);

        return {
            id: costumer.id,
            name: costumer.name,
            address: {
                street: costumer.Address.street,
                number: costumer.Address.number,
                zip: costumer.Address.zip,
                city: costumer.Address.city,
            }
        }
    }
}

import { UpdateProductUseCase } from "./update.product.usecase"


const result = {
    id: "1",
    name: "Product 1",
    price: 100
}

const input = {
    id: "1",
    name: "Product 2",
    price: 150
}



const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(result)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test for updating product use case', () => {
    it('Should update a product', async()=>{
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        const output = await updateProductUseCase.execute(input);
        expect(productRepository.update).toHaveBeenCalled();
        expect(productRepository.update).toHaveBeenCalledWith({
            _id: input.id,
            _name: input.name,
            _price: input.price
        });

    })
})

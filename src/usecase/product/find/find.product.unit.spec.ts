import ProductFactory from "../../../domain/product/factory/product.factory"
import { FindProductUseCase } from "./find.product.usecase";

const input = {
    id: "1"
}

const output = ProductFactory.create("a", "Product 1", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(output)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit tests for find product', ()=>{
    it('Should find a product', async () => {
        const productRepository = MockRepository();
        const productFindUseCase = new FindProductUseCase(productRepository);
        const result = await productFindUseCase.execute(input);
        expect(result).toEqual({
            id: output.id,
            name: output.name,
            price: output.price
        })
    })
})

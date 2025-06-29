import ProductFactory from "../../../domain/product/factory/product.factory";
import { ListProductsUseCase } from "./list.product.usecase";

const input = {
    id: "1"
}

const output1 = ProductFactory.create("a", "Product 1", 100);
const output2 = ProductFactory.create("b", "Product 2", 100);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([output1, output2])),
        create: jest.fn(),
        update: jest.fn()
    }
}
describe('It should test list products',()=>{
    it('Should list products', async()=>{
        const repository = MockRepository();
        const useCase = new ListProductsUseCase(repository);
        const result = await useCase.execute({});
        expect(result.products).toHaveLength(2);
        expect(result.products[0]).toEqual({
            id: output1.id,
            name: output1.name,
            price: output1.price
        });
        expect(result.products[1]).toEqual({
            id: output2.id,
            name: output2.name,
            price: output2.price
        });
    })
})

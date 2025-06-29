import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: "Product 1",
    price: 100,
    type: "a"
}
const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
    }
}
describe("Unit test for creating product use case", () => {
    it("Should create a product", async () => {
        const productRepository = MockRepository();
        const poductCreateUseCase = new CreateProductUseCase(productRepository);
        const output = await poductCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
            type: input.type
        });
    })
    it("Should Throw an error when type doesn't exists", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        await expect(productCreateUseCase.execute({
            ...input,
            type: "c"
        })).rejects.toThrow(
            "Product type not supported"
        );
    })
})

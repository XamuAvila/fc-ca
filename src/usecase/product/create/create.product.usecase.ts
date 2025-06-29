import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductInterface, OutputCreateProductInterface } from "./create.product.dto";
export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }
    async execute(input: InputCreateProductInterface): Promise<OutputCreateProductInterface> {
        const productFactory = ProductFactory.create(input.type, input.name, input.price);
        const product = new Product(productFactory.id, productFactory.name, productFactory.price);
        await this.productRepository.create(product);

        return {
            id: productFactory.id,
            name: productFactory.name,
            price: productFactory.price,
            type: input.type
        };
    }
}

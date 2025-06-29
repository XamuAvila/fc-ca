import { where } from "sequelize";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import Product from "../../../domain/product/entity/product";

export class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface
  constructor(private _productRepository:ProductRepositoryInterface) {
    this.productRepository = _productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const productDb = await this.productRepository.find(input.id);
    const product = new Product(productDb.id, productDb.name, productDb.price); 
    product.changeName(input.name);
    product.changePrice(input.price);
    await this.productRepository.update(product);
    return;
  }
}

import { Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import RepoService from '../repo.service';
import Produtos from '../db/models/produtos.entity';
import ProdutosInput, { DeleteProduto } from './input/produtos.input';

@Resolver()
export default class ProdutoResolver{
    constructor(private readonly repoService: RepoService) {}

    @Query(() => [Produtos])
    public async BuscarProdutos(): Promise<Produtos[]> {
        return this.repoService.produtoRepo.find();
    }

    @Query(() => [Produtos], {nullable: true})
    public async ObterProdutoComMenorEstoque(): Promise<Produtos[]>{
        
        return this.repoService.produtoRepo.find(
            {
                where: {
                    QUANTIDADE_EM_ESTOQUE: {_lt: 5}
                }
            })
    }


    @Query(() => Produtos, { nullable: true })
    public async BuscarProdutoPorId(@Args('id') id:number): Promise<Produtos>{
        return this.repoService.produtoRepo.findOne(id);
    }

    @Mutation(() => Produtos)
    public async AdicionarProduto(@Args('data') input: ProdutosInput): Promise<Produtos>{
        const produto = this.repoService.produtoRepo.create({NOME_DO_PRODUTO: input.nome, FABRICANTE: input.fabricante, QUANTIDADE_EM_ESTOQUE: input.qtdEstoque, VALOR: input.valor})
        return this.repoService.produtoRepo.save(produto)
    }

    @Mutation(() => Produtos, { nullable: true })
    public async DeletarProduto(@Args('data') input: DeleteProduto,): Promise<Produtos> {
        const produto = await this.repoService.produtoRepo.findOne(input.id)
        
        if(!produto)  return null;
        
        const copia = { ...produto };

        await this.repoService.produtoRepo.remove(produto);    

        return copia;
    }
}
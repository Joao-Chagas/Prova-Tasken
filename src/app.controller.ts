import { Body, Controller, Delete, Get, Post, Param, Put } from '@nestjs/common';
import  RepoService  from './repo.service';
import Produtos from './db/models/produtos.entity';
import ProdutosInput, { DeleteProduto } from './resolvers/input/produtos.input';
import { Args } from '@nestjs/graphql';
import { LessThan, MoreThan } from 'typeorm'
@Controller()
export class AppController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  async getHello(): Promise<string> {
    return 'inicio';
  }

  @Get('BuscarProdutos')
  async buscarProdutos(): Promise<Produtos[]>{
    return await this.repoService.produtoRepo.find();
  }

  @Get('ObterProdutoSemEstoque')
  async obterProdComSemEstoque(): Promise<Produtos[]>{
    return this.repoService.produtoRepo.find({
      where: {
        QUANTIDADE_EM_ESTOQUE: LessThan(5)
      }
    })
  }

  @Get('ObterProdutoComMaiorEstoque')
  async obterProdComMaiorEstoque(): Promise<Produtos[]>{
    return this.repoService.produtoRepo.find({
      order: {
        QUANTIDADE_EM_ESTOQUE: 'DESC'
      },
      take: 1
    })
  }

  @Get('ObterProdutoComMenorEstoque')
  async obterProdComMenorEstoque(): Promise<Produtos[]>{
    return this.repoService.produtoRepo.find({
      order: {
        QUANTIDADE_EM_ESTOQUE: 'ASC'
      },
      take: 1
    })
  }

  @Get('ObterQuantidadeProdutos')
  async obterQuantidadeProdutos(): Promise<String>{
    const [ , num ] = await this.repoService.produtoRepo.findAndCount()
    return `Atualmente há ${num} na tabela`;
  }

  @Post('AdicionarProduto')
  async adiconarProduto(@Body() input: ProdutosInput): Promise<Produtos>{
    console.log(input.nome)
    const produto = this.repoService.produtoRepo.create({NOME_DO_PRODUTO: input.nome, FABRICANTE: input.fabricante, QUANTIDADE_EM_ESTOQUE: input.qtdEstoque, VALOR: input.valor})
    return this.repoService.produtoRepo.save(produto)
  }

  @Put('AlterarProduto/:id')
  async alterarProduto(@Param('id') params:number, @Body() input: Produtos) : Promise<string> {  
    this.repoService.produtoRepo.update(params,input);
      return 'O produto foi alterado com sucesso!';

  }

  @Delete('DeletarProduto/:id')
  async deletarProduto(@Param('id') params): Promise<string>{
    const produto = await this.repoService.produtoRepo.findOne(params.id)
        
    if(!produto)  return null;
    
    const copia = { ...produto };

    await this.repoService.produtoRepo.remove(produto);    

    return `O produto ${ copia.NOME_DO_PRODUTO } foi deletado com sucesso`;
  }
  

}

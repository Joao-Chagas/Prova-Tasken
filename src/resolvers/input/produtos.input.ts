import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class ProdutosInput {
    @Field()
    readonly nome: string
    @Field()
    readonly fabricante: string
    @Field()
    readonly qtdEstoque: number
    @Field()
    readonly valor: number
}
@InputType()
export class EstoqueProdutos{
    @Field()
    readonly qtdEstoque: number;
}

@InputType()
export class DeleteProduto{
    @Field()
    readonly id: number;
}
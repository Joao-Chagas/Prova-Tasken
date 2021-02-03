import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name:'Produtos'})
export default class Produtos {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar')
  NOME_DO_PRODUTO: string;

  @Field()
  @Column('varchar')
  FABRICANTE: string;

  @Field()
  @Column('integer')
  QUANTIDADE_EM_ESTOQUE: number;

  @Field()
  @Column('decimal')
  VALOR: number;
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import RepoModule from './repo.module';
import * as ormOptions from './config/orm';

import ProdutosResolver from './resolvers/produtos.resolver'
import { GraphQLModule } from '@nestjs/graphql';

const gqlImports = [ProdutosResolver]

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), RepoModule, ...gqlImports,  GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    playground: true,
})],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

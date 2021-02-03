import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import Produtos from './db/models/produtos.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ Produtos ])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
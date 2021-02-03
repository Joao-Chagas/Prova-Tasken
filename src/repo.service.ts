import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Produtos from './db/models/produtos.entity'

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Produtos) public readonly produtoRepo: Repository<Produtos>,
  ){}
}

export default RepoService;
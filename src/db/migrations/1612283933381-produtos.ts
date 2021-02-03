import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class produtos1612283933381 implements MigrationInterface {

    public table = new Table({
        name: 'produtos',
        columns: [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name:'NOME_DO_PRODUTO',
                type: 'varchar',
                length: '255',
                isNullable: false,
            },
            {
                name:'FABRICANTE',
                type: 'varchar',
                length: '255',
                isNullable: false,
            },
            {
                name:'QUANTIDADE_EM_ESTOQUE',
                type: 'integer',
                isNullable: false,
            },
            {
                name:'VALOR',
                type: 'decimal',
                isNullable: false,
            },
        ]
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}

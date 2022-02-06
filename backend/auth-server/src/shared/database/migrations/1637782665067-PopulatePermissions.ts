import { query } from "express";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulatePermissions1637782665067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Administrador', 'administrador', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Visualizar Dashboard', 'dashboard', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Acessar as ferramentas', 'user-tools-acess', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Visualizar dados e estatísticas', 'view-statistics', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Listar Instituições', 'read-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Visualizar detalhes de uma instituição', 'read-institution-detail', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Adicionar instituição', 'add-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Excluir uma instituiçãoo', 'delete-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Atualizar Organização', 'institution-update', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Habilitar instituição ', 'enable-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Desabilitar instituição ', 'disable-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Bloquear instituição ', 'block-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Exportar instituição ', 'export-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Imprimir instituição ', 'print-institution', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Listar usuários ', 'read-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Visualizar  detalhes de um usuário ', 'read-user-detail', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Adicionar usuário ', 'add-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Editar usuário ', 'edit-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Excluir usuário ', 'delete-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Desabilitar usuário ', 'disable-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Habilitar usuário ', 'enable-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Bloquear usuário ', 'block-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Exportar usuários ', 'export-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Imprimir usuários ', 'print-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Importar usuários ', 'import-user', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Visualizar estatísticas e dados ', 'user-data', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Visualizar ajuda', 'read-help', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Listar Relatórios', 'report-list', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Listar Alarmes', 'alarms-list', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Anexar Documento', 'upload-doc', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Adicionar planos', 'add-plan', true );
            INSERT INTO public."permission" ( name, value, active ) VALUES ( 'Editar planos', 'edit-plan', true );
        `)

        await queryRunner.query(`
                        INSERT INTO public."group"
                        ( "name", organization_id)
                        VALUES( 'Administrador Sistema', NULL);
                        
                        INSERT INTO public."group"
                        ( "name", organization_id)
                        VALUES( 'Administrador da Instituição', NULL);

                        INSERT INTO public."group"
                        ( "name", organization_id)
                        VALUES( 'Coordenador da Instituição', NULL);
                        
                        INSERT INTO public."group"
                        ( "name", organization_id)
                        VALUES( 'Professor da Instituição', NULL);
                        
                        INSERT INTO public."group"
                        ( "name", organization_id)
                        VALUES( 'Aluno da Instituição', NULL);
                `)

        await queryRunner.query(`
                        INSERT INTO public.user_has_group
                        (user_id, group_id)
                        VALUES( 
                            (select id from "user" where email = 'eachonetest@gmail.com'),
                            (select id from "group" where name = 'Administrador Sistema')
                        );
                `)

        await queryRunner.query(`

                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'add-user')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'read-user')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'edit-user')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'delete-user')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'disable-user')
                    );
                    
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'enable-user')
                    );
                    
                    
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'block-user')
                    );
                    
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'export-user')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'import-user')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'import-user')
                    );
                    
                    
                
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'read-institution-detail')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'add-institution')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'delete-institution')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'institution-update')
                    );

                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'read-user-detail')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'enable-institution')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'disable-institution')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'block-institution')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'export-institution')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'print-institution')
                    );
                    
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'print-user')
                    );
                    
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'read-help')
                    );
                    
                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'dashboard')
                    );

                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'add-plan')
                    );

                    INSERT INTO public.group_has_permission
                    (group_id, permission_id)
                    VALUES( 
                        (select id from "group" where name = 'Administrador Sistema'),
                        (select id from "permission" where value = 'edit-plan')
                    );
                `)

        await queryRunner.query(`
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'add-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'read-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'edit-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'delete-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'disable-user')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'enable-user')
                );
                
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'block-user')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'export-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'import-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'import-user')
                );
                
                
            
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'read-institution-detail')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'add-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'delete-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'institution-update')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'enable-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'disable-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'block-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'export-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'print-institution')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'print-user')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'read-help')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Coordenador da Instituição'),
                    (select id from "permission" where value = 'dashboard')
                );

                `)

        await queryRunner.query(`
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'add-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'read-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'edit-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'delete-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'disable-user')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'enable-user')
                );
                
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'block-user')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'export-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'import-user')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'import-user')
                );
                
                
            
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'read-institution-detail')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'add-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'delete-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'institution-update')
                );

                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'read-user-detail')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'enable-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'disable-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'block-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'export-institution')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'print-institution')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'print-user')
                );
                
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'read-help')
                );
                
                INSERT INTO public.group_has_permission
                (group_id, permission_id)
                VALUES( 
                    (select id from "group" where name = 'Administrador da Instituição'),
                    (select id from "permission" where value = 'dashboard')
                );

                `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS permission`);
        await queryRunner.query(`DROP TABLE IF EXISTS group`);
        await queryRunner.query(`DROP TABLE IF EXISTS group_has_permission`);
        await queryRunner.query(`DROP TABLE IF EXISTS public.user_has_group`);
    }
}



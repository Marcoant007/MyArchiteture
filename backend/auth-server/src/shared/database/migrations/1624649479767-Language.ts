import { MigrationInterface, QueryRunner } from "typeorm";

export class Language1624649479766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        INSERT INTO public."language" (name, img_ico, enable)
                            VALUES    ('PT-BR', 'https://eachone-dev001.s3.amazonaws.com/brazil.svg', true);

        INSERT INTO public."language"  (name, img_ico, enable)
                                VALUES ('EN-US', 'https://eachone-dev001.s3.amazonaws.com/eua.svg', true);

        INSERT INTO public."language"  (name, img_ico, enable)
                                VALUES ('ES-ES', 'https://eachone-dev001.s3.amazonaws.com/spain.svg', false);
        `);

        await queryRunner.query(`
        INSERT INTO public.help_pages (id, title, filename, code, language_id)
                        VALUES        (default ,'Dashboard', 'dashboard.md', '1', (select id from public."language" where name = 'PT-BR'));

        INSERT INTO public.help_pages (id, title, filename, code, language_id)
                            VALUES    (default ,'Dashboard', 'dashboard-en.md', '2', (select id from public."language" where name = 'EN-US'));

        INSERT INTO public.help_pages (id, title, filename, code, language_id)
                            VALUES    (default ,'Dashboard', 'dashboard-es.md', '3', (select id from public."language" where name = 'ES-ES'));
        `);
        await queryRunner.query(`
        INSERT INTO public.help_pages
        (id, title, filename, code, language_id)
        VALUES(default ,'Help', 'help.md', '4', (select id from public."language" where name = 'PT-BR'));

        INSERT INTO public.help_pages
        (id, title, filename, code, language_id)
        VALUES(default ,'Help', 'help-en.md', '5', (select id from public."language" where name = 'EN-US'));

        INSERT INTO public.help_pages
        (id, title, filename, code, language_id)
        VALUES(default ,'Help', 'help-es.md', '6', (select id from public."language" where name = 'ES-ES'));`);

        await queryRunner.query(`INSERT INTO public.help_pages
        (id, title, filename, code, language_id)
        VALUES(default ,'Organization', 'organization.md', '7', (select id from public."language" where name = 'PT-BR'));

        INSERT INTO public.help_pages
        (id, title, filename, code, language_id)
        VALUES(default ,'Organization', 'organization-en.md', '8', (select id from public."language" where name = 'EN-US'));

        INSERT INTO public.help_pages
        (id, title, filename, code, language_id)
        VALUES(default ,'Organization', 'organization-es.md', '9', (select id from public."language" where name = 'ES-ES'));`);


        await queryRunner.query(`
        INSERT INTO public.profile(name)
        VALUES('Administrador');

        INSERT INTO public.profile(name)
        VALUES('Coordenador');

        INSERT INTO public.profile(name)
        VALUES('Professor');

        INSERT INTO public.profile(name)
        VALUES('Aluno');`);

        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard.md'), 
            (select id from public.profile where name = 'Administrador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard-en.md'),
            (select id from public.profile where name = 'Administrador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'dashboard-es.md'), 
            (select id from public.profile where name = 'Administrador'));

    `);

        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard.md'), 
            (select id from public.profile where name = 'Professor'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard-en.md'),
            (select id from public.profile where name = 'Professor'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'dashboard-es.md'), 
            (select id from public.profile where name = 'Professor'));
    `);

        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard.md'), 
            (select id from public.profile where name = 'Coordenador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard-en.md'),
            (select id from public.profile where name = 'Coordenador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'dashboard-es.md'), 
            (select id from public.profile where name = 'Coordenador'));

    `);

        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard.md'), 
            (select id from public.profile where name = 'Aluno'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'dashboard-en.md'),
            (select id from public.profile where name = 'Aluno'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'dashboard-es.md'), 
            (select id from public.profile where name = 'Aluno'));

    `);


        await queryRunner.query(`
            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'help.md'), 
                (select id from public.profile where name = 'Administrador'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'help-en.md'),
                (select id from public.profile where name = 'Administrador'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES((select id from public.help_pages where filename = 'help-es.md'), 
                (select id from public.profile where name = 'Administrador'));

        `);

        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'help.md'), 
            (select id from public.profile where name = 'Professor'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'help-en.md'),
            (select id from public.profile where name = 'Professor'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'help-es.md'), 
            (select id from public.profile where name = 'Professor'));

    `);
        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'help.md'), 
            (select id from public.profile where name = 'Coordenador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'help-en.md'),
            (select id from public.profile where name = 'Coordenador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'help-es.md'), 
            (select id from public.profile where name = 'Coordenador'));

    `);
        await queryRunner.query(`
            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'help.md'), 
                (select id from public.profile where name = 'Aluno'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'help-en.md'),
                (select id from public.profile where name = 'Aluno'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES((select id from public.help_pages where filename = 'help-es.md'), 
                (select id from public.profile where name = 'Aluno'));

        `);

        await queryRunner.query(`
            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'organization.md'),
                (select id from public.profile where name = 'Administrador'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'organization-en.md'),
                (select id from public.profile where name = 'Administrador'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES((select id from public.help_pages where filename = 'organization-es.md'), 
                (select id from public.profile where name = 'Administrador'));
        `);

        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'organization.md'), 
            (select id from public.profile where name = 'Professor'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'organization-en.md'),
            (select id from public.profile where name = 'Professor'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'organization-es.md'), 
            (select id from public.profile where name = 'Professor'));

    `);
        await queryRunner.query(`
        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'organization.md'), 
            (select id from public.profile where name = 'Coordenador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES(
            (select id from public.help_pages where filename = 'organization-en.md'),
            (select id from public.profile where name = 'Coordenador'));

        INSERT INTO public.help_has_profile
        (help_id, profile_id)
        VALUES((select id from public.help_pages where filename = 'organization-es.md'), 
            (select id from public.profile where name = 'Coordenador'));

    `);
        await queryRunner.query(`
            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'organization.md'), 
                (select id from public.profile where name = 'Aluno'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES(
                (select id from public.help_pages where filename = 'organization-en.md'),
                (select id from public.profile where name = 'Aluno'));

            INSERT INTO public.help_has_profile
            (help_id, profile_id)
            VALUES((select id from public.help_pages where filename = 'organization-es.md'), 
                (select id from public.profile where name = 'Aluno'));

        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS language`);
        await queryRunner.query(`DROP TABLE IF EXISTS help_pages`);
        await queryRunner.query(`DROP TABLE IF EXISTS profile`);
        await queryRunner.query(`DROP TABLE IF EXISTS help_has_profile`);
    }

}

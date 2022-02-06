import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1624649479766 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              
            CREATE TABLE IF NOT EXISTS city (
              id serial not null,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name varchar(255),
              uf varchar(2),
              CONSTRAINT pk_city PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS address (
              id serial not null,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              zip_code varchar(10),
              number_address varchar(45),
              complement varchar(255),
              street_name varchar(255),
              city_id int4,
              CONSTRAINT pk_address_user PRIMARY KEY (id),
              CONSTRAINT fk_address_user_city FOREIGN KEY (city_id) REFERENCES city(id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS language(
              id SERIAL NOT NULL,
              name VARCHAR(255) NOT NULL,
              img_ico VARCHAR(255),
              enable BOOLEAN NOT NULL,
              CONSTRAINT pk_language PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS status_organization (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              status VARCHAR(50) NOT NULL,
              CONSTRAINT pk_status_empresa PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS organization (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(255) NOT NULL,
              active BOOLEAN NOT NULL DEFAULT false,
              blocked BOOLEAN DEFAULT false,
              status_organization_id int4 NULL,
              cnpj VARCHAR(14) NULL,
              url_logo TEXT NULL,
              code VARCHAR(255) NULL,
              cell_phone VARCHAR(20) NULL,
              comercial_phone VARCHAR(20) NULL,
              email VARCHAR(255) NULL,
              description VARCHAR(255) NULL,
              responsible VARCHAR(50) NULL,
              company_name VARCHAR(50) NULL,
              state_registration VARCHAR(36) NULL,
              CONSTRAINT pk_organization PRIMARY KEY (id),
              CONSTRAINT fk_organization_status_organization FOREIGN KEY (status_organization_id) REFERENCES status_organization (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT uc_organization_code UNIQUE(code)
            );
            
            CREATE TABLE IF NOT EXISTS organization_has_language (
              id SERIAL NOT NULL,
              language_id int4 NOT NULL,
              organization_id int4 NOT NULL,
              CONSTRAINT pk_organization_has_language PRIMARY KEY (id),
              CONSTRAINT fk_organization_has_language_language FOREIGN KEY (language_id) REFERENCES public.language (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_organization_has_language_organization FOREIGN KEY (organization_id) REFERENCES public.organization (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS "group" (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(255) NOT NULL,
              organization_id int4 NULL,
              CONSTRAINT pk_group PRIMARY KEY (id),
              CONSTRAINT fk_group_organization FOREIGN KEY (organization_id) REFERENCES organization (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS "user" (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(255) NOT NULL,
              password VARCHAR(255) NOT NULL,
              active BOOLEAN NOT NULL DEFAULT true,
              code VARCHAR(255) NULL,
              email VARCHAR(255) NOT NULL,
              temporary_password BOOLEAN NOT NULL DEFAULT false,
              email_checked BOOLEAN NOT NULL DEFAULT true,
              url_img VARCHAR(255) NULL,
              organization_id int4 NULL,
              blocked BOOLEAN DEFAULT false,
              cpf VARCHAR(15) NOT NULL,
              registration VARCHAR(255),
              user_type VARCHAR(255),
              first_acess BOOLEAN DEFAULT false,
              attempt int DEFAULT 0,
              cellphone varchar(16) NULL,
              comercial_phone varchar(16) NULL,
              birth_date date NULL,
              address_id int4 NULL,
              deleted BOOLEAN DEFAULT false,
              CONSTRAINT pk_user PRIMARY KEY (id),
              CONSTRAINT fk_address_user FOREIGN KEY (address_id) REFERENCES address (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_user_organization FOREIGN KEY (organization_id) REFERENCES organization (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS course (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(45) NOT NULL,
              description VARCHAR(500),
              course_type VARCHAR(45),
              period_course VARCHAR(45),
              active BOOLEAN DEFAULT FALSE,
              deleted BOOLEAN DEFAULT FALSE,
              img_course VARCHAR(255) NULL,
              CONSTRAINT pk_course PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS class (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              code_class VARCHAR(45) NOT NULL,
              course_id INT NOT NULL,
              start_date Date NULL,
              deleted BOOLEAN DEFAULT false,
              grid INT NULL,
              name VARCHAR(45),
              CONSTRAINT pk_class PRIMARY KEY (id),
              CONSTRAINT fk_course_id FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS post (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              root_post_id INT,
              date_post DATE,
              content VARCHAR(255),
              name_of_responsible VARCHAR(255),
              likes INT,
              CONSTRAINT pk_post PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS topic (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              title VARCHAR(45) NOT NULL,
              description VARCHAR(255) NOT NULL,
              post_id INT NOT NULL,
              CONSTRAINT pk_topic PRIMARY KEY (id),
              CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS forum (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(45) NOT NULL,
              type CHAR NOT NULL,
              start_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              end_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              limit_post INT,
              forum_data_id INT,
              forum_topic_id INT NOT NULL,
              CONSTRAINT pk_forum PRIMARY KEY (id),
              CONSTRAINT fk_forum_topic FOREIGN KEY (forum_topic_id) REFERENCES topic (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS forum_data (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(45) NOT NULL,
              grade REAL,
              forum_id INT NOT NULL,
              criterion CHAR NOT NULL,
              CONSTRAINT pk_forum_data PRIMARY KEY (id),
              CONSTRAINT fk_forum_id FOREIGN KEY (forum_id) REFERENCES forum (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS subject (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(45) NOT NULL,
              subject_code VARCHAR(45) NOT NULL,
              img_url VARCHAR(45),
              forum_id INT NOT NULL,
              CONSTRAINT pk_subject PRIMARY KEY (id),
              CONSTRAINT fk_forum FOREIGN KEY (forum_id) REFERENCES forum (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS task (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(45) NOT NULL,
              subject_code VARCHAR(45) NOT NULL,
              description VARCHAR(255),
              score NUMERIC,
              average NUMERIC,
              number_of_retries INT,
              file_answer VARCHAR(255),
              feedback VARCHAR(255),
              CONSTRAINT pk_task PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS content (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(45) NOT NULL,
              initial_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              end_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              task_id INT NOT NULL,
              CONSTRAINT pk_content PRIMARY KEY (id),
              CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES task (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS lesson (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(45) NOT NULL,
              subject_code VARCHAR(45) NOT NULL,
              description VARCHAR(255),
              link_video VARCHAR(255),
              file_lesson VARCHAR(255),
              CONSTRAINT pk_lesson PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS course_has_subject (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              course_id INT4 NOT NULL,
              subject_id INT4 NOT NULL,
              CONSTRAINT pk_course_has_subject PRIMARY KEY (id),
              CONSTRAINT fk_course_id FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_subject_id FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS class_has_subject (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              class_id INT NOT NULL,
              subject_id INT NOT NULL,
              CONSTRAINT pk_class_has_subject PRIMARY KEY (id),
              CONSTRAINT fk_class_id FOREIGN KEY (class_id) REFERENCES class (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_subject_id FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS user_has_class (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              user_id INT4 NOT NULL,
              class_id INT4 NOT NULL,
              CONSTRAINT pk_user_has_class PRIMARY KEY (id),
              CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public."user" (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_class_id FOREIGN KEY (class_id) REFERENCES class (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS assessement (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              content_id int4 NOT NULL,
              title VARCHAR(255),
              score FLOAT,
              average FLOAT,
              number_of_retries INT,
              initial_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              end_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              duration TIME,
              sort_questions BOOLEAN DEFAULT false,
              sort_options BOOLEAN DEFAULT false,
              feedback_type VARCHAR(45),
              CONSTRAINT pk_assessement PRIMARY KEY (id),
              CONSTRAINT fk_content_id FOREIGN KEY (content_id) REFERENCES content (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS open_question (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              title VARCHAR(255) NOT NULL,
              answer TEXT NOT NULL,
              file_answer VARCHAR(45),
              feedback VARCHAR(45),
              CONSTRAINT pk_open_question PRIMARY KEY (id)
            );

            CREATE TABLE IF NOT EXISTS multiple_choices (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              title VARCHAR(45) NOT NULL,
              feedback VARCHAR(45),
              CONSTRAINT pk_multiple_choices PRIMARY KEY (id)
            );

            CREATE TABLE IF NOT EXISTS options (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              multiple_choice_id INT4 NOT NULL,
              title VARCHAR(255) NOT NULL,
              feedback VARCHAR(45),
              isCorrect BOOLEAN DEFAULT false,
              CONSTRAINT pk_options PRIMARY KEY (id),
              CONSTRAINT fk_multiple_choice_id FOREIGN KEY (multiple_choice_id) REFERENCES multiple_choices (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS true_false (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              title VARCHAR(255) NOT NULL,
              CONSTRAINT pk_true_false PRIMARY KEY (id)
            );

            CREATE TABLE IF NOT EXISTS setences (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              title VARCHAR(255) NOT NULL,
              true_false_id INT4 NOT NULL,
              feedback VARCHAR(255),
              isCorrect BOOLEAN DEFAULT false,
              CONSTRAINT pk_setences PRIMARY KEY (id),
              CONSTRAINT fk_true_false_id FOREIGN KEY (true_false_id) REFERENCES true_false (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS assessement_feedback (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              message_type VARCHAR(45) NOT NULL,
              messages TEXT NOT NULL,
              CONSTRAINT pk_assessement_feedback PRIMARY KEY (id)
            );

            CREATE TABLE IF NOT EXISTS assessement_has_multiple_choices (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              assessement_id INT4 NOT NULL,
              multiple_choice_id INT4 NOT NULL,
              CONSTRAINT pk_assessement_has_multiple_choices PRIMARY KEY (id),
              CONSTRAINT fk_assessement_id FOREIGN KEY (assessement_id) REFERENCES assessement (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_multiple_choice_id FOREIGN KEY (multiple_choice_id) REFERENCES multiple_choices (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS assessement_has_feedback (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              assessement_id INT4 NOT NULL,
              feedback_id INT4 NOT NULL,
              CONSTRAINT pk_assessement_has_feedback PRIMARY KEY (id),
              CONSTRAINT fk_assessement_id FOREIGN KEY (assessement_id) REFERENCES assessement (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_feedback_id FOREIGN KEY (feedback_id) REFERENCES assessement_feedback (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS assessement_has_true_false (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              assessement_id INT4 NOT NULL,
              true_false_id INT4 NOT NULL,
              CONSTRAINT pk_assessement_has_true_false PRIMARY KEY (id),
              CONSTRAINT fk_assessement_id FOREIGN KEY (assessement_id) REFERENCES assessement (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_true_false_id FOREIGN KEY (true_false_id) REFERENCES true_false (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS assessement_has_open_question (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              open_question_id INT4 NOT NULL,
              assessement_id INT4 NOT NULL,
              CONSTRAINT pk_assessement_has_open_question PRIMARY KEY (ID),
              CONSTRAINT fk_open_question_id FOREIGN KEY (open_question_id) REFERENCES open_question (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_assessement_id FOREIGN KEY (assessement_id) REFERENCES assessement (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );

            CREATE TABLE IF NOT EXISTS user_has_subject (
              id SERIAL NOT NULL,
              user_id int4 NOT NULL,
              subject_id int4 NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              initial_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              end_date timestamptz DEFAULT CURRENT_TIMESTAMP,
              lack INT,
              note FLOAT,
              status VARCHAR(45) NOT NULL,
              progress FLOAT,
              CONSTRAINT pk_user_has_subject PRIMARY KEY (id), 
              CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public."user" (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_subject_id FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE SEQUENCE user_code_sequence;
            
            CREATE TABLE IF NOT EXISTS user_has_group (
              id SERIAL NOT NULL,
              user_id int4 NOT NULL,
              group_id int4 NOT NULL,
              CONSTRAINT pk_user_has_group PRIMARY KEY (id),
              CONSTRAINT fk_user_has_group_user FOREIGN KEY (user_id) REFERENCES public.user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_user_has_group_group FOREIGN KEY (group_id) REFERENCES public.group (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
 
            CREATE TABLE IF NOT EXISTS tenant (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(255) NOT NULL,
              organization_id int4 NOT NULL,
              CONSTRAINT pk_tenant PRIMARY KEY (id),
              CONSTRAINT fk_tenant_organization FOREIGN KEY (organization_id) REFERENCES organization (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS permission (
              id SERIAL NOT NULL,
              created_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz not null DEFAULT CURRENT_TIMESTAMP,
              name VARCHAR(255) NOT NULL,
              value VARCHAR(255) NOT NULL,
              active BOOLEAN NOT NULL DEFAULT false,
              CONSTRAINT pk_permission PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS profile(
              id SERIAL NOT NULL,
              name VARCHAR(255) NOT NULL,
              CONSTRAINT pk_profile PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS help_pages(
              id SERIAL NOT NULL,
              title VARCHAR(255) NOT NULL,
              filename VARCHAR(255) NOT NULL,
              code VARCHAR(255) NOT NULL,
              language_id int4,
              CONSTRAINT fk_language FOREIGN KEY (language_id) REFERENCES language (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT pk_help_pages PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS help_has_profile(
              id SERIAL NOT NULL,
              help_id int4 NOT NULL,
              profile_id int4 NOT null,
              CONSTRAINT pk_help_has_profile PRIMARY KEY (id),
              CONSTRAINT fk_help_has_profile FOREIGN KEY (help_id) REFERENCES help_pages (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_profile_has_help FOREIGN KEY (profile_id) REFERENCES profile (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE IF NOT EXISTS group_has_permission (
              id SERIAL NOT NULL,
              group_id int4 NOT NULL,
              permission_id int4 NOT NULL,
              CONSTRAINT pk_group_has_permission PRIMARY KEY (id),
              CONSTRAINT fk_group_has_permission_group FOREIGN KEY (group_id) REFERENCES public.group (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_group_has_permission_permission FOREIGN KEY (permission_id) REFERENCES permission (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE public.plan (
              id serial NOT NULL,
              created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              name varchar(255) NOT NULL,
              value numeric(10, 2) NOT NULL,
              monthly_value numeric(10, 2) NOT NULL,
              users int4 NOT NULL,
              validity date NOT NULL,
              description varchar NOT NULL,
              active boolean NOT NULL DEFAULT true,
              CONSTRAINT pk_plan PRIMARY KEY (id)
            );
            
            CREATE TABLE IF NOT EXISTS plan_has_language (
              id SERIAL NOT NULL,
              language_id int4 NOT NULL,
              plan_id int4 NOT NULL,
              CONSTRAINT pk_plan_has_language PRIMARY KEY (id),
              CONSTRAINT fk_plan_has_language_language FOREIGN KEY (language_id) REFERENCES public.language (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
              CONSTRAINT fk_plan_id_has_language_plan_id FOREIGN KEY (plan_id) REFERENCES public.plan (id) ON DELETE NO ACTION ON UPDATE NO ACTION
            );
            
            CREATE TABLE public.plan_has_organization (
              id serial4 NOT NULL,
              created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              created_by int4 NOT NULL,
              updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              organization_id int4 NOT NULL,
              plan_id int4 NOT NULL,
              CONSTRAINT pk_plan_has_organization PRIMARY KEY (id),
              CONSTRAINT fk_plan_has_organization_organization FOREIGN KEY (organization_id) REFERENCES public."organization"(id),
              CONSTRAINT fk_plan_has_organization_plan FOREIGN KEY (plan_id) REFERENCES public."plan"(id)
            );
            
            CREATE TABLE public.credit_card (
              id serial4 NOT NULL,
              created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              created_by int4 NOT NULL,
              name varchar(255) NOT NULL,
              month int4 NOT NULL,
              year int4 NOT NULL,
              number varchar(20) NOT NULL,
              code varchar(10) NOT NULL,
              status varchar(50) NOT NULL,
              default_card bool NOT NULL DEFAULT false,
              organization_id int4 NOT NULL,
              CONSTRAINT pk_credit_card PRIMARY KEY (id),
              CONSTRAINT fk_credit_card_organization FOREIGN KEY (organization_id) REFERENCES public."organization"(id)
            );
            
            CREATE TABLE public.charge (
              id serial4 NOT NULL,
              created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
              value numeric(10, 2) NOT NULL,
              billing_date date NOT NULL,
              expiration_date date NOT NULL,
              payment_date date NULL,
              status varchar(50) NOT NULL,
              organization_id int4 NOT NULL,
              plan_id int4 NULL,
              credit_card_id int4 NULL,
              CONSTRAINT pk_charge PRIMARY KEY (id),
              CONSTRAINT fk_charge_organization FOREIGN KEY (organization_id) REFERENCES public."organization"(id),
              CONSTRAINT fk_charge_credit_card FOREIGN KEY (credit_card_id) REFERENCES public."credit_card"(id),
              CONSTRAINT fk_charge_credit_plan FOREIGN KEY (plan_id) REFERENCES public."plan"(id)
            );
                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                    DROP TABLE IF EXISTS status_organization;
                `);

    await queryRunner.query(`
                    DROP TABLE IF EXISTS organization;
                `);

    await queryRunner.query(`
                    DROP TABLE IF EXISTS group;
                `);

    await queryRunner.query(`
                    DROP TABLE IF EXISTS user;
                `);

    await queryRunner.query(`
                    DROP TABLE IF EXISTS user_has_group;
                `);

    await queryRunner.query(`
                    DROP TABLE IF EXISTS tenant;
                `);

    await queryRunner.query(`
                    DROP TABLE IF EXISTS permission;
                `);

    await queryRunner.query(`
                    DROP TABLE IF EXISTS group_has_permission;
                `);

    await queryRunner.query(`
                DROP TABLE IF EXISTS profile;
            `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS help_pages;
            `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS help_has_profile;
            `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS public.plan;
            `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS public.charge;
            `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS public.credit_card;
            `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS public.plan_has_organization
            `);


    await queryRunner.query(`
            DROP TABLE IF EXISTS language
            `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS organization_has_language;
            `)
  }
}

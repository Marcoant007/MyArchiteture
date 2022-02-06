import { MigrationInterface, QueryRunner } from "typeorm";

export class AlarmEvent1624649479800 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.alr_event_level (
          id SERIAL,
          value INT NOT NULL,
          label VARCHAR(45) NOT NULL,
          
          PRIMARY KEY (id));

        CREATE TABLE IF NOT EXISTS public.alr_event_category (
          id SERIAL,
          name VARCHAR(255) NOT NULL,
          
          PRIMARY KEY (id));
          
        CREATE TABLE IF NOT EXISTS public.alr_event_origin (
          id SERIAL,
          name VARCHAR(255) NOT NULL,
          
          PRIMARY KEY (id));

        CREATE TABLE IF NOT EXISTS public.alr_event_description (
          id SERIAL,
          content BYTEA NOT NULL,
          
          PRIMARY KEY (id));

        CREATE TABLE IF NOT EXISTS public.alr_event (
          id SERIAL,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          name VARCHAR(255) NOT NULL,
          user_id INT NULL,
          level_id INT NOT NULL,
          category_id INT NULL,
          origin_id INT NULL,
          organization_id INT NULL,
          description_id INT NULL,
          
          PRIMARY KEY (id),
          CONSTRAINT fk_alr_event_level_id
            FOREIGN KEY (level_id)
            REFERENCES public.alr_event_level (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
          CONSTRAINT fk_alr_event_category
            FOREIGN KEY (category_id)
            REFERENCES public.alr_event_category (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
          CONSTRAINT fk_alr_event_origin
            FOREIGN KEY (origin_id)
            REFERENCES public.alr_event_origin (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
          CONSTRAINT fk_alr_event_description
            FOREIGN KEY (description_id)
            REFERENCES public.alr_event_description (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION);

        CREATE TABLE IF NOT EXISTS public.alr_alarm (
          id SERIAL,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          who_saw_id INT NULL,
          who_checked_id INT NULL,
          event_id INT NOT NULL,

          PRIMARY KEY (id),
          CONSTRAINT fk_alr_alarm_event
            FOREIGN KEY (event_id)
            REFERENCES public.alr_event (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION);
            
        CREATE TABLE IF NOT EXISTS public.alr_action (
          id SERIAL,
          name VARCHAR(255) NOT NULL,

          PRIMARY KEY (id));

        CREATE TABLE IF NOT EXISTS public.alr_contact (
          id SERIAL,
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          updated_at TIMESTAMP NOT NULL DEFAULT now(),
          user_id INT NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NULL,
          organization_id INT NULL,

          PRIMARY KEY (id));

        CREATE TABLE IF NOT EXISTS public.alr_contact_has_action (
          id SERIAL,
          contact_id INT NOT NULL,
          action_id INT NOT NULL,
          
          PRIMARY KEY (id),
          CONSTRAINT fk_alr_alarm_contact
            FOREIGN KEY (contact_id)
            REFERENCES public.alr_contact (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
          CONSTRAINT fk_alr_alarm_action
            FOREIGN KEY (action_id)
            REFERENCES public.alr_action (id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION);

        INSERT INTO public.alr_action ("name") VALUES 
          ('Email'), 
          ('SMS');

        INSERT INTO public.alr_event_level ("value", "label") VALUES 
          (10, 'trace'),
          (20, 'debug'),
          (30, 'info'),
          (40, 'warn'),
          (50, 'error'),
          (60, 'fatal');

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_contact_has_action;
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_contact;
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_action;
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_alarm;
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_event;
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_event_description;
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_event_origin;
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS alr_event_category;
        `);

    await queryRunner.query(`
        DROP TABLE IF EXISTS alr_event_level;
    `);

  }
  
}

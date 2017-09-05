ALTER TABLE "term" DROP CONSTRAINT "fk_term_glossary_1";
ALTER TABLE "glossary" DROP CONSTRAINT "fk_glossary_domain_1";
ALTER TABLE "translation" DROP CONSTRAINT "fk_translation_language_1";
ALTER TABLE "translation" DROP CONSTRAINT "fk_translation_term_1";
ALTER TABLE "term_alternate" DROP CONSTRAINT "fk_term_alternate_term_1";
ALTER TABLE "alternate_translation" DROP CONSTRAINT "fk_alternate_translation_translation_1";
ALTER TABLE "expert" DROP CONSTRAINT "fk_expert_elucidom_user_1";
ALTER TABLE "expert" DROP CONSTRAINT "fk_expert_language_1";
ALTER TABLE "expert" DROP CONSTRAINT "fk_expert_domain_1";
ALTER TABLE "expert" DROP CONSTRAINT "fk_expert_glossary_1";
ALTER TABLE "user_request" DROP CONSTRAINT "fk_elucidom_request_request_type_1";
ALTER TABLE "user_request" DROP CONSTRAINT "fk_elucidom_request_elucidom_user_1";
ALTER TABLE "user_request" DROP CONSTRAINT "fk_elucidom_request_request_status_1";
ALTER TABLE "user_preference" DROP CONSTRAINT "fk_user_preference_elucidom_user_1";
ALTER TABLE "user_preference" DROP CONSTRAINT "fk_user_preference_preference_type_1";
ALTER TABLE "user_preference" DROP CONSTRAINT "fk_user_preference_preference_value_1";
ALTER TABLE "preference_value" DROP CONSTRAINT "fk_preference_value_preference_type_1";
ALTER TABLE "app_user" DROP CONSTRAINT "fk_elucidom_user_user_role_1";

DROP TABLE "language";
DROP TABLE "glossary";
DROP TABLE "term";
DROP TABLE "domain";
DROP TABLE "translation";
DROP TABLE "term_alternate";
DROP TABLE "alternate_translation";
DROP TABLE "expert";
DROP TABLE "app_user";
DROP TABLE "user_request";
DROP TABLE "request_type";
DROP TABLE "request_status";
DROP TABLE "user_preference";
DROP TABLE "preference_type";
DROP TABLE "preference_value";
DROP TABLE "user_role";

CREATE TABLE "language" (
"language_id" serial4 NOT NULL,
"language_name" varchar(255) NOT NULL,
PRIMARY KEY ("language_id") 
)
WITHOUT OIDS;

CREATE TABLE "glossary" (
"glossary_id" serial4 NOT NULL,
"glossary_name" varchar(255),
"domain_id" int4,
PRIMARY KEY ("glossary_id") 
)
WITHOUT OIDS;

CREATE TABLE "term" (
"term_id" serial4 NOT NULL,
"term" varchar(255) NOT NULL,
"glossary_id" int4 NOT NULL,
"term_definition" text,
"term_note" text,
"is_published" bool NOT NULL DEFAULT false,
PRIMARY KEY ("term_id") 
)
WITHOUT OIDS;

CREATE TABLE "domain" (
"domain_id" serial4 NOT NULL,
"domain_name" varchar(255),
PRIMARY KEY ("domain_id") 
)
WITHOUT OIDS;

CREATE TABLE "translation" (
"translation_id" serial4 NOT NULL,
"term_id" int4 NOT NULL,
"language_id" int4 NOT NULL,
"definition_translation" varchar(255),
"note_translation" varchar(255),
"is_published" bool NOT NULL DEFAULT false,
PRIMARY KEY ("translation_id") 
)
WITHOUT OIDS;

CREATE TABLE "term_alternate" (
"term_alternate_id" serial4 NOT NULL,
"term_id" int4 NOT NULL,
"alternate_term" varchar(255),
"is_published" bool DEFAULT false,
PRIMARY KEY ("term_alternate_id") 
)
WITHOUT OIDS;

CREATE TABLE "alternate_translation" (
"alternate_translation_id" serial4 NOT NULL,
"translation_id" int4,
"alternate_translation" varchar(255),
"is_published" bool DEFAULT false,
PRIMARY KEY ("alternate_translation_id") 
)
WITHOUT OIDS;

CREATE TABLE "expert" (
"expert_id" serial4 NOT NULL,
"user_id" int4 NOT NULL,
"language_id" int4,
"domain_id" int4,
"glossary_id" int4,
"start_date" date,
"end_date" date,
PRIMARY KEY ("expert_id") 
)
WITHOUT OIDS;

CREATE TABLE "app_user" (
"user_id" serial4 NOT NULL,
"email" varchar(255) NOT NULL,
"first_name" varchar(255),
"last_name" varchar(255),
"user_role_id" int4,
PRIMARY KEY ("user_id") 
)
WITHOUT OIDS;

CREATE TABLE "user_request" (
"request_id" serial4 NOT NULL,
"request_type_id" int4,
"requestor_user_id" int4,
"request_date" date,
"request_status_id" int4,
"disposition_date" date,
"assigned_user_id" int4,
"approved_by_user_id" int4,
"approval_deadline_date" date,
PRIMARY KEY ("request_id") 
)
WITHOUT OIDS;

CREATE TABLE "request_type" (
"request_type_id" serial4 NOT NULL,
"request_type_name" varchar(255),
PRIMARY KEY ("request_type_id") 
)
WITHOUT OIDS;

CREATE TABLE "request_status" (
"request_status_id" serial4 NOT NULL,
"request_status_name" varchar(255),
PRIMARY KEY ("request_status_id") 
)
WITHOUT OIDS;

CREATE TABLE "user_preference" (
"user_preference_id" serial4 NOT NULL,
"user_id" int4 NOT NULL,
"preference_type_id" int4 NOT NULL,
"preference_value_id" int4,
PRIMARY KEY ("user_preference_id") 
)
WITHOUT OIDS;

CREATE TABLE "preference_type" (
"preference_type_id" serial4 NOT NULL,
"preference_type_name" varchar(255) NOT NULL,
PRIMARY KEY ("preference_type_id") 
)
WITHOUT OIDS;

CREATE TABLE "preference_value" (
"preference_value_id" serial4 NOT NULL,
"preference_type_id" int4,
"preference_value" varchar(255),
PRIMARY KEY ("preference_value_id") 
)
WITHOUT OIDS;

CREATE TABLE "user_role" (
"user_role_id" serial4 NOT NULL,
"user_role_name" varchar(255),
PRIMARY KEY ("user_role_id") 
)
WITHOUT OIDS;


ALTER TABLE "term" ADD CONSTRAINT "fk_term_glossary_1" FOREIGN KEY ("glossary_id") REFERENCES "glossary" ("glossary_id");
ALTER TABLE "glossary" ADD CONSTRAINT "fk_glossary_domain_1" FOREIGN KEY ("domain_id") REFERENCES "domain" ("domain_id");
ALTER TABLE "translation" ADD CONSTRAINT "fk_translation_language_1" FOREIGN KEY ("language_id") REFERENCES "language" ("language_id");
ALTER TABLE "translation" ADD CONSTRAINT "fk_translation_term_1" FOREIGN KEY ("term_id") REFERENCES "term" ("term_id");
ALTER TABLE "term_alternate" ADD CONSTRAINT "fk_term_alternate_term_1" FOREIGN KEY ("term_id") REFERENCES "term" ("term_id");
ALTER TABLE "alternate_translation" ADD CONSTRAINT "fk_alternate_translation_translation_1" FOREIGN KEY ("translation_id") REFERENCES "translation" ("translation_id");
ALTER TABLE "expert" ADD CONSTRAINT "fk_expert_elucidom_user_1" FOREIGN KEY ("user_id") REFERENCES "app_user" ("user_id");
ALTER TABLE "expert" ADD CONSTRAINT "fk_expert_language_1" FOREIGN KEY ("language_id") REFERENCES "language" ("language_id");
ALTER TABLE "expert" ADD CONSTRAINT "fk_expert_domain_1" FOREIGN KEY ("domain_id") REFERENCES "domain" ("domain_id");
ALTER TABLE "expert" ADD CONSTRAINT "fk_expert_glossary_1" FOREIGN KEY ("glossary_id") REFERENCES "glossary" ("glossary_id");
ALTER TABLE "user_request" ADD CONSTRAINT "fk_elucidom_request_request_type_1" FOREIGN KEY ("request_type_id") REFERENCES "request_type" ("request_type_id");
ALTER TABLE "user_request" ADD CONSTRAINT "fk_elucidom_request_elucidom_user_1" FOREIGN KEY ("requestor_user_id") REFERENCES "app_user" ("user_id");
ALTER TABLE "user_request" ADD CONSTRAINT "fk_elucidom_request_request_status_1" FOREIGN KEY ("request_status_id") REFERENCES "request_status" ("request_status_id");
ALTER TABLE "user_preference" ADD CONSTRAINT "fk_user_preference_elucidom_user_1" FOREIGN KEY ("user_id") REFERENCES "app_user" ("user_id");
ALTER TABLE "user_preference" ADD CONSTRAINT "fk_user_preference_preference_type_1" FOREIGN KEY ("preference_type_id") REFERENCES "preference_type" ("preference_type_id");
ALTER TABLE "user_preference" ADD CONSTRAINT "fk_user_preference_preference_value_1" FOREIGN KEY ("preference_value_id") REFERENCES "preference_value" ("preference_value_id");
ALTER TABLE "preference_value" ADD CONSTRAINT "fk_preference_value_preference_type_1" FOREIGN KEY ("preference_type_id") REFERENCES "preference_type" ("preference_type_id");
ALTER TABLE "app_user" ADD CONSTRAINT "fk_elucidom_user_user_role_1" FOREIGN KEY ("user_role_id") REFERENCES "user_role" ("user_role_id");


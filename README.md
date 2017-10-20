# Rede contas
Este projeto consiste no cadastro de contas de um conjunto de filiais, gerenciando o saldo do conta do usuário.


# Pré-requisitos

- Java 7
- Eclipse Neon
- Tomcat 8.5
- PostgreSQL 9.1
- Script SQL:

CREATE TABLE conta (
    id bigint NOT NULL,
    id_filial bigint,
    dt_pagamento timestamp without time zone,
    dt_baixa timestamp without time zone,
    saldo_ant_tot numeric,
    saldo_post_tot numeric,
    valor numeric,
    id_status bigint
);

ALTER TABLE public.conta OWNER TO postgres;

CREATE SEQUENCE conta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    
ALTER TABLE public.conta_id_seq OWNER TO postgres;

ALTER SEQUENCE conta_id_seq OWNED BY conta.id;
    

CREATE TABLE filial (
    id bigint NOT NULL,
    cidade character varying(255),
    sigla_estado character varying(2),
    saldo_atual numeric
);


ALTER TABLE public.filial OWNER TO postgres;

CREATE SEQUENCE filial_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.filial_id_seq OWNER TO postgres;

ALTER SEQUENCE filial_id_seq OWNED BY filial.id;


CREATE SEQUENCE status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_id_seq OWNER TO postgres;

ALTER SEQUENCE status_id_seq OWNED BY status.id;



INSERT INTO filial (id, cidade, sigla_estado, saldo_atual) VALUES (1, 'Santa Bárbara d''Oeste', 'SP', 5000);
INSERT INTO filial (id, cidade, sigla_estado, saldo_atual) VALUES (2, 'Santa Bárbara d''Oeste', 'SP', 3000);
INSERT INTO filial (id, cidade, sigla_estado, saldo_atual) VALUES (3, 'Americana', 'SP', 5000);

SELECT pg_catalog.setval('filial_id_seq', 3, true);

INSERT INTO status (id, nome) VALUES (1, 'criado');
INSERT INTO status (id, nome) VALUES (2, 'pago');
INSERT INTO status (id, nome) VALUES (3, 'baixa');

SELECT pg_catalog.setval('status_id_seq', 3, true);



ALTER TABLE ONLY conta
    ADD CONSTRAINT conta_pkey PRIMARY KEY (id);

ALTER TABLE ONLY filial
    ADD CONSTRAINT filial_pkey PRIMARY KEY (id);

ALTER TABLE ONLY status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);

ALTER TABLE ONLY conta
    ADD CONSTRAINT conta_id_filial_fkey FOREIGN KEY (id_filial) REFERENCES filial(id);




# Configuração

1 - Baixe o projeto e importe no Eclipse com a opção "Existing Projects into Workspace";
2 - Adicione ao Eclipse o server Tomcat 8.5
3 - Acesso http://localhost:8080/contas/

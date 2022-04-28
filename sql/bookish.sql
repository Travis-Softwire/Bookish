--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: bookish; Type: SCHEMA; Schema: -; Owner: bookish
--

CREATE SCHEMA bookish;


ALTER SCHEMA bookish OWNER TO bookish;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Books; Type: TABLE; Schema: bookish; Owner: bookish
--

CREATE TABLE bookish."Books" (
    "ISBN" bigint NOT NULL,
    "Title" text NOT NULL,
    "Author" text NOT NULL,
    "NumCopies" integer NOT NULL
);


ALTER TABLE bookish."Books" OWNER TO bookish;

--
-- Name: Loans; Type: TABLE; Schema: bookish; Owner: bookish
--

CREATE TABLE bookish."Loans" (
    "ISBN" bigint NOT NULL,
    "UserID" integer NOT NULL,
    "Due date" date NOT NULL
);


ALTER TABLE bookish."Loans" OWNER TO bookish;

--
-- Name: Users; Type: TABLE; Schema: bookish; Owner: bookish
--

CREATE TABLE bookish."Users" (
    "UserID" integer NOT NULL,
    "Name" text NOT NULL
);


ALTER TABLE bookish."Users" OWNER TO bookish;

--
-- Name: Users_UserID_seq; Type: SEQUENCE; Schema: bookish; Owner: bookish
--

CREATE SEQUENCE bookish."Users_UserID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bookish."Users_UserID_seq" OWNER TO bookish;

--
-- Name: Users_UserID_seq; Type: SEQUENCE OWNED BY; Schema: bookish; Owner: bookish
--

ALTER SEQUENCE bookish."Users_UserID_seq" OWNED BY bookish."Users"."UserID";


--
-- Name: Users UserID; Type: DEFAULT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Users" ALTER COLUMN "UserID" SET DEFAULT nextval('bookish."Users_UserID_seq"'::regclass);


--
-- Data for Name: Books; Type: TABLE DATA; Schema: bookish; Owner: bookish
--

COPY bookish."Books" ("ISBN", "Title", "Author", "NumCopies") FROM stdin;
9781408883778	Harry Potter and the Philosopher`s Stone	J.K. Rowling	10
9780007171972	The Fellowship of the Ring	J.R.R. Tolkien	5
9780155658110	1984	George Orwell	2
\.


--
-- Data for Name: Loans; Type: TABLE DATA; Schema: bookish; Owner: bookish
--

COPY bookish."Loans" ("ISBN", "UserID", "Due date") FROM stdin;
9780155658110	1	2022-04-30
9780155658110	3	2022-05-05
9780155658110	2	2022-03-19
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: bookish; Owner: bookish
--

COPY bookish."Users" ("UserID", "Name") FROM stdin;
1	Travis Woodward
2	Joe Bloggs
3	Mary Smith
\.


--
-- Name: Users_UserID_seq; Type: SEQUENCE SET; Schema: bookish; Owner: bookish
--

SELECT pg_catalog.setval('bookish."Users_UserID_seq"', 3, true);


--
-- Name: Books Books_pkey; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Books"
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY ("ISBN");


--
-- Name: Loans Loans_pkey; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Loans"
    ADD CONSTRAINT "Loans_pkey" PRIMARY KEY ("ISBN", "UserID");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID");


--
-- Name: Loans fk_loans_books; Type: FK CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Loans"
    ADD CONSTRAINT fk_loans_books FOREIGN KEY ("ISBN") REFERENCES bookish."Books"("ISBN");


--
-- Name: Loans fk_loans_users; Type: FK CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Loans"
    ADD CONSTRAINT fk_loans_users FOREIGN KEY ("UserID") REFERENCES bookish."Users"("UserID");


--
-- PostgreSQL database dump complete
--


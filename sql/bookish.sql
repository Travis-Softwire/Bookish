CREATE TABLE bookish."Books" (
    "ISBN" bigint NOT NULL,
    "Title" text NOT NULL,
    "Author" text NOT NULL
);

ALTER TABLE bookish."Books" OWNER TO bookish;


--
-- Name: Copies; Type: TABLE; Schema: bookish; Owner: bookish
--

CREATE TABLE bookish."Copies" (
    "ISBN" bigint NOT NULL,
    "CopyNum" integer NOT NULL
);


ALTER TABLE bookish."Copies" OWNER TO bookish;

--
-- Name: Loans; Type: TABLE; Schema: bookish; Owner: bookish
--

CREATE TABLE bookish."Loans" (
    "UserID" integer NOT NULL,
    "ISBN" bigint NOT NULL,
    "CopyNum" integer NOT NULL,
    "Due date" date NOT NULL
);


ALTER TABLE bookish."Loans" OWNER TO bookish;

--
-- Name: Users; Type: TABLE; Schema: bookish; Owner: bookish
--

CREATE TABLE bookish."Users" (
    "UserID" integer NOT NULL,
    "Name" text NOT NULL,
    "Username" text NOT NULL,
    "Password" text NOT NULL
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

ALTER TABLE ONLY bookish."Books"
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY ("ISBN");


--
-- Name: Copies Copies_pkey; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Copies"
    ADD CONSTRAINT "Copies_pkey" PRIMARY KEY ("ISBN", "CopyNum");


--
-- Name: Loans Loans_pkey; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Loans"
    ADD CONSTRAINT "Loans_pkey" PRIMARY KEY ("UserID", "ISBN", "CopyNum");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID");


--
-- Name: Loans u_copies_loaned_once; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Loans"
    ADD CONSTRAINT u_copies_loaned_once UNIQUE ("ISBN", "CopyNum");


--
-- Name: Users u_username; Type: CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Users"
    ADD CONSTRAINT u_username UNIQUE ("Username");


--
-- Name: Copies fk_copies_books; Type: FK CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Copies"
    ADD CONSTRAINT fk_copies_books FOREIGN KEY ("ISBN") REFERENCES bookish."Books"("ISBN");


--
-- Name: Loans fk_loans_copies; Type: FK CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Loans"
    ADD CONSTRAINT fk_loans_copies FOREIGN KEY ("ISBN", "CopyNum") REFERENCES bookish."Copies"("ISBN", "CopyNum");


--
-- Name: Loans fk_loans_users; Type: FK CONSTRAINT; Schema: bookish; Owner: bookish
--

ALTER TABLE ONLY bookish."Loans"
    ADD CONSTRAINT fk_loans_users FOREIGN KEY ("UserID") REFERENCES bookish."Users"("UserID");

INSERT INTO bookish."Books"
VALUES (9781408883778, 'Harry Potter and the Philosopher`s Stone', 'J.K. Rowling'),
(9780007171972, 'The Fellowship of the Ring', 'J.R.R. Tolkien'),
(9780155658110, '1984', 'George Orwell');

INSERT INTO bookish."Copies"
VALUES (9780007171972,	1),
(9780007171972,	2),
(9780007171972,	3),
(9780007171972,	4),
(9780155658110,	1),
(9780155658110,	2),
(9781408883778,	1),
(9781408883778,	2),
(9781408883778,	3),
(9781408883778,	4),
(9781408883778,	5),
(9781408883778,	6),
(9781408883778,	7),
(9781408883778,	8),
(9781408883778,	9),
(9781408883778,	10),
(9781408883778,	11);

INSERT INTO bookish."Users"
VALUES 
(1,	'Travis Woodward', 'TWoodward', 'Password1'),
(2,	'Joe Bloggs', 'JBloggs', 'abc123'),
(3,	'Mary Smith', 'MSmith',	'jellyfish');

INSERT INTO bookish."Loans"
VALUES (1, 9780007171972,	3,	'2022-04-30'),
(1, 9780155658110,	1,	'2022-05-04'),
(1, 9781408883778,	7,	'2022-03-19'),
(2, 9781408883778,	1,	'2022-09-01'),
(2, 9780155658110,	2,	'2022-06-23'),
(3, 9781408883778,	11,	'2022-02-28');


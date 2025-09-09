--
-- PostgreSQL database dump
--

\restrict h5qgfSjLdPfvi1kiw60RCUmJo0bBXh5PLTfs1nHsG8VrCS5bOGnM4oNXd327nfE

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

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
-- Name: user_plan_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.user_plan_enum AS ENUM (
    'BASIC',
    'PREMIUM',
    'VIP'
);


ALTER TYPE public.user_plan_enum OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: access_tokens; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.access_tokens (
    user_id integer NOT NULL,
    token character varying(43) NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.access_tokens OWNER TO admin;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO admin;

--
-- Name: avatars; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.avatars (
    user_id integer NOT NULL,
    avatar_name character varying(255) NOT NULL,
    avatar_expires_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL,
    avatar character varying
);


ALTER TABLE public.avatars OWNER TO admin;

--
-- Name: avatars_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.avatars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.avatars_id_seq OWNER TO admin;

--
-- Name: avatars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.avatars_id_seq OWNED BY public.avatars.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reviews (
    user_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.reviews OWNER TO admin;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO admin;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: todos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.todos (
    user_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    is_completed boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL,
    end_date timestamp with time zone,
    is_fail boolean DEFAULT false NOT NULL
);


ALTER TABLE public.todos OWNER TO admin;

--
-- Name: COLUMN todos.end_date; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.todos.end_date IS 'Task end time';


--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todos_id_seq OWNER TO admin;

--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    name character varying NOT NULL,
    plan public.user_plan_enum DEFAULT 'BASIC'::public.user_plan_enum NOT NULL,
    id integer NOT NULL,
    email character varying(320) NOT NULL,
    hashed_password character varying(1024) NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    is_verified boolean NOT NULL,
    surname character varying NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: avatars id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.avatars ALTER COLUMN id SET DEFAULT nextval('public.avatars_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: access_tokens; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.access_tokens (user_id, token, created_at) FROM stdin;
3	iq4VAbSg9e7-2iwpLS2D1FBOnU6hPsM1IHmPng5lSj4	2025-09-09 10:21:47.533907+00
\.


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.alembic_version (version_num) FROM stdin;
376b2886c99b
\.


--
-- Data for Name: avatars; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.avatars (user_id, avatar_name, avatar_expires_at, id, avatar) FROM stdin;
1	Aleksandr_Saskevich_1.png	2025-09-09 10:06:21.163696+00	1	18QbLgav_ylD-xoX8cbkbQdJOKr6xdOxT
2	Misha_Mi_2.jpeg	2025-09-09 10:14:30.660881+00	2	1ooHk02kd5nRK2Uw0UdKn1sa1cqv3pZrV
3	Roma_Ro_3.jpeg	2025-09-09 10:22:21.052439+00	3	1UfbuChHRdRPhHVPDubw4e5PMBemD5KKV
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reviews (user_id, rating, comment, created_at, id) FROM stdin;
1	5	Incredibly convenient application for task planning! The interface is minimalistic, but functional - everything is at hand, nothing extra. I really like the ability to create separate lists for different projects and add subtasks. Synchronization between devices works flawlessly: I started planning on my laptop - continued on my phone.	2025-09-09 10:12:52.104278+00	1
2	4	This app literally saved my productivity! Before, my tasks were scattered across notebooks, notes on my phone, and stickers on my monitor. Now everything is in one place - convenient, beautiful, and always at hand.\n	2025-09-09 10:19:10.617059+00	2
3	3	Great app for planning! Simple, beautiful and very convenient. Lists are synchronized instantly, reminders arrive on time, and the widget on the main screen saves a lot of time. I use it every day - it helps keep everything under control.	2025-09-09 10:26:30.874761+00	3
\.


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.todos (user_id, title, description, is_completed, created_at, id, end_date, is_fail) FROM stdin;
1	Refactoring UI components	Check Alert animation on mount/unmount	f	2025-09-09 10:07:26.723535+00	2	\N	f
1	Refactoring UI components	Optimize Redux slice for login form	f	2025-09-09 10:07:18.541606+00	1	\N	f
1	Release preparation	Check DB migrations on staging	f	2025-09-09 10:09:53.670043+00	3	\N	f
1	Release preparation	Update README and changelog	f	2025-09-09 10:10:29.743149+00	4	\N	f
1	Complete the integration of the payment module	Fix a bug with card number validation, check error handling for declined payments	f	2025-09-09 10:12:06.303526+00	5	\N	f
2	Buy food and supplies for the week	🥩 Meat (chicken, beef)	f	2025-09-09 10:15:30.564862+00	6	\N	f
2	Buy food and supplies for the week	🥦 Vegetables (broccoli, carrots, onions)	f	2025-09-09 10:16:26.115518+00	10	\N	f
2	Buy food and supplies for the week	🥛 Dairy (milk, yogurt, cheese)	f	2025-09-09 10:16:16.635988+00	9	\N	f
2	Buy food and supplies for the week	🍞 Bread and pastries	f	2025-09-09 10:16:04.953443+00	8	\N	f
2	Buy food and supplies for the week	☕ Coffee beans	f	2025-09-09 10:15:59.524324+00	7	\N	f
3	Buy food and supplies for the week	🧴 Dishwashing liquid	f	2025-09-09 10:23:48.849538+00	11	2025-11-09 10:23:00+00	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (name, plan, id, email, hashed_password, is_active, is_superuser, is_verified, surname) FROM stdin;
Aleksandr	VIP	1	alex@mail.ru	$argon2id$v=19$m=65536,t=3,p=4$e2ebpvllSzfGb1EFnFUY1g$FXuNgbqM8op0AVBvE0lej4EiLX8zYRlJ6jXo514t8B8	t	f	f	Saskevich
Misha	BASIC	2	mi@mail.ru	$argon2id$v=19$m=65536,t=3,p=4$jVEC5t/qFZ4dRI6ZnA8YCA$9dAUQZDsVA9i/aBZiUJbpkZFXbV2cYxB8Mrjllx+huc	t	f	f	Mi
Roma	BASIC	3	ro@mail.ru	$argon2id$v=19$m=65536,t=3,p=4$9J2I4F/E8dok2mrVZ9RMsg$VsrV1i3MMMzZBgYpcZGsXLKQb88RU0qDaA3ByXsMtIE	t	f	f	Ro
\.


--
-- Name: avatars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.avatars_id_seq', 3, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reviews_id_seq', 3, true);


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.todos_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: access_tokens pk_access_tokens; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.access_tokens
    ADD CONSTRAINT pk_access_tokens PRIMARY KEY (token);


--
-- Name: avatars pk_avatars; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.avatars
    ADD CONSTRAINT pk_avatars PRIMARY KEY (id);


--
-- Name: reviews pk_reviews; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT pk_reviews PRIMARY KEY (id);


--
-- Name: todos pk_todos; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT pk_todos PRIMARY KEY (id);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- Name: ix_access_tokens_created_at; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX ix_access_tokens_created_at ON public.access_tokens USING btree (created_at);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_name; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX ix_users_name ON public.users USING btree (name);


--
-- Name: access_tokens fk_access_tokens_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.access_tokens
    ADD CONSTRAINT fk_access_tokens_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: avatars fk_avatars_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.avatars
    ADD CONSTRAINT fk_avatars_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reviews fk_reviews_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: todos fk_todos_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT fk_todos_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict h5qgfSjLdPfvi1kiw60RCUmJo0bBXh5PLTfs1nHsG8VrCS5bOGnM4oNXd327nfE


--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: class_enrollments; Type: TABLE; Schema: public; Owner: isaiah
--

CREATE TABLE public.class_enrollments (
    id integer NOT NULL,
    class_id integer,
    student_id integer
);


ALTER TABLE public.class_enrollments OWNER TO isaiah;

--
-- Name: classes; Type: TABLE; Schema: public; Owner: isaiah
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    class_name character varying,
    teacher character varying
);


ALTER TABLE public.classes OWNER TO isaiah;

--
-- Name: students; Type: TABLE; Schema: public; Owner: isaiah
--

CREATE TABLE public.students (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    city character varying,
    age integer
);


ALTER TABLE public.students OWNER TO isaiah;

--
-- Data for Name: class_enrollments; Type: TABLE DATA; Schema: public; Owner: isaiah
--

COPY public.class_enrollments (id, class_id, student_id) FROM stdin;
\.


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: isaiah
--

COPY public.classes (id, class_name, teacher) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: isaiah
--

COPY public.students (id, first_name, last_name, city, age) FROM stdin;
\.


--
-- Name: class_enrollments class_enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: isaiah
--

ALTER TABLE ONLY public.class_enrollments
    ADD CONSTRAINT class_enrollments_pkey PRIMARY KEY (id);


--
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: isaiah
--

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: isaiah
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: class_enrollments class_enrollments_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: isaiah
--

ALTER TABLE ONLY public.class_enrollments
    ADD CONSTRAINT class_enrollments_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id);


--
-- Name: class_enrollments class_enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: isaiah
--

ALTER TABLE ONLY public.class_enrollments
    ADD CONSTRAINT class_enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- PostgreSQL database dump complete
--


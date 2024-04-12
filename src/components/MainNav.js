import React from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { searchHistoryAtom } from "../../store"
import { useAtom } from 'jotai';
import { addToHistory } from '../../lib/userData';
import { readToken, removeToken } from '../../lib/authenticate';

export default function MainNav(){
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken()

    function logout() {
      setIsExpanded(false)
      removeToken();
      router.push('/login');
    }

    async function searchBar(event){
      event.preventDefault();
      router.push(`/artwork?title=true&q=${search}`);
      setIsExpanded(false);
      setSearchHistory(await addToHistory(`title=true&q=${search}`))
    }

    const changeForm = (event) => {
        setSearch(event.target.value);
    };

    const toggleNav = () => {
      setIsExpanded(!isExpanded);
    }

    const closeNav = () => {
      setIsExpanded(false);
    }

    return (
        <>
          <Navbar bg="dark" data-bs-theme="dark" className='fixed-top' expand="lg" expanded={isExpanded}>
            <Container>
            <Navbar.Brand href="/">Aazain Rafiq</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNav}/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className="me-auto" onClick={closeNav}>
                <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/home"}>Home</Nav.Link></Link>
                {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
              </Nav>
              {token && <Form className="d-flex" onSubmit={searchBar}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={changeForm}
                    />
                    <Button variant="success" onClick={searchBar}>Search</Button>
                </Form>}
                <Nav>
                  {token ? (
                      <NavDropdown title={token.userName} id="basic-nav-dropdown">
                        <Link href="/favorites" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/favorites"} onClick={closeNav}>Favorites</NavDropdown.Item></Link>
                        <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <Nav>
                        <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={closeNav}>Register</Nav.Link></Link>
                        <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={closeNav}>Login</Nav.Link></Link>
                      </Nav>
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <br />
          <br />
        </>
    );
}
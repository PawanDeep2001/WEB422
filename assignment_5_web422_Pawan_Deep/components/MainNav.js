import {Container, Nav, Navbar, Form, Button} from "react-bootstrap"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from "next/link";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    function navigate(e, route){
        router.push(route);
    };
    const [search, setSearch] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    function submission(e) {
        e.preventDefault();
        setIsExpanded(false)
        let queryString=`title=true&q=${search}`
        setSearchHistory(current => [...current, queryString]);
    }
return (
    <>
      <Navbar className= "fixed-top navbar-dark bg-primary solid navbar navbar-expand-lg navbar-dark"  expand="lg" expanded={isExpanded}>
        <Container>
          <Navbar.Brand className="navbar-brand"> Pawan Deep</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={(e)=>setIsExpanded(!isExpanded)}/>
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>
                    <Link href='/' legacyBehavior passHref><Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
                    <Link href='/search' legacyBehavior passHref><Nav.Link onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
                </Nav>
                &nbsp;
                <Form className="d-flex" onSubmit={submission}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit" variant="success" onClick={(e)=>{navigate(e, `/artwork?title=true&q=${search}`)}} >Search</Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title="User Name" id="basic-nav-dropdown">
                    <Link href='/favourites' legacyBehavior passHref><NavDropdown.Item onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                    <Link href='/history' legacyBehavior passHref><NavDropdown.Item onClick={(e)=>setIsExpanded(false)} active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                  </NavDropdown>
                </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
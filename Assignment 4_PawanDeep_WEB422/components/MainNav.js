import {Container, Nav, Navbar, Form, Button} from "react-bootstrap"
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from "next/link";

export default function MainNav() {
    const router = useRouter();
    function navigate(e, route){
        router.push(route);
    };
    const [search, setSearch] = useState(null);
    function submission(e) {
        e.preventDefault();
    }
return (
    <>
      <Navbar className= "fixed-top navbar-dark bg-primary px-5 solid navbar navbar-expand-lg navbar-dark"  expand="lg">
        <Container fluid className="mx-4">
          <Navbar.Brand className="navbar-brand"> Pawan Deep</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>
                    <Link href='/' legacyBehavior passHref><Nav.Link>Home</Nav.Link></Link>
                    <Link href='/search' legacyBehavior passHref><Nav.Link>Advanced Search</Nav.Link></Link>
                </Nav>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
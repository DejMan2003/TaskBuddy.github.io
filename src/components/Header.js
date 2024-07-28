import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
//defines header component
const Header=() => (
    //create navbar with dark theme
    <Navbar bg="dark" variant="dark">
        {/*Brand name that links to homepage*/}
        <Navbar.Brand href="/">TaskBuddy</Navbar.Brand>
        {/*Navigation links*/}
        <Nav className='mr-auto'>
            <Nav.Link href="/tasks">Tasks</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
    </Navbar>

);

//export header so it's usable in other files
export default Header;
import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

const Layout = ({children} : any) => {
    return(
        <div>
            <NavMenu />
            <Container>
                {children}
            </Container>
        </div>
    ) 
}

export default Layout

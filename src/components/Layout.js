import React from 'react';
import MainNav from './MainNav';
import { Container } from 'react-bootstrap';

export default function Listings(props){
    return (
        <div>
            <MainNav />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
        </div>
    )
} 
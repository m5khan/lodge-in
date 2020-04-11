import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    background-color: #8e2a54;
    padding: 15px;
    color: white;
`;

const Header: React.FC = () => {
    return (
        <StyledHeader>
            Lodge-In
        </StyledHeader>
    )
}

export default Header;
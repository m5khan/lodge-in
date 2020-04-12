import React from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AboutDialog from './AboutDialog';

const StyledHeader = styled.header`
    background-color: #8e2a54;
    padding: 15px;
    color: white;
    & .menu {
        float: right;
        cursor: pointer;
    }
`;

const Header: React.FC = () => {
    const [openAboutDialog, setOpenAboutDialog] = React.useState(false);

    return (
        <>
        <StyledHeader>
            <span>
                Lodge-In
            </span>
            <div className="menu" onClick={() => {setOpenAboutDialog(true)}}>
                <InfoOutlinedIcon></InfoOutlinedIcon>
            </div>
        </StyledHeader>
        <AboutDialog open={openAboutDialog} setOpen={setOpenAboutDialog} />
        </>
    )
}

export default Header;
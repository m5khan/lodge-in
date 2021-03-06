import React from 'react';
import styled from 'styled-components';
import { Box, Button, Paper, Typography, Link } from '@material-ui/core';
import ServiceTags from './ServiceTags';
import { LocationData } from '../../services/MapService';


const Container = styled.div`
    padding: ${(props: cssProp) => props.pad}px;
    .address, .open-hours, .contact {
        padding-top: 15px;
    }
    .book-button {
        margin: 15px 0;
    }
`
const StyledButton = styled(Button)`
    width: 100%;
`
const Image = styled.img`
    width: 100%;
`

type cssProp = {
    pad: number;
}

type Props  = {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
 } & LocationData

const PropertyDetail: React.FC<Props> = (props: Props) => {
    
    return (
        <Box display="flex" alignItems="flex-start" css={{ height: '100%' }}>
        <Container pad={10}>
            <Paper>
                <Container pad={15}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Image src='/images/hotel.jpg'></Image>
                    <ServiceTags categories={props.categories}/>
                    <div className='address'>
                        <Typography  variant="body2" color="textPrimary" component="p">
                            {props.address.label}
                        </Typography>
                    </div>

                    <div className='book-button'>
                        <StyledButton onClick={() => {props.setOpenDialog(true)}} size="large" color="primary" variant="contained">
                            Book Online
                        </StyledButton>
                    </div>
                    
                    {
                    props.openingHours && props.openingHours.length ? 
                    <div className='open-hours'>
                        <div style={{paddingBottom: '10px'}}>
                            {isOpen(props)}
                        </div>
                        <Typography variant="caption" color="textPrimary" component="p">
                            Opening Hours
                        </Typography>
                        {props.openingHours[0].text.map((hour, index) => <Typography variant="body2" color="textSecondary" key={index}>{hour}</Typography>)}
                    </div>
                    : ''
                    }

                    {props.contacts && props.contacts.length ? 
                        <div className='contact'>
                            <Typography variant="caption" color="textPrimary" component="p">
                                Contact Information
                            </Typography>
                            {props.contacts[0].phone ? <Typography variant="body2" color="textSecondary">{props.contacts[0].phone[0].value}</Typography> : ''}
                            {props.contacts[0].mobile ? <Typography variant="body2" color="textSecondary">{props.contacts[0].mobile[0].value}</Typography> : ''}
                            {props.contacts[0].email ? <Typography variant="body2" color="textSecondary">{props.contacts[0].email[0].value}</Typography> : ''}
                            {props.contacts[0].www ? <Link href={props.contacts[0].www[0].value} variant="body2" target="_blank" rel="noopener">Web Page</Link> : ''}
                        </div>
                        :''
                    }

                </Container>
            </Paper>
        </Container>
        </Box>
    )
}

const isOpen = (props: Props) => {
    if(props.openingHours && props.openingHours.length && props.openingHours[0].isOpen !== undefined) {
        if(props.openingHours[0].isOpen) {
            return (
                <Typography variant="body2" component="p" color="primary">Open at the moment</Typography>
            )
        } else {
            return (
                <Typography variant="body2" component="p" color="secondary">Closed at the moment</Typography>
            )
        }
    } else return '';
}

export default PropertyDetail;
import React from 'react';
import styled from 'styled-components';
import { Avatar, Chip } from '@material-ui/core';

const StyledChip = styled(Chip)`
    margin: 2px;
`

const hotelLodging = [
    '500-5000-0000',    // Hotel or Motel
    '500-5100-0053',    // Hotel
    '500-5100-0054',    // Motel
    '500-5100-0055',    // Hostel
    '500-5100-0056',    // Campground
    '500-5100-0057',    // Guesthouse
    '500-5100-0058'     // Bed and Breakfast
];


type Props = {
    categories: {[id: string]: string}[]
}

const ServiceTags: React.FC<Props> = (props: Props) => {

    

    return (
        <>
            {props.categories.map((obj) => {
                const serviceIndex = hotelLodging.indexOf(obj.id);
                switch (serviceIndex) {
                    case 0:
                    case 1:
                        return <StyledChip avatar={<Avatar>H</Avatar>} label="Hotel" key={obj.id} variant="outlined" size="small"/>;
                    case 2:
                        return <StyledChip avatar={<Avatar>M</Avatar>} label="Motel" key={obj.id} variant="outlined" size="small"/>;
                    case 3:
                        return <StyledChip avatar={<Avatar>HS</Avatar>} label="Hostel" key={obj.id} variant="outlined" size="small"/>;
                    case 4:
                        return <StyledChip avatar={<Avatar>C</Avatar>} label="Campsite" key={obj.id} variant="outlined" size="small"/>;
                    case 5:
                        return <StyledChip avatar={<Avatar>G</Avatar>} label="Guest House" key={obj.id} variant="outlined" size="small"/>;
                    case 6:
                        return <StyledChip avatar={<Avatar>BB</Avatar>} label="Bed &amp; Breakfast" key={obj.id} variant="outlined" size="small"/>;                    
                    default:
                        return ''
                }
            })}
        </>
    );
}

export default ServiceTags;
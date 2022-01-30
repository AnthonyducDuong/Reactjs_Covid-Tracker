import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import InfoCard from './InfoCard';
// import usePrevious from '../../../../../customHook/usePrevious'

InfoCards.propTypes = {
    covidcases: PropTypes.object,
};

InfoCards.defaultProps = {
    covidcases: {},
}

function InfoCards(props) {
    const { covidcases } = props;
    const data = covidcases.list[covidcases.list.length - 1];
    // const prevProps = usePrevious(props);

    console.log('>>>Check props InfoCards: ', props);

    let summary = [
        {
            title: 'Active',
            quantity: data ? data.Active : -1,
        },
        {
            title: 'Confirmed',
            quantity: data ? data.Confirmed : -1,
        },
        {
            title: 'Deaths',
            quantity: data ? data.Deaths : -1,
        },
    ]

    return (
        <Grid container spacing={3}>
            {
                summary.map((item, index) => {
                    return <Grid key={index} item sm={4} xs={12}>
                        <InfoCard cardTitle={item.title} cardQuantity={item.quantity} cardStatus={props.covidcases.status} />
                    </Grid>
                })
            }
        </Grid>
    );
}

export default InfoCards;
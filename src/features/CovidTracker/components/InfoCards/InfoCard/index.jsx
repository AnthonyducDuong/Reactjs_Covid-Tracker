import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import Skeleton from '@mui/material/Skeleton';
import useStyles from './style';
import CountUp from 'react-countup';

InfoCard.propTypes = {
    cardTitle: PropTypes.string,
    cardQuantity: PropTypes.number,
    cardStatus: PropTypes.string,
};

InfoCard.defaultProps = {
    cardTitle: '',
    cardQuantity: 1,
    cardStatus: null,
};

function InfoCard(props) {
    const { cardTitle, cardQuantity, cardStatus } = props;
    const classes = useStyles({ cardTitle });

    console.log(props);

    const Loading = () => {
        if (cardStatus === 'loading') {
            return <Skeleton animation="wave" />;
        }
        else if (cardStatus === 'success') {
            if (cardQuantity === -1) {
                return 'Not information';
            }
            else {
                return <CountUp end={cardQuantity} duration={2} separator=' ' />;
            }
        }
        else {
            return <Skeleton animation={false} />;
        }
    }

    return (
        <Card className={classes.cardType}>
            <CardContent>
                <Typography component='p' variant='h6' className={classes.cardContent__Title}>
                    {cardTitle}
                </Typography>
                <Typography component='span' variant='body1'>
                    {
                        //cardQuantity === -1 || cardStatus !== 'success' ? <Skeleton animation="wave" /> : cardQuantity
                        Loading()
                    }
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoCard;
import {
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    cardType: (props) => {
        const {
            cardTitle
        } = props;
        if (cardTitle === 'Active') return {
            borderLeft: '4px solid #ff6b81',
            borderRight: '4px solid #ff6b81',
            borderTop: '2px solid #ff6b81',
            borderBottom: '2px solid #ff6b81',
        };
        else if (cardTitle === 'Confirmed') return {
            borderLeft: '4px solid #2ed573',
            borderRight: '4px solid #2ed573',
            borderTop: '2px solid #2ed573',
            borderBottom: '2px solid #2ed573'
        };
        else return {
            borderLeft: '4px solid #7158e2',
            borderRight: '4px solid #7158e2',
            borderTop: '2px solid #7158e2',
            borderBottom: '2px solid #7158e2'
        }
    },

    cardContent__Title: {
        marginTop: '6px',
        marginBottom: '10px',
    }
}));

export default useStyles;
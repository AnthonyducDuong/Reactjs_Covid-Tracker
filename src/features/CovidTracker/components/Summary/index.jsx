import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HighMaps';

Summary.propTypes = {
    covidcases: PropTypes.object,
    slugNationSelected: PropTypes.string,
};

Summary.defaultProps = {
    covidcases: {},
    slugNationSelected: 'vn',
}

function Summary(props) {
    const { covidcases, slugNationSelected } = props;
    const [mapData, setMapData] = useState({});

    // useEffect(() => {
    //     if (slugNationSelected) {
    //         import(
    //             `@highcharts/map-collection/countries/${slugNationSelected}/${slugNationSelected}-all.geo.json`
    //         )
    //             .then(res => setMapData(res))
    //             .catch((err) => console.log({ err }));
    //     }

    //     console.log('>>> Check mapData: ', mapData);
    // }, [slugNationSelected, covidcases]);

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12} >
                <LineChart data={covidcases} />
            </Grid>
            <Grid item sm={8} xs={12}>
                {/* <HighMaps MapData={mapData} /> */}
            </Grid>
        </Grid>
    );
}

export default Summary;
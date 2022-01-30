import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, NativeSelect, FormHelperText, Box } from '@material-ui/core';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import useStyles from './style';
import { getCovidCasesByNation } from '../../covidSlice';

CountrySelector.propTypes = {
    nations: PropTypes.object,
    onChangeNation: PropTypes.func,
    slugNationSelected: PropTypes.string,
};

CountrySelector.defaultProps = {
    nations: {},
    onChangeNation: null,
    slugNationSelected: 'VN',
}

function CountrySelector(props) {
    const { nations, onChangeNation, slugNationSelected } = props;
    // const [valueNation, setValueNation] = useState(slugNationSelected);
    const classes = useStyles();
    const dispatch = useDispatch();

    console.log('>>> Check props: ', props);

    const _onChangeNation = (event) => {
        if (nations.list && nations.list.length) {
            //Objects include: Country, Slug, ISO2
            // const { ISO2 } = nations.list.find((item) => item.ISO2 === event.target.value);
            // console.log(ISO2);
            onChangeNation(event.target.value);
            // setValueNation(event.target.value);
        }
    }

    useEffect(() => {
        const fetchInformationByNation = async () => {
            if (nations.list.length > 0) {
                try {
                    const { Slug } = nations.list.find((item) => item.ISO2 === slugNationSelected);

                    const actionResult = await dispatch(getCovidCasesByNation(Slug));

                    //test
                    const InfoCovidByNation = unwrapResult(actionResult);
                    console.log('>>> Check get intu covid cases with detail nation: ', InfoCovidByNation);
                    // setNations(nationsList);
                    // setLoading(false);
                }
                catch (error) {
                    console.log("Failed to intu covid cases with detail nation: ", error.message);
                }
            }
        }

        fetchInformationByNation();
    }, [nations.list, slugNationSelected])

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor='nation-selector' shrink>Nation</InputLabel>
            {
                nations.status === 'success' ? (
                    <NativeSelect
                        value={slugNationSelected}
                        onChange={_onChangeNation}
                        inputProps={{
                            name: 'nation',
                            id: 'nation-selector',
                        }}
                    >
                        {
                            nations.list && nations.list.length &&
                            nations.list.map((item, key) => {
                                return <option key={item.ISO2} value={item.ISO2}>
                                    {item.Country}
                                </option>
                            })
                        }
                    </NativeSelect>
                ) : (
                    <Box pt={2} className={classes.box__loading}>
                        <Skeleton variant="rectangular" width="100%" height={30} />
                    </Box>
                )
            }
            <FormHelperText>choose nation</FormHelperText>
        </FormControl>
    );
}

export default CountrySelector;
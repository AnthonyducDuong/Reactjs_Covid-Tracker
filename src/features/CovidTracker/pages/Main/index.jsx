import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CountrySelector from '../../components/CountrySelector';
import InfoCards from '../../components/InfoCards/index';
import Summary from '../../components/Summary';
import { useDispatch, useSelector } from 'react-redux';
import { getNations } from '../../nationsSlice';
import { unwrapResult } from '@reduxjs/toolkit';

MainPage.propTypes = {

};

function MainPage(props) {
    const dispatch = useDispatch();
    const nations = useSelector((state) => state.nations);
    const covidcases = useSelector((state) => state.covidcases);
    const [slugNationSelected, setSlugNationSelected] = useState('VN');

    useEffect(() => {
        const fetchNationsList = async () => {
            try {
                const actionResult = await dispatch(getNations());

                //test
                const nationsList = unwrapResult(actionResult);
                console.log('>>> Check get all nations: ', nationsList);
                // setNations(nationsList);
                // setLoading(false);
            }
            catch (error) {
                console.log("Failed to get all nations: ", error.message);
            }
        }

        fetchNationsList();
    }, [])

    const onChangeNation = (slug) => {
        // if (nations.list && nations.list.length) {
        //     //Objects include: Country, Slug, ISO2
        //     // const { ISO2 } = nations.list.find((item) => item.ISO2 === event.target.value);
        //     // console.log(ISO2);
        //     setValueNation(event.target.value);
        // }
        setSlugNationSelected(slug);
    }

    return (
        <div>
            <CountrySelector nations={nations} onChangeNation={onChangeNation} slugNationSelected={slugNationSelected} />
            <InfoCards covidcases={covidcases} />
            <Summary covidcases={covidcases} slugNationSelected={slugNationSelected.toLowerCase()} />
        </div>
    );
}

export default MainPage;
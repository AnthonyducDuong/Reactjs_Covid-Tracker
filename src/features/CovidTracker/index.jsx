import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import CountrySelector from './components/CountrySelector/index';

CovidTracker.propTypes = {

};

function CovidTracker(props) {
    return (
        <Routes>
            <Route exact path="/" element={<MainPage />} />

            {/* Test route */}
            <Route path="/a" element={<CountrySelector />} />
        </Routes>
    );
}

export default CovidTracker;
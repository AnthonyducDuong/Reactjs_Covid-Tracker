import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import highchartMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

HighMaps.propTypes = {
    MapData: PropTypes.object,
};

HighMaps.defaultProps = {
    MapData: {},
};

highchartMap(Highchart);

const initOptions = {
    chart: {
        height: '500',
    },
    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '	#7A0826'],
        ],
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },
    series: [
        {
            name: 'Dân số',
            joinBy: ['hc-key', 'key'],
        },
    ],
};

function HighMaps(props) {
    const { MapData } = props;
    const [options, setOptions] = useState({});
    const [configLoaded, setConfigLoaded] = useState(false);
    const chartRef = useRef(null);

    console.log('>>> Check mapData: ', MapData);

    useEffect(() => {
        if (MapData && Object.keys(MapData).length) {
            const fakeData = MapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: index,
            }))
            console.log('>>> Check fakeData: ', fakeData);
            setOptions(() => ({
                ...initOptions,
                title: {
                    text: MapData.title,
                },
                series: [
                    { ...initOptions.series[0], mapData: MapData, data: fakeData },
                ],
            }));
            if (!configLoaded) setConfigLoaded(true);
        }
    }, [MapData, configLoaded]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                MapData,
            })
        }
    }, [options, MapData]);

    if (!configLoaded) return null;

    return (
        <HighchartsReact
            highcharts={Highchart}
            options={cloneDeep(options)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    );
}

export default HighMaps;
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import moment from 'moment';
import Skeleton from '@mui/material/Skeleton';
import { Typography, ButtonGroup, Button } from '@material-ui/core';

LineChart.propTypes = {

};

const generateOptions = (data) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));
    return {
        chart: {
            height: 500.
        },
        title: {
            text: 'Total GLOBAL Covid-19 cases',
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#FC427B'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
        },
        tooltip: {
            headerFormat: '<span style=\'font-size: 10px\'>{point.key}</span><table>',
            pointFormat:
                '<tr><td style=\'color:{series.color};padding:0\'>{series.name}: </td>' +
                '<td style=\'padding:0\' ><b>{point.y} cases</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Total cases',
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
}

function LineChart(props) {
    const { data } = props;
    console.log(">>> Check data: ", data);
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('All');

    useEffect(() => {
        //handle to get data 
        let handledData = data.list;

        if (handledData.length >= 30) {
            switch (reportType) {
                case 'All':
                    handledData = data.list;
                    break;
                case '7':
                    handledData = data.list.slice(data.list.length - 7);
                    break;
                case '30':
                    handledData = data.list.slice(data.list.length - 30);
                    break;
                default:
                    handledData = data.list;
                    break;
            }
        }
        console.log(data.list.length);
        setOptions(generateOptions(handledData));

    }, [data, reportType]);

    return (
        <div>
            <ButtonGroup size='small' color='secondary' variant="text" aria-label="text button group" style={{ display: 'flex', justifyContent: 'flex-end', }}>
                <Button color={reportType === 'All' ? 'primary' : ''} onClick={() => { setReportType('All') }} >Total</Button>
                <Button color={reportType === '7' ? 'primary' : ''} onClick={() => { setReportType('7') }} >7 Days</Button>
                <Button color={reportType === '30' ? 'primary' : ''} onClick={() => { setReportType('30') }} >30 Days</Button>
            </ButtonGroup>
            {data.list.length > 0 ?
                <HighchartsReact
                    highcharts={Highchart}
                    options={options}
                />
                :
                <>
                    <Typography component='h3' variant='h2'>
                        Not Information
                    </Typography>
                    <Skeleton animation={false} />
                </>
            }
        </div>
    );
}

export default LineChart;
import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from 'utils';
import Chart from './components/Chart';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        padding: theme.spacing(1, 0),
    },
}));

//todo tính tổng daonh thu hằng tháng
const handleTotalOfMonth = (arr: Array<any>, month: Number): Number => {
    const total = arr
        .filter((order: any) => {
            const monthOfOrder = parseInt(order.date_modified.slice(5, 7));
            return monthOfOrder === month;
        })
        .reduce((sum, order: any) => {
            return sum + parseInt(order.total);
        }, 0);
    return total;
};

//todo tính tổng số đơn hàng hằng tháng
const handleTotalMonthOrder = (arr: Array<any>, month: Number): number => {
    const total = arr.filter((order: any) => {
        const monthOfOrder = parseInt(order.date_modified.slice(5, 7));
        return monthOfOrder === month;
    });
    return total.length;
};

//todo chuẩn bị dataset cho chart 1 : mảng tổng doanh thu hằng tháng trong năm
const handleDatasetsOfChart = (arr: Array<any>, func): Array<any> => {
    const datasets: any[] = [];
    for (let i = 1; i <= 12; i++) {
        datasets.push(func(arr, i));
    }
    return datasets;
};

export default function Order() {
    const classes = useStyles();
    const [orderList, setOrderList] = useState([]);
    const date = new Date();
    const yearNow = date.getFullYear();
    const data_1 = handleDatasetsOfChart(orderList, handleTotalMonthOrder);
    const data_2 = handleDatasetsOfChart(orderList, handleTotalOfMonth);
    const datasets = [
        {
            label: 'Tổng đơn hàng',
            data: data_1,
            backgroundColor: ['rgba(54, 162, 235, 0.7)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
        },
        {
            label: 'Tổng doanh thu',
            data: data_2,
            backgroundColor: ['rgba(255, 99, 132, 0.7)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        },
    ];
    const labelOfChart_1 = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    useEffect(() => {
        (async function () {
            try {
                const getApiOrderList: any = (await axios(url + 'orders')).data;
                setOrderList(getApiOrderList.data);
            } catch (error) {
                console.log('call api order failed', error);
            }
        })();
    }, []);

    return (
        <Box className={classes.root}>
            {/* statistic section */}

            <Typography variant="h4">Số liệu thống kê</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={12} paddingLeft={0}>
                    <Chart
                        chartName={`TỔNG DOANH THU THEO THÁNG TRONG NĂM ${yearNow}`}
                        labels={labelOfChart_1}
                        data={datasets}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}></Grid>
            </Grid>
        </Box>
    );
}

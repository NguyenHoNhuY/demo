import * as React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@mui/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
    root: {},
    chart: {
        '& canvas': {
            width: '100% !important',
            padding: theme.spacing(0, 3),
        },
    },
}));

export interface ChartProps {
    chartName: string;
    labels: Array<string>;
    data: Array<any>;
}

export default function Chart({ chartName, labels, data }: ChartProps) {
    const classes = useStyles();
    return (
        <div className={classes.chart}>
            <Bar
                data={{
                    labels: labels,
                    datasets: data,
                }}
                options={{
                    // maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: chartName,
                            font: {
                                size: 25,
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'THÁNG',
                                color: '#000',
                                font: {
                                    size: 20,
                                },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'VND',
                                color: '#000',
                                font: {
                                    size: 20,
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

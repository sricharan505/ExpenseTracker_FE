import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const CategoryChart = ({totals=[]}) => {

    const labels = Object.keys(totals);
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Expenses By Category Bar Chart',
            },
        },
    };
    //console.log(totals.map((total,index) => index))
    console.log(Object.keys(totals))
    
    const data = {
        labels,
        datasets: [
            {
            label: "Categories",
            data: labels.map((label) => totals[label] ),
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            }
        ],
    };
    
    return <Bar options={options} data={data} />;
};

export default CategoryChart;

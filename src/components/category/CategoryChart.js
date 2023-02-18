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
    Tooltip
);



const CategoryChart = ({totals=[],type}) => {

    const labels = Object.keys(totals);
    const options = {
        responsive: true,
    };
    //console.log(totals.map((total,index) => index))
    console.log(Object.keys(totals))
    
    const data = {
        labels,
        datasets: [
            {
            label: "Categories",
            data: labels.map((label) => totals[label] ),
            backgroundColor: type=="expense"?"rgb(171, 17, 12)":(type=="income"?"rgb(36, 133, 9)":"rgb(6, 125, 161)"),
            }
        ],
    };
    
    return <Bar options={options} data={data} />;
};

export default CategoryChart;

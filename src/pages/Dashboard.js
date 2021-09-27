import React, { useEffect, useState } from 'react'
import crossfilter from 'crossfilter2'
import * as d3 from 'd3'
import csv from './ndx.csv'
import {
  BarChart,
  PieChart,
  BubbleChart,
  LineChart,
  ChartContext,
} from 'react-dc-js'

const numberFormat = d3.format('.2f')

function Dashboard() {
    const [cx, setCx] = useState(null);

    useEffect(()=> {
        fetch(shapes_url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            let x = myJson.map(d => ({ ...d, count: 0 }));
            setShapes(x)
        });
}
    },[])
}

export default Dashboard;
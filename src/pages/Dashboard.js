import React, { useEffect, useState } from 'react'
import crossfilter from 'crossfilter2'
import * as d3 from 'd3'

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
        ;(async () => {
            const data = await d3.csv(csv)
            const dateFormatSpecifier = '%m/%d/%Y'
            const dateFormatParser = d3.timeParse(dateFormatSpecifier)
            data.forEach(d => {
              d.dd = dateFormatParser(d.date)
              d.month = d3.timeMonth(d.dd) // pre-calculate month for better performance
              d.close = +d.close // coerce to number
              d.open = +d.open
            })
            const cx = crossfilter(data)
            setCx(cx)
        })()
    },[])

    if (!cx) {
        return <p> Loading Data </p>
    }

}

export default Dashboard;
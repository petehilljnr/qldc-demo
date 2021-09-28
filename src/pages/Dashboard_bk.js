import React, { useEffect, useState } from "react";
import crossfilter from "crossfilter2";
import * as d3 from "d3";
import * as dc from "dc";
import { Container, Row, Col } from "react-bootstrap";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
//import { RowChart, ChartContext } from "react-dc-js";

const numberFormat = d3.format(".2f");
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicGV0ZWhpbGxqbnIiLCJhIjoiY2tyeTMzbHg1MGh2ZjJwbWdnajJucXQ5ayJ9.DXyAy7ku9gSec7OUPeDRIQ";
function Dashboard() {
  const INITIAL_VIEW_STATE = {
    longitude: 168.5326841,
    latitude: -44.9667646,
    zoom: 8,
    pitch: 0,
    bearing: 0,
  };

  const [cx, setCx] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await d3.csv(
        "https://raw.githubusercontent.com/petehilljnr/qldc-demo/master/data/sites.csv"
      );
      const dateFormatSpecifier = "%m/%d/%Y";
      const dateFormatParser = d3.timeParse(dateFormatSpecifier);
      data.forEach((d) => {
        d.system_id = +d.system_id;
        d.est_cost = +d.est_cost;
        d.activity_class =
          d.activity_class.length == 0 ? "UNK" : d.activity_class;
      });

      const cx = crossfilter(data);
      setCx(cx);
    })();
  }, []);

  if (!cx) {
    return <p> Loading Data </p>;
  }

  const wardDim = cx.dimension((d) => d.ward);
  const wardCount = wardDim.group().reduceCount();

  const statusDim = cx.dimension((d) => d.status);
  const statusCount = statusDim.group().reduceCount();

  const activityDim = cx.dimension((d) => d.activity_class);
  const activityCount = activityDim.group().reduceCount();

  const outcomeDim = cx.dimension((d) => d.onrcoutcome);
  const outcomeCount = outcomeDim.group().reduceCount();

  const mapTemp = cx.dimension((d) => d.system_id);

  function createRowChart(div, dim, group, height) {
    var c = dc.rowChart(div);

    c.dimension(dim)
      .height(height)
      .group(group)
      .transitionDuration(300)
      .colors("#fcba03")
      .elasticX(true)
      .on("filtered", function() { filterMap() })
      .xAxis()
      .ticks(4);

    c.render();
  }

  function filterMap() {
    console.log(mapTemp.top(Infinity))
  }

  createRowChart("#chart2", statusDim, statusCount, 180)
  createRowChart("#chart1", wardDim, wardCount, 180)
  createRowChart("#chart3", activityDim, activityCount, 180)
  createRowChart("#chart4", outcomeDim, outcomeCount, 180)

  dc.renderAll();

  
  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data: "https://raw.githubusercontent.com/petehilljnr/qldc-demo/master/data/sites.geojson",
    pickable: true,
    stroked: true,
    filled: true,
    extruded: false,
    pointType: "circle",
    lineWidthScale: 40,
    lineWidthMinPixels: 2,
    getFillColor: "red",
    //getLineColor: d => colorToRGBArray(d.properties.color),
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
  });

  const f = () => {
    console.log("wwww");
  };

  return (
    <div className="dashboard">
      <Container fluid>
        <h3> Progress Dashboard </h3>
        <Row>
          <Col>
            <DeckGL
              initialViewState={INITIAL_VIEW_STATE}
              controller={true}
              layers={layer}
            >
              <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
            </DeckGL>
          </Col>
          <Col>
              <Row>
                <Col>
                  <p> Sites By Ward </p>
                  <div id="chart1" />
                </Col>
                <Col>
                  <p> Sites by Status </p>
                  <div id="chart2" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p> Sites By Activity Class </p>
                  <div id="chart3" />
                </Col>
                <Col>
                  <p> Sites by ONRC Outcome </p>
                  <div id="chart4" />
                </Col>
              </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

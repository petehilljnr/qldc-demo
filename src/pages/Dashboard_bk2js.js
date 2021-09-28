import React, { useEffect, useState } from "react";
import crossfilter from "crossfilter2";
import * as d3 from "d3";
import { Container, Row, Col } from "react-bootstrap";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from '@deck.gl/layers';
import { StaticMap } from "react-map-gl";
import { RowChart, ChartContext } from "react-dc-js";

const numberFormat = d3.format(".2f");
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoicGV0ZWhpbGxqbnIiLCJhIjoiY2tyeTMzbHg1MGh2ZjJwbWdnajJucXQ5ayJ9.DXyAy7ku9gSec7OUPeDRIQ";
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
  const wardGroupCount = wardDim.group().reduceCount();

  const statusDim = cx.dimension((d) => d.status);
  const statusCount = statusDim.group().reduceCount();

  const activityDim = cx.dimension((d) => d.activity_class);
  const activityCount = activityDim.group().reduceCount();

  const outcomeDim = cx.dimension((d) => d.onrcoutcome);
  const outcomeCount = outcomeDim.group().reduceCount();
  
  const mapTemp = cx.dimension((d) => d.system_id)
    
  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: "https://raw.githubusercontent.com/petehilljnr/qldc-demo/master/data/sites.geojson",
    pickable: true,
    stroked: true,
    filled: true,
    extruded: false,
    pointType: 'circle',
    lineWidthScale: 40,
    lineWidthMinPixels: 2,
    getFillColor: 'red',
    //getLineColor: d => colorToRGBArray(d.properties.color),
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30
  })

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
            <ChartContext>
              <Row>
                <Col>
                  <p> Sites By Ward </p>
                  <RowChart
                    dimension={wardDim}
                    group={wardGroupCount}
                    height={180}
                    transitionDuration={300}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : ${d.value} sites`}
                  />
                </Col>
                <Col>
                  <p> Sites by Status </p>
                  <RowChart
                    dimension={statusDim}
                    group={statusCount}
                    height={180}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : ${d.value} sites`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p> Sites By Activity Class </p>
                  <RowChart
                    dimension={activityDim}
                    group={activityCount}
                    height={180}
                    transitionDuration={300}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : ${d.value} sites`}
                  />
                </Col>
                <Col>
                  <p> Sites by ONRC Outcome </p>
                  <RowChart
                    dimension={outcomeDim}
                    group={outcomeCount}
                    height={180}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : ${d.value} sites`}
                  />
                </Col>
              </Row>
            </ChartContext>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

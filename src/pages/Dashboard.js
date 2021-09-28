import React, { useEffect, useState } from "react";
import crossfilter from "crossfilter2";
import * as d3 from "d3";
import { Container, Row, Col } from "react-bootstrap";
import { RowChart, ChartContext } from "react-dc-js";

function Dashboard() {
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
  
  const ward2Dim = cx.dimension((d) => d.ward);
  const ward2Count = ward2Dim.group().reduceSum(d => d.est_cost / 10000);

  const status2Dim = cx.dimension((d) => d.status);
  const status2Count = status2Dim.group().reduceSum(d => d.est_cost / 10000);

  const activity2Dim = cx.dimension((d) => d.activity_class);
  const activity2Count = activity2Dim.group().reduceSum(d => d.est_cost / 10000);

  const outcome2Dim = cx.dimension((d) => d.onrcoutcome);
  const outcome2Count = outcome2Dim.group().reduceSum(d => d.est_cost / 10000);

  return (
    <div className="dashboard">
      <Container fluid>
      <ChartContext>
        <h2> Progress Dashboard </h2>
        <h4> Site Counts </h4>
        <Row>
          <Col>            
                  <p> Sites By Ward </p>
                  <RowChart
                    dimension={wardDim}
                    group={wardCount}
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
        <h4> Estimated Costs </h4>
        <Row>
          <Col>            
                  <p> Cost By Ward </p>
                  <RowChart
                    dimension={ward2Dim}
                    group={ward2Count}
                    height={180}
                    transitionDuration={300}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : $ ${Math.round(d.value * 10000)} `}
                  />
                </Col>
                <Col>
                  <p> Cost by Status </p>
                  <RowChart
                    dimension={status2Dim}
                    group={status2Count}
                    height={180}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : $ ${Math.round(d.value * 10000)} `}
                  />
                </Col>
                <Col>
                  <p> Cost By Activity Class </p>
                  <RowChart
                    dimension={activity2Dim}
                    group={activity2Count}
                    height={180}
                    transitionDuration={300}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : $ ${Math.round(d.value * 10000)} `}
                  />
                </Col>
                <Col>
                  <p> Cost by ONRC Outcome </p>
                  <RowChart
                    dimension={outcome2Dim}
                    group={outcome2Count}
                    height={180}
                    elasticX={true}
                    colors={"#fcba03"}
                    title={(d) => `${d.key} : $ ${Math.round(d.value * 10000)} `}
                  />
                </Col>
        </Row>
      </ChartContext>
      </Container>
    </div>
  );
}

export default Dashboard;

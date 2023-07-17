import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

import chartlib from "@definite/chartlib";
import * as echarts from "echarts";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// GET ping
app.get("/", (_, res) => res.send({ status: "ok" }));

// GET schema
app.get("/schema", (_, res) => {
  const filePath = path.join(process.cwd(), "schema.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong!" });
    }
    res.send(JSON.parse(data));
  });
});

// POST factory
app.post("/factory", (req, res) => {
  console.log("Request body", req.body);
  let { limit, allow, options } = req.body;
  limit = Math.min(limit, 10);
  let counter = 0;
  const generator = chartlib.chartGenerator(options);
  const data = [];
  while (counter < limit) {
    const { value } = generator.next();
    console.log("Generated chart with type", value.getChartType());
    if (allow.includes(value.getChartType())) {
      console.log("Adding chart to results");
      data.push(value);
      counter++;
    } else {
      console.log("Skipping chart (not allowed)");
    }
  }
  const charts = Array.from(new Set(data.map((chart) => chart.getOptions())));
  res.send(charts);
});

// POST render
app.post("/render", (req, res) => {
  console.log("Request body", req.body);
  let { name, chartConfig, data, height, width } = req.body;
  height = height || 837 / 1.3;
  width = width || 1008 / 1.3;
  try {
    const chart = chartlib.load(chartConfig);
    console.log("Loaded chart of type", chart.getChartType());
    const ecOption = chart.compile(name, data);
    const echart = echarts.init(null, "dark", {
      renderer: "svg",
      ssr: true,
      height,
      width,
    });
    echart.setOption(ecOption);
    const svg = echart.renderToSVGString();
    console.log("Rendered chart to SVG");
    res.send({ ecOption, svg });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Something went wrong!" });
  }
});

// Listen on port 8080
app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
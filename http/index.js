import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

import * as echarts from "echarts";
import chartlib from "@definite/chartlib";
import { CompileChartError, InvalidChartError } from "@definite/chartlib";

const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// Create a middleware function to catch the error
const errorHandler = (err, req, res, next) => {
  if (err.name === "SyntaxError") {
    res.status(400).send({
      error: {
        message: "The request body is not valid JSON",
      },
    });
  } else {
    next(err);
  }
};

app.use(errorHandler);

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
  console.log("Request body", JSON.stringify(req.body));
  let { limit, allow, options } = req.body;
  limit = Math.min(limit, 10);
  let counter = 0;
  let safety = 0;
  const generator = chartlib.chartGenerator(options);
  const data = [];
  while (counter < limit && safety < 25) {
    const { value } = generator.next();
    if (!value) {
      console.warn("No value returned from chart generator");
      break;
    } else {
      console.log("Generated chart with type", value.getChartType());
      if (allow.includes(value.getChartType())) {
        console.log("Adding chart to results");
        data.push(value);
        counter++;
      } else {
        console.log("Skipping chart (not allowed)");
      }
      safety++;
    }
  }
  const charts = Array.from(new Set(data.map((chart) => chart.getOptions())));
  res.send(charts);
});

// POST render
app.post("/render", (req, res) => {
  console.log("Request body", JSON.stringify(req.body));
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
    if (e instanceof InvalidChartError) {
      console.error("Error:", e.message);
      res.status(400).send({ error: e.message });
    } else if (e instanceof CompileChartError) {
      console.error("Error:", e.message);
      res.status(400).send({ error: e.message });
    } else {
      console.error(e);
      res.status(500).send({ error: "Something went wrong!" });
    }
  }
});

// Listen on port 8080
app.listen(8080, () => {
  console.log("Listening on port 8080...");
});

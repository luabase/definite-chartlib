export class CompileChartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CompileChartError";
  }
}

export class InvalidChartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidChartError";
  }
}

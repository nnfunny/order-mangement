import * as fs from "fs";
import { parse } from "fast-csv";
import { json } from "express";

// let stream = fs.createReadStream(__dirname + "/test_data/orders.csv");
// let orders = [];
// stream
//   .pipe(parse())
//   .on("error", (error) => console.log(error))
//   .on("data", (row) => console.log(row))
//   .on("end", (rowCount: number) => console.log(rowCount));

async function parseCSV(path: string, name: string) {
  let parsedData: any[] = [];
  let stream = fs.createReadStream(path);
  stream
    .pipe(parse())
    .on("error", (error) => console.log(error))
    .on("data", (row) => parsedData.push(row))
    .on("end", () => {
      console.table(parsedData);
      let jsonData: any[] = [];
      let header: string[] = parsedData[0];
      for (let i = 1; i < parsedData.length; i++) {
        let item: any = {};
        for (let j = 0; j < header.length; j++) {
          item[header[j]] = parsedData[i][j];
        }
        jsonData.push(item);
      }
      fs.writeFileSync(
        __dirname + `/json/${name}.json`,
        JSON.stringify(jsonData)
      );
    });
}

let customerCompanies = parseCSV(
  __dirname + "/test_data/customer_companies.csv",
  "customerCompanies"
);
let customers = parseCSV(__dirname + "/test_data/customers.csv", "customers");
let deliveries = parseCSV(
  __dirname + "/test_data/deliveries.csv",
  "deliveries"
);
let orderItems = parseCSV(
  __dirname + "/test_data/order_items.csv",
  "orderItems"
);
let orders = parseCSV(__dirname + "/test_data/orders.csv", "orders");

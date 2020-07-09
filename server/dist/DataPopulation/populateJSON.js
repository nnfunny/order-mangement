"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const fast_csv_1 = require("fast-csv");
// let stream = fs.createReadStream(__dirname + "/test_data/orders.csv");
// let orders = [];
// stream
//   .pipe(parse())
//   .on("error", (error) => console.log(error))
//   .on("data", (row) => console.log(row))
//   .on("end", (rowCount: number) => console.log(rowCount));
function parseCSV(path, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let parsedData = [];
        let stream = fs.createReadStream(path);
        stream
            .pipe(fast_csv_1.parse())
            .on("error", (error) => console.log(error))
            .on("data", (row) => parsedData.push(row))
            .on("end", () => {
            console.table(parsedData);
            let jsonData = [];
            let header = parsedData[0];
            for (let i = 1; i < parsedData.length; i++) {
                let item = {};
                for (let j = 0; j < header.length; j++) {
                    item[header[j]] = parsedData[i][j];
                }
                jsonData.push(item);
            }
            fs.writeFileSync(__dirname + `/json/${name}.json`, JSON.stringify(jsonData));
        });
    });
}
let customerCompanies = parseCSV(__dirname + "/test_data/customer_companies.csv", "customerCompanies");
let customers = parseCSV(__dirname + "/test_data/customers.csv", "customers");
let deliveries = parseCSV(__dirname + "/test_data/deliveries.csv", "deliveries");
let orderItems = parseCSV(__dirname + "/test_data/order_items.csv", "orderItems");
let orders = parseCSV(__dirname + "/test_data/orders.csv", "orders");

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_json_1 = __importDefault(require("./json/orders.json"));
const customers_json_1 = __importDefault(require("./json/customers.json"));
const customerCompanies_json_1 = __importDefault(require("./json/customerCompanies.json"));
const orderItems_json_1 = __importDefault(require("./json/orderItems.json"));
const deliveries_json_1 = __importDefault(require("./json/deliveries.json"));
const mongoose_1 = __importDefault(require("mongoose"));
const credential_1 = require("../credential");
const order_1 = __importDefault(require("../models/order"));
function poplulateDatabase() {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j, e_10, _k, e_11, _l, e_12, _m;
    return __awaiter(this, void 0, void 0, function* () {
        let data = [];
        try {
            // Orders
            for (var orders_1 = __asyncValues(orders_json_1.default), orders_1_1; orders_1_1 = yield orders_1.next(), !orders_1_1.done;) {
                const order = orders_1_1.value;
                data.push({
                    orderId: order.id,
                    orderName: order.order_name,
                    customerCompany: "",
                    customerName: order.customer_id,
                    orderDate: new Date(order.created_at),
                    deliveredAmount: 0,
                    totalAmount: 0,
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (orders_1_1 && !orders_1_1.done && (_a = orders_1.return)) yield _a.call(orders_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Customer Names
        let mapCusomter = new Map();
        try {
            for (var customers_1 = __asyncValues(customers_json_1.default), customers_1_1; customers_1_1 = yield customers_1.next(), !customers_1_1.done;) {
                const customer = customers_1_1.value;
                if (!mapCusomter.has(customer.user_id)) {
                    mapCusomter.set(customer.user_id, [customer.name, customer.company_id]);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (customers_1_1 && !customers_1_1.done && (_b = customers_1.return)) yield _b.call(customers_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var data_1 = __asyncValues(data), data_1_1; data_1_1 = yield data_1.next(), !data_1_1.done;) {
                const order = data_1_1.value;
                let name = order.customerName;
                order.customerName = mapCusomter.get(name)[0];
                order.customerCompany = mapCusomter.get(name)[1];
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_c = data_1.return)) yield _c.call(data_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // Comapny Names
        let companyNames = new Map();
        try {
            for (var companies_1 = __asyncValues(customerCompanies_json_1.default), companies_1_1; companies_1_1 = yield companies_1.next(), !companies_1_1.done;) {
                const company = companies_1_1.value;
                if (!companyNames.has(company.company_id)) {
                    companyNames.set(company.company_id, company.company_name);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (companies_1_1 && !companies_1_1.done && (_d = companies_1.return)) yield _d.call(companies_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var data_2 = __asyncValues(data), data_2_1; data_2_1 = yield data_2.next(), !data_2_1.done;) {
                const order = data_2_1.value;
                order.customerCompany = companyNames.get(order.customerCompany);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (data_2_1 && !data_2_1.done && (_e = data_2.return)) yield _e.call(data_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        // Order Items + Delivered Amount
        let orderIdToOrderItem = new Map();
        try {
            for (var orderItems_1 = __asyncValues(orderItems_json_1.default), orderItems_1_1; orderItems_1_1 = yield orderItems_1.next(), !orderItems_1_1.done;) {
                const item = orderItems_1_1.value;
                if (!orderIdToOrderItem.has(item.order_id)) {
                    orderIdToOrderItem.set(item.order_id, [item.id]);
                }
                else {
                    orderIdToOrderItem.get(item.order_id).push(item.id);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (orderItems_1_1 && !orderItems_1_1.done && (_f = orderItems_1.return)) yield _f.call(orderItems_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        let orderItemToDeliver = new Map();
        try {
            for (var deliveries_1 = __asyncValues(deliveries_json_1.default), deliveries_1_1; deliveries_1_1 = yield deliveries_1.next(), !deliveries_1_1.done;) {
                const delivery = deliveries_1_1.value;
                if (!orderItemToDeliver.has(delivery.order_item_id)) {
                    orderItemToDeliver.set(delivery.order_item_id, Number(delivery.delivered_quantity));
                }
                else {
                    let newQuantity = orderItemToDeliver.get(delivery.order_item_id) +
                        Number(delivery.delivered_quantity);
                    orderItemToDeliver.set(delivery.order_item_id, newQuantity);
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (deliveries_1_1 && !deliveries_1_1.done && (_g = deliveries_1.return)) yield _g.call(deliveries_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        let orderItemToPriceDelivery = new Map();
        try {
            for (var orderItems_2 = __asyncValues(orderItems_json_1.default), orderItems_2_1; orderItems_2_1 = yield orderItems_2.next(), !orderItems_2_1.done;) {
                const item = orderItems_2_1.value;
                let priceUnit = item.price_per_unit === "" ? 0 : Number(item.price_per_unit);
                let quantity = orderItemToDeliver.get(item.id) === undefined
                    ? 0
                    : orderItemToDeliver.get(item.id);
                let price = quantity * priceUnit;
                if (!orderItemToPriceDelivery.has(item.id)) {
                    orderItemToPriceDelivery.set(item.id, Number(price.toFixed(2)));
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (orderItems_2_1 && !orderItems_2_1.done && (_h = orderItems_2.return)) yield _h.call(orderItems_2);
            }
            finally { if (e_8) throw e_8.error; }
        }
        try {
            for (var data_3 = __asyncValues(data), data_3_1; data_3_1 = yield data_3.next(), !data_3_1.done;) {
                const order = data_3_1.value;
                let amount = 0;
                try {
                    for (var _o = (e_10 = void 0, __asyncValues(orderIdToOrderItem.get(order.orderId))), _p; _p = yield _o.next(), !_p.done;) {
                        const item = _p.value;
                        amount += orderItemToPriceDelivery.get(item);
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_p && !_p.done && (_k = _o.return)) yield _k.call(_o);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
                order.deliveredAmount = amount;
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (data_3_1 && !data_3_1.done && (_j = data_3.return)) yield _j.call(data_3);
            }
            finally { if (e_9) throw e_9.error; }
        }
        // Total Amount
        let totalAmountMap = new Map();
        try {
            for (var orderItems_3 = __asyncValues(orderItems_json_1.default), orderItems_3_1; orderItems_3_1 = yield orderItems_3.next(), !orderItems_3_1.done;) {
                const item = orderItems_3_1.value;
                let priceUnit = item.price_per_unit === "" ? 0 : Number(item.price_per_unit);
                let quantity = item.quantity === "" ? 0 : Number(item.quantity);
                if (!totalAmountMap.has(item.order_id)) {
                    totalAmountMap.set(item.order_id, Number((priceUnit * quantity).toFixed(2)));
                }
                else {
                    let newTotal = totalAmountMap.get(item.order_id) + quantity * priceUnit;
                    totalAmountMap.set(item.order_id, Number(newTotal.toFixed(2)));
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (orderItems_3_1 && !orderItems_3_1.done && (_l = orderItems_3.return)) yield _l.call(orderItems_3);
            }
            finally { if (e_11) throw e_11.error; }
        }
        try {
            for (var data_4 = __asyncValues(data), data_4_1; data_4_1 = yield data_4.next(), !data_4_1.done;) {
                const order = data_4_1.value;
                order.totalAmount = totalAmountMap.get(order.orderId);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (data_4_1 && !data_4_1.done && (_m = data_4.return)) yield _m.call(data_4);
            }
            finally { if (e_12) throw e_12.error; }
        }
        // console.log(data);
        return data;
    });
}
// poplulateDatabase();
// Connect MongoDB
const dbURI = credential_1.URI;
poplulateDatabase().then((data) => { var data_5, data_5_1; return __awaiter(void 0, void 0, void 0, function* () {
    var e_13, _a;
    yield mongoose_1.default
        .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
    let count = 0;
    try {
        for (data_5 = __asyncValues(data); data_5_1 = yield data_5.next(), !data_5_1.done;) {
            const order = data_5_1.value;
            count++;
            const newOrder = new order_1.default(order);
            newOrder
                .save()
                .then(() => console.log("Successfully"))
                .catch((error) => console.log(error));
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (data_5_1 && !data_5_1.done && (_a = data_5.return)) yield _a.call(data_5);
        }
        finally { if (e_13) throw e_13.error; }
    }
}); });

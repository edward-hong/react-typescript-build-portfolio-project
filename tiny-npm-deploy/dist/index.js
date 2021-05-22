#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('hi there!');
});
app.listen(3005, function () {
    console.log('Listening on 3005');
});

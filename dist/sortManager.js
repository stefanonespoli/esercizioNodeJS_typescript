"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortCitiesByPopulation = exports.SortDirection = void 0;
const lodash_1 = __importDefault(require("lodash"));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
const sortCitiesByPopulation = (cities, direction) => {
    return lodash_1.default.orderBy(cities, ['population'], [direction]);
};
exports.sortCitiesByPopulation = sortCitiesByPopulation;

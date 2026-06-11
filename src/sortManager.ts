import * as _ from 'lodash';
import { type City } from './types'; 

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

export function sortCitiesByPopulation(cities: City[], direction: SortDirection): City[] {
	
    return _.orderBy(cities, ['population'], [direction]);
	
}
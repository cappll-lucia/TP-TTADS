import type { Province } from '../types';

export const getProvinces = async () => {
	try {
		const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=nombre');
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		throw error;
	}
};

export const getLocations = async (provId: string) => {
	try {
		if (provId != '0') {
			const response = await fetch(
				`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provId}&campos=nombre&max=500`
			);
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		throw error;
	}
};

export const getOneLocation = async (provId: string, locId: string) => {
	try {
		const response = await getLocations(provId);
		const foundLocation: Location = response.localidades.find((loc: Location) => loc.id == locId);
		return foundLocation;
	} catch (error) {
		throw error;
	}
};

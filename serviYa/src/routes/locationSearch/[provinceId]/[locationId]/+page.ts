import {error} from '@sveltejs/kit';
import { getOneLocation } from '../../../../data/location_data';

export async function load({params}:any){
    const response = await getOneLocation(params.provinceId ,params.locationId);
    return{
        ...response,
        provinceId: params.provinceId,
        locationId: params.locationId
    }
}


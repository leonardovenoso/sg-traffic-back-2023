import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { getLocationNameByLatLong } from './utils/haversine';
import { LocationDTO } from './dtos/location.dto';

@Injectable()
export class LocationService {
  async fetchLocations(datetime: string): Promise<Array<any>> {
    try {
      const promises = await Promise.all([
        axios.get(
          `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${datetime}`,
        ),
        axios.get(
          `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${datetime}`,
        ),
      ]);

      return [promises[0].data, promises[1].data];
    } catch(e) {
      return [];
    }
  }

  async findAll(datetime: string): Promise<Array<LocationDTO>> {
    const result = await this.fetchLocations(datetime);

    const locations: any = result[0];
    const weather: any = result[1];

    if (
      !Array.isArray(locations?.items) ||
      locations?.items[0].length === 0 ||
      !Array.isArray(weather?.items) ||
      weather.items?.length === 0
    ) {
      return [];
    }

    return locations.items[0].cameras.map((loc) => {
      const locationName = getLocationNameByLatLong(
        loc.location.latitude,
        loc.location.longitude,
        weather.area_metadata,
      );
      const weatherForecast = weather.items[0]?.forecasts?.find(
        (forecast) => forecast.area === locationName,
      ).forecast;
      return new LocationDTO(
        locationName,
        loc.location.latitude,
        loc.location.longitude,
        loc.camera_id,
        loc.image,
        weatherForecast,
      );
    });
  }
}

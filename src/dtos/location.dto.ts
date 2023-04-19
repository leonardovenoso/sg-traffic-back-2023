export class LocationDTO {
  locationName: string;
  lat: number;
  lon: number;
  cameraId: number;
  imageURL: string;
  weatherForecast: string;

  constructor(
    locationName: string,
    lat: number,
    lon: number,
    cameraId: number,
    imageURL: string,
    weatherForecast: string,
  ) {
    this.locationName = locationName;
    this.lat = lat;
    this.lon = lon;
    this.cameraId = cameraId;
    this.imageURL = imageURL;
    this.weatherForecast = weatherForecast;
  }
}

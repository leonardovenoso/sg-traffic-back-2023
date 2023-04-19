import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationDTO } from './dtos/location.dto';
import { DatetimeDTO } from './dtos/datetime.dto';

describe('LocationController', () => {
  let locationController: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    locationService = new LocationService();
    locationController = new LocationController(locationService);
  });

  describe('/v1/locations (GET)', () => {
    it('should return an array with locations when datetime is wellformed', async () => {
      const locationDTO1 = new LocationDTO(
        'Kallang',
        1,
        1,
        1,
        'http://image1.jpg',
        'Cloudy',
      );
      const locationDTO2 = new LocationDTO(
        'Marine Parade',
        1.1,
        1.1,
        1.1,
        'http://image2.jpg',
        'Cloudy',
      );
      const result = [locationDTO1, locationDTO2];
      jest
        .spyOn(locationService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      const datetimeDTO = new DatetimeDTO();
      datetimeDTO.datetime = '2023-04-17T07:36:00';
      const res = await locationController.findAll(datetimeDTO);
      expect(res.length).toEqual(2);
    });

    it('should reject when datetime is not wellformed', async () => {
      const datetimeDTO = new DatetimeDTO();
      datetimeDTO.datetime = '2';
      await expect(locationController.findAll(datetimeDTO)).rejects;
    });

    it('should reject when datetime years is greater than currenet year', async () => {
      const datetimeDTO = new DatetimeDTO();
      datetimeDTO.datetime = '2100-04-18T19:43:00';
      await expect(locationController.findAll(datetimeDTO)).rejects;
    });
  });
});

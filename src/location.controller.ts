import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { DatetimeDTO } from './dtos/datetime.dto';
import { LocationDTO } from './dtos/location.dto';

@Controller('v1/locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  findAll(@Query() datetimeDTO: DatetimeDTO): Promise<Array<LocationDTO>> {
    return this.locationService.findAll(datetimeDTO.datetime);
  }
}

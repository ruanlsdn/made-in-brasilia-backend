import { City } from '@prisma/client';

export class CountCityDto {
  _count: number;
  cities: City[];
}

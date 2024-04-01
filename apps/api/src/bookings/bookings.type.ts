import { SearchBookingPaginationDto } from './dto/search-booking.dto';

export type TimeSlot = {
  startTime: string;
  endTime: string;
};

export type WeeklyHours = {
  monday?: TimeSlot;
  tuesday?: TimeSlot;
  wednesday?: TimeSlot;
  thursday?: TimeSlot;
  friday?: TimeSlot;
  saturday?: TimeSlot;
  sunday?: TimeSlot;
};

export type DateSpecificAvailability = {
  [key: string]: TimeSlot[];
};

export interface BookingFindAllArgs {
  query: SearchBookingPaginationDto;
  userId?: string;
}

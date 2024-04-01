export default interface ServiceType {
  serviceId?: string;
  imageUrls: string[];
  companyName: string;
  friendlyId: string;
  serviceName: string;
  description: string;
  price: number;
  msrp: number;
  saleStartDate: Date | string;
  saleEndDate: Date | string;
  selectedDates?: Date[];
  serviceStartDate?: Date | string;
  serviceEndDate?: Date | string;
  duration: number;
  limitOfBookingsPerDay: number;
  categoryIds: string[];
  additionalDetails: string;
  adminNotes: string;
  weeklyHours: Record<string, any>;
  dateSpecificAvailability: Record<string, any>;
}

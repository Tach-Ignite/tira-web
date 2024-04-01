/* eslint-disable radix */

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MonthOptions = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

export const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const states = [
  { label: 'Alaska', value: 'Alaska' },
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'District of Columbia', value: 'District of Columbia' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'IL', value: 'Illinois' },
  { label: 'Illinois', value: 'Indiana' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Montana', value: 'Montana' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New York', value: 'NewYork' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Washington', value: 'Washington' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wyoming', value: 'Wyoming' },
];

export const currentDate = new Date();

export const currentMonth = currentDate.getMonth() + 1;

export const currentYear = new Date().getFullYear();

export const yearOptions = Array.from(
  { length: 6 },
  (_, index) => currentYear - index,
)?.map((year) => ({ value: year.toString(), label: year.toString() }));

export const getHalfYear = (date: Date) =>
  new Date(date).getFullYear().toString().substr(-2);

export function getTimeOfDay() {
  const currentTime = new Date().getHours();
  if (currentTime >= 5 && currentTime < 12) {
    return 'Morning';
  }
  if (currentTime >= 12 && currentTime < 18) {
    return 'Afternoon';
  }
  if (currentTime >= 18 && currentTime < 22) {
    return 'Evening';
  }
  return 'Night';
}

export const convertToPDTDate = (date: Date) => {
  const pdtDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Los_Angeles', // Set the timezone to PDT
    timeZoneName: 'short', // Include the timezone abbreviation
  });
  return pdtDate;
};

export const getInBetweenDates = (start: Date, end: Date) => {
  if (start && end) {
    const dates = [];
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + 1);
    while (currentDate < end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  return [];
};

export const getWeekdays = (dates: Date[]) => {
  const includedWeekdays = new Set();
  dates.forEach((date) => {
    includedWeekdays.add(weekdays[date.getDay()]);
  });
  return Array.from(includedWeekdays);
};

export const getDayName = (date: Date) =>
  date.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

export const getFullDates = (start: Date, end: Date) => {
  const dates = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    dates.push({
      date: new Date(currentDate),
      day: weekdays[currentDate.getDay()],
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export function convertTo12HourFormat(time: string): string {
  const [hour, minute] = time.split(':');
  const hours12 = parseInt(hour) % 12 || 12;
  const amPm = parseInt(hour) >= 12 ? 'PM' : 'AM';
  return `${hours12}:${minute} ${amPm}`;
}

export function generateTimeOptions() {
  const times = [];
  const periods = ['AM', 'PM'];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 4; j++) {
      const hours = i % 12 === 0 ? 12 : i % 12;
      const minutes = j * 15 === 0 ? '00' : j * 15;
      const period = periods[Math.floor(i / 12)];
      const time = `${hours}:${minutes} ${period}`;
      times.push({ label: time, value: time });
    }
  }

  return times;
}

export const getMinStartDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

export const shouldDisableTime = (value: unknown, view: unknown) => {
  if (view === 'hours') {
    const date = value instanceof Date ? value : new Date(value as Date);
    const hour = date.getHours();
    return hour < 8 || hour >= 20; // Disable hours before 8 AM and after 8 PM
  }
  return false; // Allow all minutes
};

export const timeSteps = { minutes: 15 };

export const dateFormat = 'dd/MM/yyyy HH:mm';

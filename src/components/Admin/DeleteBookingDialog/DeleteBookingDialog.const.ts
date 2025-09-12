export const DELETE_BOOKING_DIALOG_CONST = {
  TEXTS: {
    title: 'Изтриване на резервация',
    confirmMessage: 'Сигурни ли сте, че искате да изтриете резервацията за:',
    warningMessage:
      '⚠️ Това действие ще маркира резервацията като изтрита и ще отключи автомобила за тези дати.',
    infoMessage:
      '⚠️ Резервацията ще продължи да бъде видима в администраторския панел, но ще бъде маркирана като изтрита.',
    cancel: 'Отказ',
    delete: 'Изтрий',
    deleting: 'Изтриване...',
  },
  DATE_FORMAT_OPTIONS: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
  LOCALE: 'bg-BG',
} as const;

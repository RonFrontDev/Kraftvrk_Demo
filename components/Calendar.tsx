import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface CalendarProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  pinnedDates: string[];
  t: (key: string) => string;
}

const Calendar = ({ currentMonth, onMonthChange, selectedDate, onDateSelect, pinnedDates, t }: CalendarProps): React.ReactNode => {

  const toYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];

  const renderHeader = () => {
    const monthName = currentMonth.toLocaleString(t('langCode') as string, { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={t('wod.prevMonth')}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">{monthName} {year}</h3>
        <button
          onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={t('wod.nextMonth')}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [t('wod.daySun'), t('wod.dayMon'), t('wod.dayTue'), t('wod.dayWed'), t('wod.dayThu'), t('wod.dayFri'), t('wod.daySat')];
    return (
      <div className="grid grid-cols-7 text-center font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase">
        {days.map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - monthStart.getDay());
    const endDate = new Date(monthEnd);
    if(monthEnd.getDay() !== 6) {
        endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
    }

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = new Date(startDate);
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const dayKey = toYYYYMMDD(cloneDay);
        
        const isSelected = toYYYYMMDD(selectedDate) === dayKey;
        const isPinned = pinnedDates.includes(dayKey);
        const isCurrentMonth = cloneDay.getMonth() === currentMonth.getMonth();

        let dayClasses = "relative h-16 w-full flex items-center justify-center text-lg rounded-full transition-colors cursor-pointer ";
        if (!isCurrentMonth) {
            dayClasses += "text-gray-400 dark:text-gray-600";
        } else if (isSelected) {
            dayClasses += "bg-accent text-black font-bold";
        } else {
            dayClasses += "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800";
        }

        days.push(
          <div
            key={dayKey}
            className="p-1 flex items-center justify-center"
            onClick={() => onDateSelect(cloneDay)}
          >
            <div className={dayClasses}>
              <span>{cloneDay.getDate()}</span>
              {isPinned && isCurrentMonth && <div className={`absolute bottom-2 h-2 w-2 rounded-full ${isSelected ? 'bg-black' : 'bg-accent'}`}></div>}
            </div>
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>{days}</div>
      );
      days = [];
    }
    return <>{rows}</>;
  };


  return (
    <div className="bg-white dark:bg-[#1c1c1e] p-6 rounded-lg shadow-md">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
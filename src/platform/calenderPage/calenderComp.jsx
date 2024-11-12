import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, startOfWeek, endOfWeek, addDays, isSameMonth, subDays } from 'date-fns';
import { useSelector } from 'react-redux';
import Reminders from '../reminder/reminder'
import { Add } from '@mui/icons-material'; 

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()));
  const [currentDay, setCurrentDay] = useState(new Date());

  const sidebarWidth = useSelector((state) => state.sidebar.width);
  
 const togglemode = "createmode";
  
 const events = {
    '2024-11-01': ['due', 'class'],
    '2024-11-08': ['due'],
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const nextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));
  const prevWeek = () => setCurrentWeekStart(subDays(currentWeekStart, 7));

  const nextDay = () => setCurrentDay(addDays(currentDay, 1));
  const prevDay = () => setCurrentDay(subDays(currentDay, 1));

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map((day) => (
      <div key={day} className="p-4 h-16 flex items-center justify-center border-[0.5px] border-[#ADB8B8] bg-[#D9DEDE] text-black font-medium">
        {day}
      </div>
    ));
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const isCurrentMonth = isSameMonth(day, monthStart);
        const dayEvents = events[formattedDate] || [];

        days.push(
          <div key={day} className={`relative p-4 h-[100px] flex items-start justify-end border-[0.5px] border-[#ADB8B8] bg-white`}>
            {isCurrentMonth && (
              <>
                <span className="text-gray-800 font-semibold">{format(day, 'd')}</span>
                <div className="absolute bottom-1 left-1 flex space-x-1">
                  {dayEvents.map((eventType, index) => (
                    <span
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        eventType === 'due' ? 'bg-red-500' : 'bg-yellow-400'
                      }`}
                      title={eventType === 'due' ? 'Due Assignment' : 'Scheduled Class'}
                    ></span>
                  ))}
                </div>
              </>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day} className="grid grid-cols-7">{days}</div>);
      days = [];
    }
    return rows;
  };

  const renderWeekView = () => {
    const startDate = startOfWeek(currentWeekStart);
    const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    return (
      <div className="grid grid-cols-7 text-center">
        {days.map((day) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const dayEvents = events[formattedDate] || [];

          return (
            <div key={day} className="relative p-4 h-20 flex items-center justify-center border-[0.5px] bg-white border-[#ADB8B8]">
              <span className="text-gray-800 font-semibold">{format(day, 'E d')}</span>
              <div className="absolute bottom-1 left-1 flex space-x-1">
                {dayEvents.map((eventType, index) => (
                  <span
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      eventType === 'due' ? 'bg-red-500' : 'bg-yellow-400'
                    }`}
                    title={eventType === 'due' ? 'Due Assignment' : 'Scheduled Class'}
                  ></span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const day = new Date(currentDay);
    const formattedDate = format(day, 'yyyy-MM-dd');
    const dayEvents = events[formattedDate] || [];

    return (
      <div className="p-4 rounded-lg bg-white border text-center">
        <span className="text-lg font-semibold">{format(day, 'EEEE, MMMM d, yyyy')}</span>
        <div className="mt-4">
          {dayEvents.length > 0 ? (
            dayEvents.map((eventType, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md text-white ${
                  eventType === 'due' ? 'bg-red-500' : 'bg-yellow-400'
                }`}
              >
                {eventType === 'due' ? 'Due Assignment' : 'Scheduled Class'}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No events</div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div className={`mt-[1.5rem] bg-[#E1EAE8]  transition-all duration-500 ease-in-out ${isPageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s ease,translate 0.3 ease' }}>

      <div className="flex space-x-4 mb-4 ml-[40px]">
        {['month', 'week', 'day'].map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`px-3 py-1 rounded-lg font-semibold ${currentView === view ? 'bg-[#ADB8B8] text-[#394141]' : 'bg-none text-[#394141]'}`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      <div className='flex'>
        <div className="rounded-lg p-4 w-[70%] ml-[28px]">
          <div className="flex items-center mb-4 ">
            <h2 className="text-lg font-semibold text-gray-800 w-[150px]">
              {currentView === 'month' ? format(currentMonth, 'MMMM yyyy') :
               currentView === 'week' ? ` ${format(currentWeekStart, 'MMMM  yyyy')}` :
               format(currentDay, 'MMMM  yyyy')}
            </h2>

            {currentView === 'month' && (
              <>
                <button onClick={prevMonth} className="text-gray-500 px-2 py-0.5 mx-1 my-0.5 bg-[#D9DEDE] rounded-2xl">{'<'}</button>
                <button onClick={nextMonth} className="text-gray-500 px-2 py-0.5 mx-1 my-0.5 bg-[#D9DEDE] rounded-2xl">{'>'}</button>
              </>
            )}
            {currentView === 'week' && (
              <>
                <button onClick={prevWeek} className="text-gray-500 px-2 py-0.5 mx-1 my-0.5 bg-[#D9DEDE] rounded-2xl">{'<'}</button>
                <button onClick={nextWeek} className="text-gray-500 px-2 py-0.5 mx-1 my-0.5 bg-[#D9DEDE] rounded-2xl">{'>'}</button>
              </>
            )}
            {currentView === 'day' && (
              <>
                <button onClick={prevDay} className="text-gray-500 px-2 py-0.5 mx-1 my-0.5 bg-[#D9DEDE] rounded-2xl">{'<'}</button>
                <button onClick={nextDay} className="text-gray-500 px-2 py-0.5 mx-1 my-0.5 bg-[#D9DEDE] rounded-2xl">{'>'}</button>
              </>
            )}
            <div className=' flex gap-2 ml-auto items-center'>

            <div
               className="w-3 h-3 rounded-full bg-yellow-400"
                    ></div>

            <h3>Scheduled Class</h3>


            {togglemode === 'createmode' && (
            <button className='w-[80px] h-[35px] pr-[10px] pl-[10px] bg-[#066769] rounded-xl text-white ml-[10px] flex items-center'>
            <Add className="mr-1" /> Add
            </button>
                )}
             

              {togglemode==='joinedmode' && (
                <>
                 <div
                    className="w-3 h-3 rounded-full bg-red-500"
                 ></div>
              <h3>Due Assignment</h3>
              </>
              )}


  </div>
           






          </div>




          <div className="grid grid-cols-7">{renderDaysOfWeek()}</div>

          <div>
            {currentView === 'month' && renderMonthView()}
            {currentView === 'week' && renderWeekView()}
            {currentView === 'day' && renderDayView()}
          </div>
        </div>
        <Reminders />
      </div>
    </div>
  );
};

export default Calendar;

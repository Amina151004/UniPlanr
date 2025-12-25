import React, { useEffect, useState, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '/src/services/api.js';

const calendarStyles = `
  .fc .fc-button {
    background-color: white !important;
    color: #374151 !important;
    border: 1px solid #d1d5db !important;
    font-weight: 400 !important;
    font-size: 0.875rem !important;
    padding: 0.5rem 0.75rem !important;
  }
  
  .fc .fc-button:hover {
    background-color: #f9fafb !important;
    border-color: #9ca3af !important;
  }
  
  .fc .fc-button:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
  }
  
  .fc .fc-button-active {
    background-color: #e5e7eb !important;
    border-color: #9ca3af !important;
  }
  
  .fc .fc-button:disabled {
    opacity: 0.5 !important;
    background-color: white !important;
  }
  
  .fc .fc-toolbar-title {
    font-weight: 500 !important;
    font-size: 1.125rem !important;
    color: #1f2937 !important;
  }
  
  @media (max-width: 768px) {
    .fc .fc-toolbar-title {
      font-size: 1rem !important;
    }
    
    .fc .fc-button {
      font-size: 0.75rem !important;
      padding: 0.375rem 0.5rem !important;
    }
  }
  
  .fc .fc-col-header-cell-cushion {
    font-weight: 400 !important;
    color: #6b7280 !important;
    text-transform: uppercase !important;
    font-size: 0.75rem !important;
    letter-spacing: 0.05em !important;
  }
  
  .fc .fc-daygrid-day-number {
    font-weight: 400 !important;
    color: #374151 !important;
    font-size: 0.875rem !important;
  }
  
  .fc .fc-timegrid-slot-label-cushion {
    font-weight: 300 !important;
    color: #6b7280 !important;
    font-size: 0.75rem !important;
  }
  
  .fc .fc-event-title {
    font-weight: 400 !important;
    font-size: 0.875rem !important;
  }
  
  .fc .fc-event-time {
    font-weight: 300 !important;
    font-size: 0.75rem !important;
  }
  
  .fc-theme-standard td, .fc-theme-standard th {
    border-color: #e5e7eb !important;
  }
  
  .fc-theme-standard .fc-scrollgrid {
    border-color: #e5e7eb !important;
  }
`;

function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get('/calendar/events');
        
        const eventsData = response.data.events || [];
        
        const transformedEvents = eventsData.map(event => ({
          id: event.id?.toString() || Math.random().toString(),
          title: event.title || 'No Title',
          start: event.start.replace(' ', 'T'),
          end: event.end.replace(' ', 'T'),
          description: event.description || '',
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
        })).filter(Boolean);
        
        setEvents(transformedEvents);
        setError(null);
      } catch (err) {
        console.error('Error fetching calendar events:', err);
        setError('Failed to load calendar events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg">Loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <style>{calendarStyles}</style>
      
      {/* Event Details Card Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800 pr-4">
                {selectedEvent.title}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none flex-shrink-0"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-medium text-gray-600 sm:w-20 mb-1 sm:mb-0">Start:</span>
                <span className="text-gray-800">
                  {new Date(selectedEvent.start).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-medium text-gray-600 sm:w-20 mb-1 sm:mb-0">End:</span>
                <span className="text-gray-800">
                  {new Date(selectedEvent.end).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </span>
              </div>
              
              {selectedEvent.description && (
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-gray-600 sm:w-20 mb-1 sm:mb-0">Details:</span>
                  <span className="text-gray-800">{selectedEvent.description}</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Main Large Calendar */}
        <div className="w-full lg:w-[45rem] h-[25rem] sm:h-[30rem] bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 overflow-auto">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={isMobile ? "dayGridMonth" : "timeGridWeek"}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: isMobile ? 'dayGridMonth' : 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            height="100%"
            eventDisplay="block"
            displayEventTime={true}
            displayEventEnd={true}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            slotMinTime="07:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            slotDuration="00:30:00"
            expandRows={true}
            eventClick={(info) => {
              setSelectedEvent({
                title: info.event.title,
                start: info.event.start,
                end: info.event.end,
                description: info.event.extendedProps.description
              });
            }}
          />
        </div>

        {/* Small Calendar - Hidden on mobile */}
        <div className="hidden lg:block w-[25rem] h-[25rem] bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next'
            }}
            events={events}
            height="100%"
            eventDisplay="list-item"
            dayMaxEvents={2}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            eventClick={(info) => {
              setSelectedEvent({
                title: info.event.title,
                start: info.event.start,
                end: info.event.end,
                description: info.event.extendedProps.description
              });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
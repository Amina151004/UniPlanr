import React, { useEffect, useState } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'

function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda()
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.PlainDate.from('2024-11-28'),
        end: Temporal.PlainDate.from('2024-12-16'),
      },
    ],
    plugins: [eventsService],
  })

  const smcalendar = useCalendarApp({
    views: [
      createViewMonthAgenda()
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.PlainDate.from('2024-11-28'),
        end: Temporal.PlainDate.from('2024-12-16'),
      },
    ],
    plugins: [eventsService],
  })

  useEffect(() => {
    eventsService.getAll()
  }, [])

  return (
    <div className="flex gap-6 mt-4">
    <div className="w-[45rem] h-[30rem] overflow-auto overflow-y-scroll no-scrollbar">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
    <div className="w-[25rem] h-[25rem]">
        <ScheduleXCalendar calendarApp={smcalendar} />
    </div>
    </div>
  )
}

export default Calendar

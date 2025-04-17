import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
 
function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const eventModal = createEventModalPlugin()
 
  const calendar = useCalendarApp({
    views: [ createViewMonthGrid()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-04-16',
        end: '2025-04-16',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2025-04-16',
        end: '2025-04-16',
      },
      {
        id: '3',
        title: 'Event 3',
        start: '2025-04-16',
        end: '2025-04-16',
      },
      {
        id: '4',
        title: 'Event 34',
        start: '2025-04-16',
        end: '2025-04-16',
      },
      {
        id: '5',
        title: 'Event 65',
        start: '2025-04-16',
        end: '2025-04-16',
      },
    ],
    plugins: [
      eventsService, 
      createDragAndDropPlugin(),
      eventModal
    ]
  })
  
  eventModal.close()

  useEffect(() => {
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default Calendar
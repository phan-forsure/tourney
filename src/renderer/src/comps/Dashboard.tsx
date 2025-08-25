import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@renderer/components/ui/card'
import { Badge } from '@renderer/components/ui/badge'
import { Button } from '@renderer/components/ui/button'
import { Calendar, Clock, Pill, ChevronLeft, ChevronRight } from 'lucide-react'
import TestResultsTable from './DataTable'

// Sample medication data
const medicationData = {
  '2025-01-15': [
    { name: 'Vitamin D', time: '8:00 AM', dosage: '1000 IU' },
    { name: 'Metformin', time: '6:00 PM', dosage: '500mg' },
  ],
  '2025-01-16': [
    { name: 'Vitamin D', time: '8:00 AM', dosage: '1000 IU' },
    { name: 'Lisinopril', time: '12:00 PM', dosage: '10mg' },
    { name: 'Metformin', time: '6:00 PM', dosage: '500mg' },
  ],
  '2025-01-17': [
    { name: 'Vitamin D', time: '8:00 AM', dosage: '1000 IU' },
    { name: 'Metformin', time: '6:00 PM', dosage: '500mg' },
  ],
}

// Sample test results data

function MedicationCalendar(): React.JSX.Element {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 15)) // January 15, 2025
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const navigateMonth = (direction: 'prev' | 'next'): void => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <Card className="mb-12 p-20 border border-green-100 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Calendar className="h-5 w-5 text-green-600" />
              Medication Calendar
            </CardTitle>
            <CardDescription className="text-green-600">
              Hover over dates to see scheduled medications
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="cursor-pointer border-green-100 text-green-700 hover:bg-green-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[120px] text-lg text-center text-green-700">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="cursor-pointer border-green-100 text-green-700 hover:bg-green-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-green-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 relative">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="p-2 h-12"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const dateKey = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
            const hasMedications = medicationData[dateKey]

            return (
              <div
                key={day}
                className={`p-2 h-24 rounded-md cursor-pointer transition-colors relative ${
                  hasMedications ? 'bg-green-50' : 'hover:bg-green-50/50'
                }`}
                onMouseEnter={() => setHoveredDate(dateKey)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <span className="text-sm text-green-700">{day}</span>
                {hasMedications && (
                  <div className="absolute bottom-1 right-1">
                    <Pill className="h-3 w-3 text-green-600" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Medication tooltip */}
        {hoveredDate && medicationData[hoveredDate] && (
          <div className="mt-12 p-8 bg-green-50 rounded-lg shadow-sm">
            <h2 className="font-bold mb-2 flex items-center gap-2 text-green-700">
              <Clock className="h-4 w-4" />
              Medications for {hoveredDate}
            </h2>
            <div className="space-y-2">
              {medicationData[hoveredDate].map((med, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-xl text-green-700">{med.name}</span>
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="text-lg">{med.time}</span>
                    <Badge variant="secondary" className="text-lg bg-green-100 text-green-700">
                      {med.dosage}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function HealthDashboard(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-white p-6 text-2xl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Health Dashboard</h1>
          <p className="text-green-600">Monitor your medications and track your health progress</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          <MedicationCalendar />
          <TestResultsTable />
        </div>
      </div>
    </div>
  )
}

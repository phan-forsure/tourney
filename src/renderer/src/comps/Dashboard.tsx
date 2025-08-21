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
import { Calendar, Clock, Pill, TestTube, ChevronLeft, ChevronRight } from 'lucide-react'

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
const testResults = [
  {
    id: 1,
    testName: 'Blood Glucose',
    date: '2025-01-10',
    result: '95 mg/dL',
    status: 'Normal',
    referenceRange: '70-100 mg/dL',
    doctor: 'Dr. Smith',
  },
  {
    id: 2,
    testName: 'Blood Pressure',
    date: '2025-01-08',
    result: '128/82 mmHg',
    status: 'Elevated',
    referenceRange: '<120/80 mmHg',
    doctor: 'Dr. Johnson',
  },
  {
    id: 3,
    testName: 'Cholesterol Total',
    date: '2025-01-05',
    result: '185 mg/dL',
    status: 'Normal',
    referenceRange: '<200 mg/dL',
    doctor: 'Dr. Smith',
  },
  {
    id: 4,
    testName: 'HbA1c',
    date: '2025-01-03',
    result: '6.2%',
    status: 'Prediabetic',
    referenceRange: '<5.7%',
    doctor: 'Dr. Smith',
  },
]

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
    <Card className="mb-12! p-20 border-0! bg-neutral-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Medication Calendar
            </CardTitle>
            <CardDescription>Hover over dates to see scheduled medications</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 cursor-pointer" />
            </Button>
            <span className="font-medium min-w-[120px] text-lg! text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 cursor-pointer" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
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
                className={`p-2 h-24 bg-[var(--color-background-soft)] rounded-md cursor-pointer transition-colors relative ${
                  hasMedications ? 'bg-neutral-800/10' : 'hover:bg-[var(--color-background-muted)]'
                }`}
                onMouseEnter={() => setHoveredDate(dateKey)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <span className="text-sm">{day}</span>
                {hasMedications && (
                  <div className="absolute bottom-1 right-1">
                    <Pill className="h-3 w-3 text-primary" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Medication tooltip */}
        {hoveredDate && medicationData[hoveredDate] && (
          <div className="mt-12! p-8 bg-[var(--color-background-soft)] rounded-lg shadow-sm">
            <h2 className="font-bold! mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Medications for {hoveredDate}
            </h2>
            <div className="space-y-2">
              {medicationData[hoveredDate].map((med, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-xl">{med.name}</span>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-lg">{med.time}</span>
                    <Badge variant="secondary" className="text-lg">
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

function TestResultsTable(): React.JSX.Element {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'elevated':
      case 'prediabetic':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high':
      case 'abnormal':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="mb-12! p-20 border-0! bg-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-primary" />
          Test Results & Appointments
        </CardTitle>
        <CardDescription>Track your medical tests and results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto text-lg!">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Test Name</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Result</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Reference Range</th>
                <th className="text-left p-3 font-medium">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((test) => (
                <tr
                  key={test.id}
                  className="border-b hover:bg-[var(--color-background-soft)] transition-all"
                >
                  <td className="p-3 font-medium">{test.testName}</td>
                  <td className="p-3 text-muted-foreground">{test.date}</td>
                  <td className="p-3 font-mono">{test.result}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">{test.referenceRange}</td>
                  <td className="p-3 text-muted-foreground">{test.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HealthDashboard(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background p-6 text-2xl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8!">
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your medications and track your health progress
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          <MedicationCalendar />
          <TestResultsTable />
        </div>
      </div>
    </div>
  )
}

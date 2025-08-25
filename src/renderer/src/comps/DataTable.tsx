import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@renderer/components/ui/card'
import { TestTube } from 'lucide-react'
import { Badge } from '@renderer/components/ui/badge'

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

export default function TestResultsTable(): React.JSX.Element {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'elevated':
      case 'prediabetic':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'high':
      case 'abnormal':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <Card className="mb-12 p-20 border border-green-100 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <TestTube className="h-5 w-5 text-green-600" />
          Test Results & Appointments
        </CardTitle>
        <CardDescription className="text-green-600">
          Track your medical tests and results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto text-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-100">
                <th className="text-left p-3 font-medium text-green-700">Test Name</th>
                <th className="text-left p-3 font-medium text-green-700">Date</th>
                <th className="text-left p-3 font-medium text-green-700">Result</th>
                <th className="text-left p-3 font-medium text-green-700">Status</th>
                <th className="text-left p-3 font-medium text-green-700">Reference Range</th>
                <th className="text-left p-3 font-medium text-green-700">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((test) => (
                <tr
                  key={test.id}
                  className="border-b border-green-50 hover:bg-green-50/50 transition-all"
                >
                  <td className="p-3 font-medium text-green-700">{test.testName}</td>
                  <td className="p-3 text-green-600">{test.date}</td>
                  <td className="p-3 font-mono text-green-700">{test.result}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-green-600">{test.referenceRange}</td>
                  <td className="p-3 text-green-600">{test.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

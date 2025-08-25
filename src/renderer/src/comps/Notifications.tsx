import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@renderer/components/ui/card'
import { BellDot } from 'lucide-react'

const notificationsList = [
  {
    id: 1,
    content: 'Hello',
  },
]

export default function Notifications(): React.JSX.Element {
  return (
    <Card className="p-10 m-4! w-full border-0 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <BellDot className="h-5 w-5 text-green-600" />
          Notifications
        </CardTitle>
        <CardDescription className="text-green-600">
          Reminders to help you remember medications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto text-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-100">
                <th className="text-left p-3 font-medium text-green-700">Notification</th>
                <th className="text-left p-3 font-medium text-green-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {notificationsList.map((test) => (
                <tr
                  key={test.id}
                  className="border-b border-green-50 hover:bg-green-50/50 transition-all"
                >
                  <td className="p-3 font-medium text-green-700">{test.content}</td>
                  <td className="p-3 text-green-600">{test.content}</td>
                  <td className="p-3 font-mono text-green-700">{test.content}</td>
                  <td className="p-3"></td>
                  <td className="p-3 text-green-600">{test.content}</td>
                  <td className="p-3 text-green-600">{test.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

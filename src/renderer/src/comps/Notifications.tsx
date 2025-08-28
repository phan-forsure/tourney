/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@renderer/components/ui/card'
import { BellDot } from 'lucide-react'
import { Checkbox } from '@renderer/components/ui/checkbox'

interface Notification {
  id: number
  content: string
  date: string
  type: 'medication' | 'appointment' | 'result' | 'reminder'
  status: 'pending' | 'completed'
  checked?: boolean
}

const notificationsList: Notification[] = [
  {
    id: 1,
    content: 'Take Blood Pressure Medication',
    date: '2025-08-28 08:00 AM',
    type: 'medication',
    status: 'pending',
  },
  {
    id: 2,
    content: 'Upcoming Cardiology Appointment',
    date: '2025-08-30 02:30 PM',
    type: 'appointment',
    status: 'pending',
  },
  {
    id: 3,
    content: 'Blood Test Results Available',
    date: '2025-08-27 11:20 AM',
    type: 'result',
    status: 'completed',
  },
  {
    id: 4,
    content: 'Time for Evening Insulin Shot',
    date: '2025-08-28 07:00 PM',
    type: 'medication',
    status: 'pending',
  },
]

export default function Notifications(): React.JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsList)

  const handleCheck = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              checked: !notification.checked,
              status: `${notification.checked ? 'pending' : 'completed'}`,
            }
          : notification,
      ),
    )
  }

  return (
    <Card className="p-10 m-4! w-full border-0 bg-white shadow-sm max-h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <BellDot className="h-5 w-5 text-green-600" />
          Notifications
        </CardTitle>
        <CardDescription className="text-green-600">
          Your upcoming health reminders and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-4">
        <div className="overflow-x-auto text-lg">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-green-100">
                <th className="text-left p-3 font-medium text-green-700 w-8"></th>
                <th className="text-left p-3 font-medium text-green-700">Notification</th>
                <th className="text-left p-3 font-medium text-green-700">Type</th>
                <th className="text-left p-3 font-medium text-green-700">Date</th>
                <th className="text-left p-3 font-medium text-green-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`border-b border-green-50 hover:bg-green-50/50 transition-all ${
                    notification.checked ? 'opacity-50' : ''
                  }`}
                >
                  <td className="p-3">
                    <Checkbox
                      checked={notification.checked}
                      onCheckedChange={() => handleCheck(notification.id)}
                      className="border-green-600"
                    />
                  </td>
                  <td
                    className={`p-3 font-medium text-green-700 ${
                      notification.checked ? 'line-through' : ''
                    }`}
                  >
                    {notification.content}
                  </td>
                  <td className="p-3 text-green-600 capitalize">{notification.type}</td>
                  <td className="p-3 text-green-600">{notification.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        notification.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {notification.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

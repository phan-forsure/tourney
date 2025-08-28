import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Spinner } from '@renderer/components/ui/spinner'

interface DietFormData {
  age: string
  weight: string
  height: string
  activity: string
  goal: string
  restrictions: string
}

export default function DietPlan(): React.JSX.Element {
  const [formData, setFormData] = useState<DietFormData>({
    age: '',
    weight: '',
    height: '',
    activity: 'moderate',
    goal: 'maintain',
    restrictions: '',
  })

  const [plan, setPlan] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate AI response with 1 second delay
    setTimeout(() => {
      setPlan([
        'Breakfast: Oatmeal with berries and nuts',
        'Lunch: Grilled chicken salad with olive oil dressing',
        'Dinner: Baked salmon with quinoa and vegetables',
        'Snacks: Greek yogurt with honey, Mixed nuts',
        'Daily calorie target: 2000 kcal',
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 m-20! p-20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">Personalized Diet Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="border-green-200 p-4! my-4! focus:border-green-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="border-green-200 p-4! my-4! focus:border-green-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <select
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="w-full p-4 my-4! border border-green-200 rounded-lg focus:border-green-400"
            >
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full mt-8! text-white cursor-pointer bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? 'Generating Plan...' : 'Generate Diet Plan'}
          </Button>
        </form>

        {isLoading && (
          <div className="mt-16! text-xl flex flex-col items-center space-y-4">
            <Spinner />
            <p className="text-green-600">Analyzing your data...</p>
          </div>
        )}

        {plan.length > 0 && !isLoading && (
          <div className="mt-8! space-y-4 text-xl">
            <h3 className="text-xl py-4 font-semibold text-green-700">Your Diet Plan</h3>
            <div className="space-y-2">
              {plan.map((item, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

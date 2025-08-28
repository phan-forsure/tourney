import { useState } from 'react'
import { AlertCircle, CheckCircle2, Stethoscope, Calendar, ChevronRight } from 'lucide-react'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Button } from '@renderer/components/ui/button'
import { Spinner } from '@renderer/components/ui/spinner'

interface CancerData {
  age: number
  menopause: number
  tumorSize: number
  invNodes: number
  nodeCaps: number
  degMalig: number
  breast: number
  breastQuad: number
  irradiat: number
}

interface Recommendation {
  title: string
  items: string[]
}

const safeRecommendations: Recommendation[] = [
  {
    title: 'Preventive Measures',
    items: [
      'Continue regular self-examinations',
      'Maintain annual mammogram schedule',
      'Follow a healthy lifestyle with regular exercise',
      'Maintain a balanced, nutritious diet',
    ],
  },
  {
    title: 'Follow-up Plan',
    items: [
      'Schedule next routine check-up in 6-12 months',
      'Report any changes in breast tissue immediately',
      'Keep records of all examinations and results',
      'Stay updated with latest screening guidelines',
    ],
  },
]

const suspiciousRecommendations: Recommendation[] = [
  {
    title: 'Immediate Actions',
    items: [
      'Schedule follow-up diagnostic mammogram',
      'Consult with specialist for detailed examination',
      'Consider biopsy if recommended',
      'Gather family medical history details',
    ],
  },
  {
    title: 'Support & Care',
    items: [
      'Connect with breast cancer support groups',
      'Discuss treatment options with healthcare team',
      'Consider genetic counseling if appropriate',
      'Maintain close communication with primary care physician',
    ],
  },
]

export default function CancerDetection(): React.JSX.Element {
  const [formData, setFormData] = useState<CancerData>({
    age: 0,
    menopause: 0,
    tumorSize: 0,
    invNodes: 0,
    nodeCaps: 0,
    degMalig: 0,
    breast: 0,
    breastQuad: 0,
    irradiat: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    prediction: string
    confidence: number
  } | null>(null)

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        prediction: Math.random() > 0.5 ? 'Safe' : 'Suspicious',
        confidence: Math.random() * (0.99 - 0.7) + 0.7,
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleInputChange =
    (field: keyof CancerData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: Number(e.target.value),
      }))
    }

  return (
    <div className="max-w-4xl mx-auto p-6 flex justify-center flex-wrap">
      <div className="text-center mb-8!">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Breast Cancer Detection</h2>
        <p className="text-green-600">Enter patient data for AI-powered cancer detection</p>
      </div>

      <div className="bg-white p-20 rounded-lg shadow-sm border border-green-100 w-full">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 outline-none">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange('age')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="menopause">Menopause Status</Label>
            <Input
              id="menopause"
              type="number"
              value={formData.menopause}
              onChange={handleInputChange('menopause')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tumorSize">Tumor Size</Label>
            <Input
              id="tumorSize"
              type="number"
              value={formData.tumorSize}
              onChange={handleInputChange('tumorSize')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invNodes">Inv-Nodes</Label>
            <Input
              id="invNodes"
              type="number"
              value={formData.invNodes}
              onChange={handleInputChange('invNodes')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nodeCaps">Node-Caps</Label>
            <Input
              id="nodeCaps"
              type="number"
              value={formData.nodeCaps}
              onChange={handleInputChange('nodeCaps')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degMalig">Deg-Malig</Label>
            <Input
              id="degMalig"
              type="number"
              value={formData.degMalig}
              onChange={handleInputChange('degMalig')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breast">Breast</Label>
            <Input
              id="breast"
              type="number"
              value={formData.breast}
              onChange={handleInputChange('breast')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breastQuad">Breast-Quad</Label>
            <Input
              id="breastQuad"
              type="number"
              value={formData.breastQuad}
              onChange={handleInputChange('breastQuad')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="irradiat">Irradiat</Label>
            <Input
              id="irradiat"
              type="number"
              value={formData.irradiat}
              onChange={handleInputChange('irradiat')}
              className="border-green-200 outline-none! border-0! focus:border-green-400"
            />
          </div>

          <div className="col-span-2 mt-4">
            <Button
              type="submit"
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white"
            >
              Analyze Data
            </Button>
          </div>
        </form>

        {isLoading && (
          <div className="mt-16! text-2xl flex flex-col items-center space-y-4">
            <Spinner />
            <p className="text-green-600">Analyzing patient data...</p>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-8 mt-8!">
            <div
              className={`p-4 rounded-lg ${
                result.prediction === 'Safe'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {result.prediction === 'Safe' ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <AlertCircle className="text-red-600" />
                )}
                <h3
                  className={`font-semibold ${
                    result.prediction === 'Safe' ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {result.prediction}
                </h3>
              </div>
              <p
                className={`mt-1 ${
                  result.prediction === 'Safe' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>

            <div
              className={`recommendations space-y-6 mt-12! p-8 text-lg ${
                result.prediction === 'Safe'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <h3
                className={`text-xl font-semibold ${result.prediction == 'Safe' ? 'text-green-600' : 'text-red-600'} flex items-center gap-2`}
              >
                <Stethoscope className="h-5 w-5" />
                Recommended Actions
              </h3>

              {(result.prediction === 'Safe' ? safeRecommendations : suspiciousRecommendations).map(
                (section, index) => (
                  <div key={index} className="space-y-3 mt-4!">
                    <h4
                      className={`text-lg font-bold ${result.prediction == 'Safe' ? 'text-green-600' : 'text-red-600'} flex items-center gap-2`}
                    >
                      <Calendar className="h-4 w-4" />
                      {section.title}
                    </h4>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-2 ${result.prediction == 'Safe' ? 'text-green-500' : 'text-red-500'}`}
                        >
                          <ChevronRight
                            className={`h-5 w-5 mt-0.5 flex-shrink-0 ${result.prediction == 'Safe' ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

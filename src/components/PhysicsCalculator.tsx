import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InputField {
  name: string;
  label: string;
  type: string;
}

interface Operation {
  label: string;
  fields: InputField[];
  calculate: (values: Record<string, number>) => { result: number; unit: string };
}

interface SubTopic {
  label: string;
  operations: Operation[];
}

interface Topic {
  value: string;
  label: string;
  subTopics: SubTopic[];
}

const topics: Topic[] = [
  {
    value: 'kinematics',
    label: 'קינמטיקה',
    subTopics: [
      {
        label: 'תנועה בממד אחד',
        operations: [
          {
            label: 'חישוב מהירות ממוצעת',
            fields: [
              { name: 'distance', label: 'מרחק (מטרים)', type: 'number' },
              { name: 'time', label: 'זמן (שניות)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.distance / values.time,
              unit: 'מטר/שנייה'
            })
          },
          {
            label: 'חישוב תאוצה ממוצעת',
            fields: [
              { name: 'initialVelocity', label: 'מהירות התחלתית (מ/ש)', type: 'number' },
              { name: 'finalVelocity', label: 'מהירות סופית (מ/ש)', type: 'number' },
              { name: 'time', label: 'זמן (שניות)', type: 'number' }
            ],
            calculate: (values) => ({
              result: (values.finalVelocity - values.initialVelocity) / values.time,
              unit: 'מטר/שנייה²'
            })
          },
          {
            label: 'חישוב העתק',
            fields: [
              { name: 'initialPosition', label: 'מיקום התחלתי (מטרים)', type: 'number' },
              { name: 'finalPosition', label: 'מיקום סופי (מטרים)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.finalPosition - values.initialPosition,
              unit: 'מטרים'
            })
          },
          {
            label: 'חישוב זמן תנועה',
            fields: [
              { name: 'distance', label: 'מרחק (מטרים)', type: 'number' },
              { name: 'velocity', label: 'מהירות קבועה (מ/ש)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.distance / values.velocity,
              unit: 'שניות'
            })
          },
          {
            label: 'חישוב מהירות סופית בתאוצה קבועה',
            fields: [
              { name: 'initialVelocity', label: 'מהירות התחלתית (מ/ש)', type: 'number' },
              { name: 'acceleration', label: 'תאוצה (מ/ש²)', type: 'number' },
              { name: 'time', label: 'זמן (שניות)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.initialVelocity + values.acceleration * values.time,
              unit: 'מטר/שנייה'
            })
          }
        ]
      },
      {
        label: 'תנועה בשני ממדים',
        operations: [
          {
            label: 'חישוב טווח בזריקה אופקית',
            fields: [
              { name: 'initialVelocity', label: 'מהירות התחלתית (מ/ש)', type: 'number' },
              { name: 'height', label: 'גובה התחלתי (מטרים)', type: 'number' }
            ],
            calculate: (values) => {
              const g = 9.81; // תאוצת הכובד
              const time = Math.sqrt((2 * values.height) / g);
              return {
                result: values.initialVelocity * time,
                unit: 'מטרים'
              };
            }
          },
          {
            label: 'חישוב זמן נפילה בזריקה אופקית',
            fields: [
              { name: 'height', label: 'גובה התחלתי (מטרים)', type: 'number' }
            ],
            calculate: (values) => {
              const g = 9.81; // תאוצת הכובד
              return {
                result: Math.sqrt((2 * values.height) / g),
                unit: 'שניות'
              };
            }
          },
          {
            label: 'חישוב טווח בזריקה משופעת',
            fields: [
              { name: 'initialVelocity', label: 'מהירות התחלתית (מ/ש)', type: 'number' },
              { name: 'angle', label: 'זווית (מעלות)', type: 'number' }
            ],
            calculate: (values) => {
              const g = 9.81; // תאוצת הכובד
              const angleRad = values.angle * Math.PI / 180;
              return {
                result: (values.initialVelocity ** 2 * Math.sin(2 * angleRad)) / g,
                unit: 'מטרים'
              };
            }
          },
          {
            label: 'חישוב גובה מקסימלי בזריקה משופעת',
            fields: [
              { name: 'initialVelocity', label: 'מהירות התחלתית (מ/ש)', type: 'number' },
              { name: 'angle', label: 'זווית (מעלות)', type: 'number' }
            ],
            calculate: (values) => {
              const g = 9.81; // תאוצת הכובד
              const angleRad = values.angle * Math.PI / 180;
              return {
                result: (values.initialVelocity ** 2 * Math.sin(angleRad) ** 2) / (2 * g),
                unit: 'מטרים'
              };
            }
          }
        ]
      },
      {
        label: 'תנועה מעגלית',
        operations: [
          {
            label: 'חישוב מהירות זוויתית',
            fields: [
              { name: 'radius', label: 'רדיוס (מטרים)', type: 'number' },
              { name: 'velocity', label: 'מהירות קווית (מ/ש)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.velocity / values.radius,
              unit: 'רדיאן/שנייה'
            })
          },
          {
            label: 'חישוב תאוצה צנטריפטלית',
            fields: [
              { name: 'velocity', label: 'מהירות קווית (מ/ש)', type: 'number' },
              { name: 'radius', label: 'רדיוס (מטרים)', type: 'number' }
            ],
            calculate: (values) => ({
              result: (values.velocity ** 2) / values.radius,
              unit: 'מטר/שנייה²'
            })
          },
          {
            label: 'חישוב זמן מחזור',
            fields: [
              { name: 'radius', label: 'רדיוס (מטרים)', type: 'number' },
              { name: 'velocity', label: 'מהירות קווית (מ/ש)', type: 'number' }
            ],
            calculate: (values) => ({
              result: (2 * Math.PI * values.radius) / values.velocity,
              unit: 'שניות'
            })
          },
          {
            label: 'חישוב תדירות',
            fields: [
              { name: 'period', label: 'זמן מחזור (שניות)', type: 'number' }
            ],
            calculate: (values) => ({
              result: 1 / values.period,
              unit: 'הרץ'
            })
          }
        ]
      }
    ]
  },
  {
    value: 'dynamics',
    label: 'דינמיקה',
    subTopics: [
      {
        label: 'חוקי ניוטון',
        operations: [
          {
            label: 'חישוב כוח שקול',
            fields: [
              { name: 'mass', label: 'מסה (ק"ג)', type: 'number' },
              { name: 'acceleration', label: 'תאוצה (מ/ש²)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.mass * values.acceleration,
              unit: 'ניוטון'
            })
          },
          {
            label: 'חישוב מסה מתוך תאוצה וכוח',
            fields: [
              { name: 'force', label: 'כוח (ניוטון)', type: 'number' },
              { name: 'acceleration', label: 'תאוצה (מ/ש²)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.force / values.acceleration,
              unit: 'ק"ג'
            })
          },
          {
            label: 'חישוב תאוצה מתוך כוח ומסה',
            fields: [
              { name: 'force', label: 'כוח (ניוטון)', type: 'number' },
              { name: 'mass', label: 'מסה (ק"ג)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.force / values.mass,
              unit: 'מטר/שנייה²'
            })
          }
        ]
      },
      {
        label: 'כוחות חיכוך',
        operations: [
          {
            label: 'חישוב כוח חיכוך סטטי מקסימלי',
            fields: [
              { name: 'normalForce', label: 'כוח נורמלי (ניוטון)', type: 'number' },
              { name: 'frictionCoefficient', label: 'מקדם חיכוך סטטי', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.normalForce * values.frictionCoefficient,
              unit: 'ניוטון'
            })
          },
          {
            label: 'חישוב כוח חיכוך קינטי',
            fields: [
              { name: 'normalForce', label: 'כוח נורמלי (ניוטון)', type: 'number' },
              { name: 'frictionCoefficient', label: 'מקדם חיכוך קינטי', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.normalForce * values.frictionCoefficient,
              unit: 'ניוטון'
            })
          },
          {
            label: 'חישוב מקדם חיכוך',
            fields: [
              { name: 'frictionForce', label: 'כוח חיכוך (ניוטון)', type: 'number' },
              { name: 'normalForce', label: 'כוח נורמלי (ניוטון)', type: 'number' }
            ],
            calculate: (values) => ({
              result: values.frictionForce / values.normalForce,
              unit: ''
            })
          }
        ]
      }
    ]
  }
];

const PhysicsCalculator: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>('');
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [showTip, setShowTip] = useState(false);

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
    setSelectedSubTopic('');
    setSelectedOperation(null);
    setResult(null);
  };

  const handleSubTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubTopic(event.target.value);
    setSelectedOperation(null);
    setResult(null);
  };

  const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const operation = topics
      .find(t => t.value === selectedTopic)
      ?.subTopics.find(st => st.label === selectedSubTopic)
      ?.operations.find(op => op.label === event.target.value);
    setSelectedOperation(operation || null);
    setInputValues({});
    setResult(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOperation) {
      const { result, unit } = selectedOperation.calculate(inputValues);
      setResult({ value: result, unit });
      generateChartData();
    }
  };

  const generateChartData = () => {
    if (selectedOperation) {
      const data = [];
      const steps = 20;
      const mainInputName = selectedOperation.fields[0].name;
      const minValue = inputValues[mainInputName] * 0.5;
      const maxValue = inputValues[mainInputName] * 1.5;
      const step = (maxValue - minValue) / steps;

      for (let i = 0; i <= steps; i++) {
        const x = minValue + i * step;
        const y = selectedOperation.calculate({ ...inputValues, [mainInputName]: x }).result;
        data.push({ x, y });
      }
      setChartData(data);
    }
  };

  useEffect(() => {
    const tipTimer = setTimeout(() => setShowTip(true), 3000);
    return () => clearTimeout(tipTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            מחשבון פיזיקה
          </h2>
          <div className="space-y-6">
            <div className={`bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-4 transition-opacity duration-300 ${showTip ? 'opacity-100' : 'opacity-0'}`}>
              <p className="font-bold">טיפ:</p>
              <p>בחר נושא, תת-נושא ופעולה כדי להתחיל בחישוב.</p>
            </div>

            <select
              value={selectedTopic}
              onChange={handleTopicChange}
              className="block w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg"
            >
              <option value="">בחר נושא</option>
              {topics.map((topic) => (
                <option key={topic.value} value={topic.value}>{topic.label}</option>
              ))}
            </select>
            
            {selectedTopic && (
              <select
                value={selectedSubTopic}
                onChange={handleSubTopicChange}
                className="block w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg"
              >
                <option value="">בחר תת-נושא</option>
                {topics.find(t => t.value === selectedTopic)?.subTopics.map((subTopic, index) => (
                  <option key={index} value={subTopic.label}>{subTopic.label}</option>
                ))}
              </select>
            )}
            
            {selectedSubTopic && (
              <select
                value={selectedOperation?.label || ''}
                onChange={handleOperationChange}
                className="block w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg"
              >
                <option value="">בחר פעולה</option>
                {topics.find(t => t.value === selectedTopic)
                  ?.subTopics.find(st => st.label === selectedSubTopic)
                  ?.operations.map((operation, index) => (
                    <option key={index} value={operation.label}>{operation.label}</option>
                  ))}
              </select>
            )}
            
            {selectedOperation && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-4">{selectedOperation.label}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {selectedOperation.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    חשב
                  </button>
                </form>
              </div>
            )}
            
            {result && (
              <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
                <p className="font-bold text-green-700">תוצאה:</p>
                <p className="text-green-600">{`${result.value.toFixed(2)} ${result.unit}`}</p>
              </div>
            )}

            {chartData.length > 0 && (
              <div className="h-96 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" label={{ value: selectedOperation?.fields[0].label, position: 'insideBottomRight', offset: -10 }} />
                    <YAxis label={{ value: result?.unit, angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" name={selectedOperation?.label} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsCalculator;
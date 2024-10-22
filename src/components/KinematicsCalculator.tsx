import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ObjectState {
  initialPosition: number;
  initialVelocity: number;
  acceleration: number;
}

interface KinematicsState {
  object1: ObjectState;
  object2: ObjectState;
  time: number;
}

const KinematicsCalculator: React.FC = () => {
  const [state, setState] = useState<KinematicsState>({
    object1: { initialPosition: 0, initialVelocity: 0, acceleration: 0 },
    object2: { initialPosition: 30, initialVelocity: 0, acceleration: 0 },
    time: 15,
  });

  const [chartData, setChartData] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, object: 'object1' | 'object2') => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [object]: { ...prevState[object], [name]: parseFloat(value) }
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, time: parseFloat(e.target.value) }));
  };

  const calculatePosition = (obj: ObjectState, t: number) => {
    return obj.initialPosition + obj.initialVelocity * t + 0.5 * obj.acceleration * t * t;
  };

  const calculateVelocity = (obj: ObjectState, t: number) => {
    return obj.initialVelocity + obj.acceleration * t;
  };

  const calculateAverageVelocity = (obj: ObjectState, startTime: number, endTime: number) => {
    const startPosition = calculatePosition(obj, startTime);
    const endPosition = calculatePosition(obj, endTime);
    return (endPosition - startPosition) / (endTime - startTime);
  };

  const calculateDistanceTraveled = (obj: ObjectState, startTime: number, endTime: number) => {
    return Math.abs(calculatePosition(obj, endTime) - calculatePosition(obj, startTime));
  };

  const calculateMeetingPoint = () => {
    const { object1, object2 } = state;
    const a = 0.5 * (object1.acceleration - object2.acceleration);
    const b = object1.initialVelocity - object2.initialVelocity;
    const c = object1.initialPosition - object2.initialPosition;

    if (a === 0) {
      if (b === 0) return null; // Objects are not moving relative to each other
      const t = -c / b;
      return t >= 0 ? t : null;
    }

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return null; // No real solutions

    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    if (t1 >= 0 && t2 >= 0) return Math.min(t1, t2);
    if (t1 >= 0) return t1;
    if (t2 >= 0) return t2;
    return null;
  };

  useEffect(() => {
    const data = [];
    for (let t = 0; t <= state.time; t += 0.5) {
      data.push({
        time: t,
        position1: calculatePosition(state.object1, t),
        velocity1: calculateVelocity(state.object1, t),
        position2: calculatePosition(state.object2, t),
        velocity2: calculateVelocity(state.object2, t),
      });
    }
    setChartData(data);
  }, [state]);

  const meetingPoint = calculateMeetingPoint();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">מחשבון קינמטיקה</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['object1', 'object2'].map((obj, index) => (
          <div key={obj} className="border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">גוף {index + 1}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">מיקום התחלתי (מטר)</label>
              <input
                type="number"
                name="initialPosition"
                value={state[obj as keyof KinematicsState].initialPosition}
                onChange={(e) => handleInputChange(e, obj as 'object1' | 'object2')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">מהירות התחלתית (מטר/שנייה)</label>
              <input
                type="number"
                name="initialVelocity"
                value={state[obj as keyof KinematicsState].initialVelocity}
                onChange={(e) => handleInputChange(e, obj as 'object1' | 'object2')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">תאוצה (מטר/שנייה²)</label>
              <input
                type="number"
                name="acceleration"
                value={state[obj as keyof KinematicsState].acceleration}
                onChange={(e) => handleInputChange(e, obj as 'object1' | 'object2')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">זמן (שניות)</label>
        <input
          type="number"
          name="time"
          value={state.time}
          onChange={handleTimeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">תוצאות:</h3>
        {['object1', 'object2'].map((obj, index) => (
          <div key={obj} className="mb-4">
            <h4 className="text-lg font-semibold">גוף {index + 1}:</h4>
            <p>מיקום סופי: {calculatePosition(state[obj as keyof KinematicsState], state.time).toFixed(2)} מטר</p>
            <p>מהירות סופית: {calculateVelocity(state[obj as keyof KinematicsState], state.time).toFixed(2)} מטר/שנייה</p>
            <p>מהירות ממוצעת: {calculateAverageVelocity(state[obj as keyof KinematicsState], 0, state.time).toFixed(2)} מטר/שנייה</p>
            <p>מרחק שנעבר: {calculateDistanceTraveled(state[obj as keyof KinematicsState], 0, state.time).toFixed(2)} מטר</p>
          </div>
        ))}
        {meetingPoint !== null && (
          <p>זמן מפגש: {meetingPoint.toFixed(2)} שניות</p>
        )}
      </div>
      <div className="h-96 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" label={{ value: 'זמן (שניות)', position: 'insideBottomRight', offset: -10 }} />
            <YAxis label={{ value: 'מיקום (מטר)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="position1" stroke="#8884d8" name="מיקום גוף 1" />
            <Line type="monotone" dataKey="position2" stroke="#82ca9d" name="מיקום גוף 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KinematicsCalculator;
import React from 'react';
import { useParams } from 'react-router-dom';
import topics from '../data/topics';
import KinematicsCalculator from './KinematicsCalculator';

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    return <div>הנושא לא נמצא</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">{topic.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">תתי-נושאים</h2>
        <ul className="list-disc pl-6 mb-6">
          {topic.subtopics.map((subtopic, index) => (
            <li key={index} className="mb-2">{subtopic}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">נוסחאות רלוונטיות</h2>
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          {topic.formulas.map((formula, index) => (
            <p key={index} className="font-mono mb-2">{formula}</p>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">שלבי פתרון</h2>
        <ol className="list-decimal pl-6 mb-6">
          {topic.solutionSteps.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ol>

        <h2 className="text-2xl font-semibold mb-4">הערות חשובות</h2>
        <ul className="list-disc pl-6 mb-6">
          {topic.importantNotes.map((note, index) => (
            <li key={index} className="mb-2">{note}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">אימות תוצאה</h2>
        <p>{topic.resultVerification}</p>
      </div>

      {topic.id === 'kinematics' && <KinematicsCalculator />}
    </div>
  );
};

export default TopicPage;
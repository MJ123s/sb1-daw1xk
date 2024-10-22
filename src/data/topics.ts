interface Topic {
  id: string;
  title: string;
  description: string;
  subtopics: string[];
  formulas: string[];
  solutionSteps: string[];
  importantNotes: string[];
  resultVerification: string;
}

const topics: Topic[] = [
  {
    id: 'vectors',
    title: 'וקטורים',
    description: 'פעולות וחישובים עם וקטורים',
    subtopics: [
      'חיבור וחיסור וקטורים',
      'כפל בסקלר',
      'היטל וקטור',
      'פירוק וקטור'
    ],
    formulas: [
      'A⃗ + B⃗ = (Ax+Bx)i + (Ay+By)j + (Az+Bz)k',
      'cA⃗ = cAxi + cAyj + cAzk',
      '|A⃗| = √(Ax² + Ay² + Az²)'
    ],
    solutionSteps: [
      'זיהוי סוג הפעולה הווקטורית',
      'ארגון הנתונים הנתונים',
      'בחירת הנוסחאות המתאימות',
      'ביצוע החישובים',
      'אימות הפתרון'
    ],
    importantNotes: [
      'תמיד בדקו יחידות לפני החישובים',
      'זכרו שפעולות וקטוריות שומרות על כיוון',
      'היזהרו עם מוסכמות הסימן בחיסור וקטורים'
    ],
    resultVerification: 'בדקו את הגודל והכיוון של הווקטור המתקבל. ודאו שהוא הגיוני בהקשר של הבעיה.'
  },
  {
    id: 'kinematics',
    title: 'קינמטיקה',
    description: 'תנועה במימד אחד ושני מימדים',
    subtopics: [
      'תנועה במימד אחד',
      'תנועה במימד שני',
      'תנועה במהירות קבועה',
      'תנועה בתאוצה קבועה'
    ],
    formulas: [
      'v = v₀ + at',
      'x = x₀ + v₀t + ½at²',
      'v² = v₀² + 2a(x - x₀)',
      'y = y₀ + v₀yt - ½gt²'
    ],
    solutionSteps: [
      'זיהוי סוג התנועה (מימד אחד או שניים)',
      'רישום הנתונים הידועים',
      'בחירת הנוסחה המתאימה',
      'הצבת הערכים וחישוב',
      'בדיקת היחידות והגיון התוצאה'
    ],
    importantNotes: [
      'שימו לב לכיוון התנועה ולסימנים של המהירות והתאוצה',
      'בתנועה דו-ממדית, פרקו את התנועה לרכיבים',
      'זכרו שתאוצת הכובד היא 9.8 מטר לשנייה בריבוע כלפי מטה'
    ],
    resultVerification: 'בדקו אם התוצאה הגיונית מבחינת גודל ויחידות. השוו לערכים מוכרים מהחיים היומיומיים.'
  }
];

export default topics;
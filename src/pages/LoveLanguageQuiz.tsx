import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from '@/components/valentine/FloatingHearts';
import Confetti from '@/components/valentine/Confetti';
import { useSound } from '@/hooks/useSound';

interface Question {
  id: number;
  question: string;
  options: { text: string; type: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Who took longer to reply on the day we first planned to meet?',
    options: [
      { text: 'Priya', type: 'correct' },
      { text: 'Neel', type: 'other' },
    ],
  },
  {
    id: 2,
    question: "What is Priya's exact food order when she claims she isn't hungry?",
    options: [
      { text: 'Tacos, Subway, momos, and biryani', type: 'correct' },
      { text: 'Nothing, obviously', type: 'other' },
    ],
  },
  {
    id: 3,
    question: 'According to legal precedent set over the last 5 months, who is actually right 99% of the time?',
    options: [
      { text: 'Priya', type: 'correct' },
      { text: 'Also Priya', type: 'correct' },
      { text: 'Technically Neel (Incorrect)', type: 'other' },
      { text: 'Priya again', type: 'correct' },
    ],
  },
  {
    id: 4,
    question: 'What is the official date of our monthly anniversary?',
    options: [
      { text: 'The 26th', type: 'correct' },
      { text: 'The 14th', type: 'other' },
    ],
  },
  {
    id: 5,
    question: 'What does Neel want to do for the perfect date?',
    options: [
      { text: 'Eat, watch a movie, and hold Priya\'s hand the whole time', type: 'correct' },
      { text: 'Compete over where to eat', type: 'other' },
    ],
  },
];

const loveLanguages = {
  correct: { name: 'Us Against the World Certified', description: 'You know the tiny details that make your story yours.', suggestions: ['Keep collecting tiny memories', 'Celebrate every 26th', 'Stay curious about each other'] },
  other: { name: 'Needs More Evidence', description: 'A retake may be required.', suggestions: ['Ask Priya what she wants to eat', 'Hold hands through the movie', 'Review the archive'] },
  gifts: { name: 'Receiving Gifts', description: 'You feel loved when given thoughtful presents', suggestions: ['Surprise them with small gifts', 'Remember special occasions', 'Give meaningful items'] },
  words: { name: 'Words of Affirmation', description: 'You value verbal expressions of love', suggestions: ['Write love letters', 'Give daily compliments', 'Express appreciation often'] },
  time: { name: 'Quality Time', description: 'You cherish undivided attention', suggestions: ['Plan regular date nights', 'Put away distractions', 'Create shared experiences'] },
  touch: { name: 'Physical Touch', description: 'You feel loved through physical connection', suggestions: ['Hold hands often', 'Give hugs and kisses', 'Be physically present'] },
  acts: { name: 'Acts of Service', description: 'You appreciate helpful actions', suggestions: ['Help with daily tasks', 'Do things without being asked', 'Show care through actions'] },
};

const LoveLanguageQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const { playSound } = useSound();

  const handleAnswer = (type: string) => {
    const newAnswers = { ...answers, [currentQuestion]: type };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      playSound('buttonClick');
    } else {
      calculateResults(newAnswers);
      playSound('success');
    }
  };

  const calculateResults = (ans: Record<number, string>) => {
    const counts: Record<string, number> = {};
    Object.values(ans).forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    setResults(counts);
    setShowResults(true);
    playSound('success');
  };

  const getTopLanguage = () => {
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || 'words';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults({});
    setShowResults(false);
    playSound('buttonClick');
  };

  return (
    <div className="min-h-screen gradient-romantic relative">
      <FloatingHearts count={12} />
      <Confetti isActive={showResults} />
      
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-heavy text-primary mb-4">
            The "Us Against the World" Trivia
          </h1>
          <p className="text-muted-foreground font-serif-italic">
            The Priya & Neel Certification Exam: Minimum passing score is 100%.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elevated"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-medium mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(option.type)}
                    className="w-full p-4 text-left bg-muted/50 rounded-lg hover:bg-primary/10 border-2 border-transparent hover:border-primary/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elevated"
            >
              <h2 className="text-3xl font-medium mb-6 text-center">Status: Fully Qualified Partner</h2>
              <p className="text-center text-muted-foreground mb-8">5/5 stars. Certification renewed for Month 6.</p>
              
              {Object.entries(results)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count], idx) => {
                  const lang = loveLanguages[type as keyof typeof loveLanguages];
                  const percentage = (count / questions.length) * 100;
                  
                  return (
                    <motion.div
                      key={type}
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-muted-foreground">{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        />
                      </div>
                      {idx === 0 && (
                        <motion.p
                          className="mt-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {lang.description}
                        </motion.p>
                      )}
                    </motion.div>
                  );
                })}

              <motion.div
                className="mt-8 p-6 bg-primary/10 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-medium mb-3">Suggestions for {loveLanguages[getTopLanguage() as keyof typeof loveLanguages].name}:</h3>
                <ul className="space-y-2">
                  {loveLanguages[getTopLanguage() as keyof typeof loveLanguages].suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start">
                      <span className="mr-2">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <button
                onClick={resetQuiz}
                className="w-full mt-6 btn-romantic py-3"
              >
                Take Quiz Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveLanguageQuiz;

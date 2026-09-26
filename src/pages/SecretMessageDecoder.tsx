import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from '@/components/valentine/FloatingHearts';
import Confetti from '@/components/valentine/Confetti';
import { useSound } from '@/hooks/useSound';

interface Puzzle {
  id: number;
  type: 'caesar' | 'reverse' | 'substitution' | 'morse';
  difficulty: 'easy' | 'medium' | 'hard';
  encoded: string;
  decoded: string;
  hint: string;
  reward: string;
}

const puzzles: Puzzle[] = [
  {
    id: 1,
    type: 'substitution',
    difficulty: 'easy',
    encoded: '4 × 26',
    decoded: '104',
    hint: 'Where time officially started: Month × Day',
    reward: '📸',
  },
  {
    id: 2,
    type: 'morse',
    difficulty: 'easy',
    encoded: '66 61 76 6F 72 69 74 65',
    decoded: 'Polu',
    hint: 'Translate the frequency into words. Decode the ASCII/Hex string to spell Polu.',
    reward: '🎵',
  },
  {
    id: 3,
    type: 'reverse',
    difficulty: 'medium',
    encoded: 'I LOVE YOU SO MUCH',
    decoded: 'I LOVE YOU SO MUCH',
    hint: 'Unscramble the letters to reveal what five months with you has proven.',
    reward: '💖',
  },
];

const SecretMessageDecoder = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [solvedPuzzles, setSolvedPuzzles] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showFirstMemory, setShowFirstMemory] = useState(false);
  const { playSound } = useSound();

  const decodeCaesar = (text: string, shift: number): string => {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
      })
      .join('');
  };

  const checkAnswer = () => {
    const puzzle = puzzles[currentPuzzle];
    const normalizedAnswer = userAnswer.trim().toUpperCase();
    const normalizedDecoded = puzzle.decoded.toUpperCase();

    if (normalizedAnswer === normalizedDecoded) {
      setSolvedPuzzles([...solvedPuzzles, puzzle.id]);
      setShowReward(true);
      playSound('success');
      setTimeout(() => {
        setShowReward(false);
        if (puzzle.id === 1) {
          setShowFirstMemory(true);
        } else if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
          setUserAnswer('');
          setShowHint(false);
        }
      }, 2000);
    } else {
      playSound('buttonClick');
      alert('Not quite right! Try again or use the hint.');
    }
  };

  const progress = (solvedPuzzles.length / puzzles.length) * 100;

  return (
    <div className="min-h-screen gradient-romantic relative">
      <FloatingHearts count={15} />
      <Confetti isActive={showReward} />
      
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-heavy text-primary mb-4">
            Secret Message Decoder
          </h1>
          <p className="text-muted-foreground font-serif-italic">
            Three clues, one story: five months of Priya & Neel
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Puzzle {currentPuzzle + 1} of {puzzles.length}
            </span>
            <span className="text-sm text-muted-foreground">
              Solved: {solvedPuzzles.length}/{puzzles.length}
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Puzzle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPuzzle}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elevated"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    puzzles[currentPuzzle].difficulty === 'easy'
                      ? 'bg-green-100 text-green-700'
                      : puzzles[currentPuzzle].difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {puzzles[currentPuzzle].difficulty.toUpperCase()}
                </span>
                <span className="text-2xl">{puzzles[currentPuzzle].reward}</span>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-4">
                <p className="text-2xl font-mono text-center text-foreground">
                  {puzzles[currentPuzzle].encoded}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                {currentPuzzle === 0 && 'Solved clue unlocks: First Memory Unlocked. Add your first-date polaroid here.'}
                {currentPuzzle === 1 && 'Solved clue unlocks: Add your couple-song playlist here.'}
                {currentPuzzle === 2 && 'Solved clue unlocks: The full love letter and final question.'}
              </p>
              {currentPuzzle === 1 && (
                <div className="space-y-3 mb-6">
                  {[
                    ['Ok Jaanu', '/couple_songs/Ok%20Jaanu.mp3'],
                    ['Tera Rasta Chodu Na', '/couple_songs/Tera%20Rasta%20Chodu%20na.mp3'],
                    ['Tere Liye', '/couple_songs/Tere%20Liye.mp3'],
                  ].map(([title, source]) => (
                    <div key={source} className="rounded-lg bg-primary/5 p-3">
                      <p className="text-sm font-medium mb-2">{title}</p>
                      <audio className="w-full" controls preload="metadata" src={source} aria-label={`Play ${title}`} />
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    className="bg-primary/10 rounded-lg p-4 mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-sm text-primary">
                      <strong>Hint:</strong> {puzzles[currentPuzzle].hint}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your decoded message..."
                className="w-full px-4 py-3 rounded-lg border-2 border-primary/30 focus:border-primary focus:outline-none mb-4"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />

              <div className="flex gap-3">
                <button
                  onClick={checkAnswer}
                  className="flex-1 btn-romantic py-3"
                >
                  Decode
                </button>
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    playSound('sparkle');
                  }}
                  className="px-6 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                >
                  {showHint ? 'Hide' : 'Show'} Hint
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {showFirstMemory && (
          <motion.div
            className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-elevated text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-sm uppercase tracking-widest text-primary mb-4">Access Granted: First Memory Unlocked</p>
            <div className="bg-white p-4 shadow-lg max-w-sm mx-auto rotate-[-2deg]">
              <img
                src="/Couple_Picture/couple_pic.jpeg"
                alt="Priya and Neel's first memory"
                className="w-full aspect-square object-cover"
              />
              <p className="font-serif-italic text-foreground mt-4">Where time officially started: April 26</p>
            </div>
            <button
              onClick={() => {
                setShowFirstMemory(false);
                setCurrentPuzzle(1);
                setUserAnswer('');
                setShowHint(false);
                playSound('sparkle');
              }}
              className="mt-8 px-8 py-3 btn-romantic"
            >
              Continue to clue 2
            </button>
          </motion.div>
        )}

        {/* Completion */}
        {solvedPuzzles.length === puzzles.length && (
          <motion.div
            className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elevated text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl font-medium mb-4">Access Granted: First Memory Unlocked.</h2>
            <div className="text-left text-lg text-muted-foreground mb-6 whitespace-pre-line">
              {'Priya,\n\nFive months ago, you walked into my world, and somehow you\'ve managed to turn ordinary days into my absolute favorite memories. It feels like both yesterday and an entire lifetime wrapped into one.\n\nThank you for the easy laughter, the random late-night chats, the warmth you bring every single day, and the way you make loving you feel like the most natural thing in the world. 150-something days with you, and my favorite place is still anywhere you are.\n\nYou\'ve made it through the clues, but there\'s one last prompt left...'}
            </div>
            <p className="text-xl font-medium mb-6">
              Contract Renewal: Month 6 & Beyond
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Five months down, a lifetime to explore. Priya, will you do me the honor of being my favorite adventure for the next month (and every month after)?
            </p>
            <button
              onClick={() => {
                setCurrentPuzzle(0);
                setSolvedPuzzles([]);
                setUserAnswer('');
                setShowHint(false);
                playSound('success');
              }}
              className="px-8 py-3 btn-romantic"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SecretMessageDecoder;

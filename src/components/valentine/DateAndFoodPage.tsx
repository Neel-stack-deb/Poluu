import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import HeartIcon from './icons/HeartIcon';
import { useSound } from '../../hooks/useSound';

interface DateAndFoodPageProps {
  onComplete: () => void;
}

const DateAndFoodPage = ({ onComplete }: DateAndFoodPageProps) => {
  const { playSound } = useSound();

  return (
    <div className="page-container gradient-romantic flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <FloatingHearts count={14} />
      <motion.div className="w-full max-w-4xl text-center z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <HeartIcon size={42} color="hsl(350, 55%, 65%)" animate className="mx-auto mb-5" />
        <p className="text-sm uppercase tracking-[0.28em] text-primary mb-3">Our perfect plan</p>
        <h1 className="text-4xl md:text-6xl font-heavy text-primary mb-4">A date made of little joys</h1>
        <p className="text-lg text-muted-foreground font-serif-italic mb-10">No fancy place needed. Just your suggestions, a good movie, and your hand in mine the entire time.</p>
        <div className="grid md:grid-cols-2 gap-5 text-left">
          <motion.div className="rounded-2xl bg-white/85 p-7 shadow-elevated" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-sm uppercase tracking-widest text-primary mb-3">The date</p>
            <h2 className="text-2xl font-serif-italic text-foreground mb-4">Eat, watch, hold hands</h2>
            <p className="text-muted-foreground leading-relaxed">We can eat everything you suggest, watch a movie together, and hold hands through the entire thing. That is already a perfect date to me.</p>
          </motion.div>
          <motion.div className="rounded-2xl bg-white/85 p-7 shadow-elevated" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
            <p className="text-sm uppercase tracking-widest text-primary mb-3">The food evidence</p>
            <h2 className="text-2xl font-serif-italic text-foreground mb-4">College Food Street</h2>
            <p className="text-muted-foreground leading-relaxed">Tacos, Subway, momos, biryani, and probably five more things you remember better than I do. I will happily follow your menu.</p>
          </motion.div>
        </div>
        <button className="btn-romantic mt-10" onClick={() => { playSound('buttonClick'); onComplete(); }}>One last transmission</button>
      </motion.div>
    </div>
  );
};

export default DateAndFoodPage;

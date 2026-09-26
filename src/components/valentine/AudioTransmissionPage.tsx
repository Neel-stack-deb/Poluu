import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import HeartIcon from './icons/HeartIcon';
import { useSound } from '../../hooks/useSound';

interface AudioTransmissionPageProps {
  onComplete: () => void;
}

const AudioTransmissionPage = ({ onComplete }: AudioTransmissionPageProps) => {
  const { playSound } = useSound();

  return (
    <div className="page-container gradient-romantic flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <FloatingHearts count={10} />
      <motion.div className="w-full max-w-2xl text-center z-10" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
        <HeartIcon size={42} color="hsl(145, 40%, 55%)" animate className="mx-auto mb-5" />
        <p className="text-sm uppercase tracking-[0.28em] text-primary mb-3">Private transmission</p>
        <h1 className="text-4xl md:text-6xl font-heavy text-primary mb-4">Audio Log #05</h1>
        <p className="text-lg text-muted-foreground font-serif-italic mb-8">Frequency: Priya</p>
        <div className="rounded-2xl bg-white/85 p-7 shadow-elevated">
          <p className="text-foreground font-medium mb-2">Status: Encrypted | Playback: Unlimited</p>
          <p className="text-muted-foreground leading-relaxed mb-6">For late nights, stressful days, or whenever you need to be reminded how loved you are. Press play.</p>
          <audio className="w-full" controls preload="metadata" src="/Voice_Recorder/Tere%20Liye.mp3" aria-label="Audio transmission for Priya" />
        </div>
        <button className="btn-romantic mt-10" onClick={() => { playSound('buttonClick'); onComplete(); }}>Open the final question</button>
      </motion.div>
    </div>
  );
};

export default AudioTransmissionPage;

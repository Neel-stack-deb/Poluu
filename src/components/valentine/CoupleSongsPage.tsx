import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import HeartIcon from './icons/HeartIcon';
import { useSound } from '../../hooks/useSound';

interface CoupleSongsPageProps {
  onComplete: () => void;
}

const songs = [
  { title: 'Ok Jaanu', src: '/couple_songs/Ok%20Jaanu.mp3' },
  { title: 'Tera Rasta Chodu Na', src: '/couple_songs/Tera%20Rasta%20Chodu%20na.mp3' },
  { title: 'Tere Liye', src: '/couple_songs/Tere%20Liye.mp3' },
];

const CoupleSongsPage = ({ onComplete }: CoupleSongsPageProps) => {
  const { playSound } = useSound();

  return (
    <div className="page-container gradient-romantic flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <FloatingHearts count={12} />
      <motion.div className="w-full max-w-2xl text-center z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <HeartIcon size={42} color="hsl(145, 40%, 55%)" animate className="mx-auto mb-5" />
        <p className="text-sm uppercase tracking-[0.28em] text-primary mb-3">Our soundtrack</p>
        <h1 className="text-4xl md:text-6xl font-heavy text-primary mb-4">Songs that sound like us</h1>
        <p className="text-lg text-muted-foreground font-serif-italic mb-10">For every drive, every late night, and every moment that feels a little more like home.</p>
        <div className="space-y-4 text-left">
          {songs.map((song, index) => (
            <motion.div key={song.src} className="bg-white/85 backdrop-blur-sm rounded-2xl p-5 shadow-elevated" initial={{ opacity: 0, x: index % 2 ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.12 }}>
              <p className="font-serif-italic text-xl text-foreground mb-3">{song.title}</p>
              <audio className="w-full" controls preload="metadata" src={song.src} aria-label={`Play ${song.title}`} />
            </motion.div>
          ))}
        </div>
        <button className="btn-romantic mt-10" onClick={() => { playSound('buttonClick'); onComplete(); }}>Next little chapter</button>
      </motion.div>
    </div>
  );
};

export default CoupleSongsPage;

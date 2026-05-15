import { motion } from 'motion/react';
import { signInWithGoogle } from '../lib/firebase';
import { LogIn, Shield, Zap, Globe, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.03] blur-[150px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-accent/80">
             <div className="w-12 h-[1px] bg-accent/30" />
             IDENTITY GATEWAY
          </div>
          <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-white leading-[0.85] mb-12">
            JOIN THE <br />
            <span className="text-muted/20 italic">ARCHIVE</span>
          </h1>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-accent">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">Verified Ledger</h4>
                <p className="text-sm text-muted/60 font-medium tracking-tight max-w-sm leading-relaxed">
                  Your identity is anchored to the global record feed, ensuring all submissions are cryptographically linked to your profile.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-accent">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">Elite Analytics</h4>
                <p className="text-sm text-muted/60 font-medium tracking-tight max-w-sm leading-relaxed">
                  Gain access to the dashboard featuring high-fidelity graphics, heatmap tracking, and performance trendlines.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bento-card !p-12 border-white/10 bg-white/[0.01] backdrop-blur-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
            <Globe size={200} />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-display uppercase tracking-tight text-white mb-4">Connect Identity</h2>
            <p className="text-sm text-muted/60 font-medium mb-12 uppercase tracking-[0.1em]">Use your secure provider to continue</p>
            
            <button 
              onClick={() => signInWithGoogle()}
              className="w-full group relative flex items-center justify-center gap-4 rounded-2xl bg-white p-6 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-accent active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
            >
              <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-black/10"></div>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-6 h-6" />
              Sync with Google
              <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-12 pt-12 border-t border-white/[0.03]">
              <div className="flex items-center justify-center gap-6 opacity-30 text-muted">
                 <Shield size={20} />
                 <div className="w-[1px] h-4 bg-white/20" />
                 <span className="text-[9px] font-black uppercase tracking-widest">TLS 1.3 SECURED</span>
                 <div className="w-[1px] h-4 bg-white/20" />
                 <Globe size={20} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

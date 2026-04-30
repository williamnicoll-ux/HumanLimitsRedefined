import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, AlertCircle, Check } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

interface SubmitRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitRecordModal({ isOpen, onClose }: SubmitRecordModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    holder: '',
    category: 'Troll',
    location: '',
    imageUrl: 'https://images.unsplash.com/photo-1541199160986-224eb0134568?auto=format&fit=crop&q=80&w=800'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Please sign in to submit a record!");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'records'), {
        ...formData,
        dateSet: new Date().toISOString().split('T')[0],
        likesCount: 0,
        commentsCount: 0,
        tags: ["user-submitted", formData.category.toLowerCase()],
        isVerified: false,
        timestamp: Date.now(),
        userId: auth.currentUser.uid
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({
            title: '',
            description: '',
            holder: '',
            category: 'Troll',
            location: '',
            imageUrl: 'https://images.unsplash.com/photo-1541199160986-224eb0134568?auto=format&fit=crop&q=80&w=800'
        });
      }, 2000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'records');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-muted hover:text-white"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Check size={40} />
                </div>
                <h3 className="mb-2 font-display text-2xl uppercase text-white">Record Submitted!</h3>
                <p className="text-muted">Your legacy is being reviewed. It will appear on the feed soon.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="font-display text-3xl uppercase tracking-tight text-white mb-2">Submit Record</h3>
                  <p className="text-sm text-muted">Claim your place in history. Truth or Troll, we track it all.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Title</label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
                      placeholder="e.g. World's Speediest Napper"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted">Holder Name</label>
                      <input
                        required
                        type="text"
                        value={formData.holder}
                        onChange={(e) => setFormData({ ...formData, holder: e.target.value })}
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none appearance-none"
                      >
                        <option value="Troll">Troll</option>
                        <option value="Sport">Sport</option>
                        <option value="Skill">Skill</option>
                        <option value="Body">Body</option>
                        <option value="Gaming">Gaming</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none resize-none"
                      placeholder="Explain the extraordinary achievement..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Location</label>
                    <input
                      required
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none"
                      placeholder="e.g. My Bedroom, London"
                    />
                  </div>

                  <div className="pt-4">
                    {!auth.currentUser && (
                        <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs">
                            <AlertCircle size={14} />
                            <span>Authentication required to submit.</span>
                        </div>
                    )}
                    <button
                      disabled={isSubmitting || !auth.currentUser}
                      type="submit"
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-accent py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} strokeWidth={3} />
                          Establish Legacy
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

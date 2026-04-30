import { useState } from 'react';
import { UserProfile } from '../types';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { X, Save, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EditProfileProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfile({ profile, isOpen, onClose }: EditProfileProps) {
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [category, setCategory] = useState(profile.favoriteCategory || 'All');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', profile.uid), {
        displayName,
        bio,
        favoriteCategory: category
      });
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-display text-3xl uppercase text-white">Edit Profile</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Personalize Your Pulse Experience</p>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full bg-neutral-800 p-2 text-neutral-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-white focus:border-orange-600 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px] rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-white focus:border-orange-600 focus:outline-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Favorite Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-white focus:border-orange-600 focus:outline-none appearance-none"
                >
                  {['All', 'Sport', 'Skill', 'Body', 'Gaming', 'Human', 'Science'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl bg-neutral-800 py-4 text-sm font-bold text-white transition-opacity hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-orange-600 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-500 disabled:opacity-50"
              >
                {saving ? 'Saving...' : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

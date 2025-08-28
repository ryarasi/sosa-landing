'use client';

import { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion } from "framer-motion";

interface LearnMoreModalAnimatedProps {
  triggerClassName?: string;
}

export default function LearnMoreModalAnimated({ triggerClassName }: LearnMoreModalAnimatedProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/learn-more', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setName('');
        setEmail('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <ModalTrigger className={triggerClassName}>
        <span className="block px-10 md:px-16 py-4 text-lg md:text-xl font-bold border-2 border-white hover:bg-white hover:text-black transition-colors duration-200 tracking-wider">
          Learn More
        </span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Welcome, Sovereign</h2>
              <p className="text-white/80 mb-4 text-lg">
                Check your email for the Discord invite link.
              </p>
              <p className="text-sm text-white/60">
                You are now part of the architecture of human liberation.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-white">Join the Architects</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-white/90 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 rounded-lg focus:border-white focus:bg-black/80 focus:outline-none transition-all text-white placeholder:text-white/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white/90 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 rounded-lg focus:border-white focus:bg-black/80 focus:outline-none transition-all text-white placeholder:text-white/40"
                    placeholder="your@email.com"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? 'Submitting...' : 'Get Discord Invite'}
                </button>
              </form>

              <p className="text-xs text-white/50 text-center mt-8 font-medium">
                By joining, you commit to architecting freedom, not exploiting it.
              </p>
            </motion.div>
          )}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
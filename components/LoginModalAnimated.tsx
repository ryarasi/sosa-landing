'use client';

import { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion } from "framer-motion";

interface LoginModalAnimatedProps {
  triggerClassName?: string;
}

export default function LoginModalAnimated({ triggerClassName }: LoginModalAnimatedProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setSuccess(true);
      
      // If login is successful, redirect to member area or dashboard
      if (data.redirect) {
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <ModalTrigger className={triggerClassName}>
        <span className="block px-4 md:px-6 py-2 text-sm md:text-base font-bold text-white border-2 border-white hover:bg-white hover:text-black transition-colors duration-200">
          Login
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
              <h2 className="text-3xl font-bold mb-6 text-white">Access Granted</h2>
              <p className="text-white/80 text-lg">
                Redirecting to your sovereign space...
              </p>
              <motion.div 
                className="mt-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-white">Architect Login</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-bold text-white/90 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-white/20 rounded-lg focus:border-white focus:bg-black/80 focus:outline-none transition-all text-white placeholder:text-white/40"
                    placeholder="architect@email.com"
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
                  {loading ? 'Verifying...' : 'Access Sovereignty'}
                </button>
              </form>

              <p className="text-xs text-white/50 text-center mt-8 font-medium">
                Only verified architects can access the sovereign space.
              </p>
            </motion.div>
          )}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
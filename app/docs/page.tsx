'use client';

import NavigationFloating from '@/components/NavigationFloating';
import Footer from '@/components/Footer';
import GlobeBackground from '@/components/GlobeBackground';
import { BentoGrid } from '@/components/ui/bento-grid';
import { ClickableBentoItem } from '@/components/ui/clickable-bento-item';
import { motion } from 'framer-motion';

export default function DocsPage() {
  return (
    <>
      <GlobeBackground />
      <NavigationFloating />
      <main className="min-h-screen pt-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-12 text-white tracking-wider"
          >
            Documentation
          </motion.h1>
          
          <BentoGrid className="mx-auto">
            <ClickableBentoItem
              href="/docs/vision"
              title="Vision"
              description="Our fundamental belief and the future we're building. The mission to architect a global freedom infrastructure where human beings can pursue their highest potential without sacrificing their sovereignty."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <motion.div 
                    className="m-auto text-6xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    🎯
                  </motion.div>
                </div>
              }
              className="md:col-span-2"
            />
            <ClickableBentoItem
              href="/docs/manifest"
              title="Implementation Manifest"
              description="Comprehensive technical blueprint for building our decentralized think tank. Covers governance models, crypto-based reputation systems, and cybernetic feedback loops."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <motion.div 
                    className="m-auto text-6xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    📜
                  </motion.div>
                </div>
              }
            />
            <ClickableBentoItem
              href="https://github.com/ryarasi/sosa-landing/blob/main/CONTRIBUTING.md"
              title="Contributing Guide"
              description="Learn how to join us in architecting the infrastructure for human liberation. Every contribution matters."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <motion.div 
                    className="m-auto text-6xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    🤝
                  </motion.div>
                </div>
              }
              external
            />
            <ClickableBentoItem
              href="https://github.com/ryarasi/sosa-landing"
              title="GitHub Repository"
              description="Explore our open-source codebase. Every line of code is a declaration of independence."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <motion.div 
                    className="m-auto text-6xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    💻
                  </motion.div>
                </div>
              }
              className="md:col-span-2"
              external
            />
          </BentoGrid>
          
          <div className="mt-20 text-center text-white/60 font-bold">
            <p className="text-lg">The infrastructure for freedom doesn&apos;t exist - yet.</p>
            <p className="text-lg mt-2">We are building it.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
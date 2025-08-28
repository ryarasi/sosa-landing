import fs from 'fs';
import path from 'path';
import NavigationFloating from '@/components/NavigationFloating';
import Footer from '@/components/Footer';
import GlobeBackground from '@/components/GlobeBackground';
import Link from 'next/link';

export default function ManifestPage() {
  const manifestPath = path.join(process.cwd(), 'docs', 'manifest.md');
  const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
  
  // Simple markdown to HTML conversion (you might want to use a proper markdown parser in production)
  const htmlContent = manifestContent
    .split('\n')
    .map(line => {
      if (line.startsWith('# ')) return `<h1 class="text-4xl md:text-5xl font-bold mb-8 text-white tracking-wider">${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2 class="text-2xl md:text-3xl font-bold mb-6 mt-12 text-white">${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3 class="text-xl md:text-2xl font-bold mb-4 mt-8 text-white">${line.slice(4)}</h3>`;
      if (line.startsWith('#### ')) return `<h4 class="text-lg md:text-xl font-bold mb-3 mt-6 text-white">${line.slice(5)}</h4>`;
      if (line.startsWith('- ')) return `<li class="ml-6 mb-3 text-white/90 font-medium">${line.slice(2)}</li>`;
      if (line.startsWith('**') && line.endsWith('**')) return `<p class="font-bold text-white mb-6 text-lg">${line.slice(2, -2)}</p>`;
      if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) return `<p class="italic text-white/80 mb-6 text-lg">${line.slice(1, -1)}</p>`;
      if (line === '---') return '<hr class="border-white/30 my-12">';
      if (line.trim() === '') return '<br>';
      // Handle links
      return `<p class="text-white/90 mb-6 leading-relaxed text-lg">${line}</p>`;
    })
    .join('\n')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-white underline hover:opacity-70 transition-opacity">$1</a>');

  return (
    <>
      <GlobeBackground />
      <NavigationFloating />
      <main className="min-h-screen pt-32 px-6 pb-20 bg-black">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/docs" 
            className="inline-flex items-center text-white hover:opacity-70 transition-opacity mb-8 font-bold"
          >
            ← Back to Docs
          </Link>
          
          <article 
            className="max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
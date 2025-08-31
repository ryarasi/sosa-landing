'use client';

interface LearnMoreModalAnimatedProps {
  triggerClassName?: string;
}

export default function LearnMoreModalAnimated({ triggerClassName }: LearnMoreModalAnimatedProps) {
  return (
    <a
      href="https://forms.gle/1swCsgRdHFfb5yE46"
      target="_blank"
      rel="noopener noreferrer"
      className={triggerClassName}
    >
      <span className="block px-10 md:px-16 py-4 text-lg md:text-xl font-bold border-2 border-white hover:bg-white hover:text-black transition-colors duration-200 tracking-wider">
        Request Early Access
      </span>
    </a>
  );
}
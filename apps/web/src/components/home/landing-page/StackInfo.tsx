'use client';

import Content from './Content';

function FullStackDeveloperContent() {
  return (
    <div>
      Offers a complete solution, from frontend to backend, using modern
      technologies like{' '}
      <a href="https://react.dev/" target="_blank" rel="noreferrer">
        React
      </a>
      ,{' '}
      <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
        Next.js
      </a>
      ,{' '}
      <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
        NestJS
      </a>
      , and{' '}
      <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
        Tailwind CSS
      </a>
    </div>
  );
}

function StackInfo() {
  return (
    <div className="md:!px-[8rem] px-[1rem] md:pt-[100px] pt-[25px]">
      <div className="flex gap-2 !gap-y-5 justify-between flex-wrap">
        <Content
          title="Full-Stack Framework"
          content={<FullStackDeveloperContent />}
        />
        <Content
          title="Seamless Integration"
          content="Built-in integrations with platforms like Stripe, Supabase,
          and Strapi provide out-of-the-box support for payments,
          databases, and content management."
        />
        <Content
          title="Developer-Friendly Utilities"
          content="With features like Dev Container for streamlined development
          and logging for monitoring, TIRA simplifies and enhances the
          development lifecycle."
        />
      </div>
      <div className="w-full h-[1px] bg-neutral-light opacity-5 mt-[30px] mb-[10px]" />
    </div>
  );
}

export default StackInfo;

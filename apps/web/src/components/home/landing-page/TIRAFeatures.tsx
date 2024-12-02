'use client';

import Content from './Content';

function TIRAFeatures() {
  return (
    <div
      id="features"
      className="md:!px-[8rem] px-[1rem] md:pt-[100px] pt-[25px]"
    >
      <div />
      <div className="text-center">
        <div className="font-bold text-[48px] text-black dark:text-white">
          TIRA Features
        </div>
        <div className="mt-4 text-[18px] !leading-[24px] text-neutral dark:text-white">
          TIRA-WEB is a comprehensive full-stack web framework
        </div>
      </div>
      <div className="mt-14">
        <div className="flex gap-2 !gap-y-5 flex-wrap lg:!justify-between !justify-center">
          <Content
            title="Modern Tech stack"
            content="IT is built on modern technologies including React, Next.js, Typescript and Tailwind CSS for efficient, responsive frontend development."
          />
          <Content
            title="Robust Backend Architecture"
            content="The backend leverages NestJs with Prisma and PostgreSQL for robust data management."
          />
          <Content
            title="Holistic Service Integration"
            content="It integrates key services like Passport and AWS Cognito for authentication, MinIO for storage, AWS SES for email and Winston for logging ensuring scalabilty and reliability across the stack."
          />
        </div>
      </div>
    </div>
  );
}

export default TIRAFeatures;

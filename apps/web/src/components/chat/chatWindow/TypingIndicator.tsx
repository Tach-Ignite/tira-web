'use client';

function TypingIndicator() {
  return (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-chat-50-light-gradient dark:bg-chat-50-dark-gradient rounded-full animate-bounceFirst" />
      <div className="w-4 h-4 bg-chat-light-gradient dark:bg-chat-dark-gradient rounded-full animate-bounceSecond" />
      <div className="w-3 h-3 bg-chat-50-light-gradient dark:bg-chat-50-dark-gradient rounded-full animate-bounceThird" />
    </div>
  );
}

export default TypingIndicator;

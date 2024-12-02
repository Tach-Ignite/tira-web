'use client';

function ChatUserSkeleton() {
  return (
    <div className="space-y-2 p-4 no-select !shadow-xl animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 bg-gray-300 rounded-full" />
          <div className="h-4 w-24 bg-gray-300 rounded-lg" />
        </div>
        <div className="h-3 w-12 bg-gray-300 rounded-lg" />
      </div>
      <div className="flex justify-between pt-2 items-center">
        <div className="h-4 w-[220px] bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}

export default ChatUserSkeleton;

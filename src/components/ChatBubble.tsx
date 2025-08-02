import { ReactNode } from "react";

interface ChatBubbleProps {
  children: ReactNode;
  className?: string;
}

const ChatBubble = ({ children, className = "" }: ChatBubbleProps) => {
  return (
    <div className={`chat-bubble ${className}`}>
      {children}
    </div>
  );
};

export default ChatBubble;
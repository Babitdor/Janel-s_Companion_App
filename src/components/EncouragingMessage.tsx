import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface EncouragingMessageProps {
  messages: string[];
  isVisible: boolean;
  onClose?: () => void; // Optional callback to close the message
}

const EncouragingMessage: React.FC<EncouragingMessageProps> = ({
  messages,
  isVisible,
  onClose,
}) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");

  useEffect(() => {
    if (isVisible) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);

      // Auto-hide message after 3 seconds
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, messages, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in-up">
      <div className="flex items-center">
        <Heart className="text-red-500 mr-2" />
        <p className="text-gray-800">{currentMessage}</p>
      </div>
    </div>
  );
};

export default EncouragingMessage;

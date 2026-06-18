type FeedbackBubbleProps = {
  message?: string;
};

export function FeedbackBubble({ message }: FeedbackBubbleProps) {
  return <div className="feedback">{message || "选一个答案吧"}</div>;
}

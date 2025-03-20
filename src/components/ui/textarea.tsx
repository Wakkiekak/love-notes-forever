
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    
    // Combine the refs
    const setRefs = React.useCallback(
      (element: HTMLTextAreaElement | null) => {
        // For internal use
        textareaRef.current = element;
        
        // For external forwarded ref
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref],
    );
    
    // Auto-resize function
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        // Reset height to auto so we can get the real content height
        textarea.style.height = 'auto';
        // Set the height to match the content with a minimum height
        const newHeight = Math.max(80, textarea.scrollHeight);
        textarea.style.height = `${newHeight}px`;
      }
    }, []);
    
    // Adjust height on input, mount, when value changes, and on window resize
    React.useEffect(() => {
      adjustHeight();
      
      // Also adjust when window resizes (important for mobile)
      const handleResize = () => {
        adjustHeight();
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [adjustHeight, props.value, props.defaultValue]);
    
    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden resize-none",
          className
        )}
        ref={setRefs}
        onInput={adjustHeight}
        style={{ minHeight: '80px' }}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

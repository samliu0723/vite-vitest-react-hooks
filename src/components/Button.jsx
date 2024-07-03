import { useState } from "react";

export default function Button({ text }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <button
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        }}
        disabled={isLoading}
      >
        {text}
      </button>
    </div>
  );
}

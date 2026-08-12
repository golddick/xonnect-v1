import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';

interface NewsletterSubscriptionOptions {
  source?: string;
  initialEmail?: string;
}

export function useNewsletterSubscription(options?: NewsletterSubscriptionOptions) {
  const [email, setEmail] = useState(options?.initialEmail ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setEmail('');
    setIsLoading(false);
    setShowSuccess(false);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim()) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            source: options?.source ?? 'landing_page',
          }),
        });

        const payload = await response.json();

        if (!response.ok || !payload?.success) {
          throw new Error(payload?.message || 'Unable to subscribe.');
        }

        setShowSuccess(true);
        setEmail('');
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [email, options?.source]
  );

  return {
    email,
    setEmail,
    handleSubmit,
    isLoading,
    showSuccess,
    error,
    reset,
  };
}

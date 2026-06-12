
// components/NewsLetterSection.tsx
'use client';

import { motion } from "framer-motion";
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useNewsletterSubscription } from "@/hook/useHook/useNewsletterSubscription";

const NewsLetterSection = () => {
  const {
    email,
    setEmail,
    handleSubmit,
    isLoading,
    showSuccess,
    error,
    reset,
  } = useNewsletterSubscription();

  // Auto-reset error after 5 seconds
  useEffect(() => {
    if (error && !isLoading) {
      const timer = setTimeout(() => {
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    } 
  }, [error, isLoading, reset]);

  return (
    <section className="py-20 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-card backdrop-blur-sm border border-border rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Success Overlay */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm flex flex-col items-center justify-center z-10"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-green-500 mb-2">
                Successfully Subscribed!
              </h3>
              <p className="text-green-400">
                Thank you for subscribing to our newsletter.
              </p>
            </motion.div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with <span className="text-red-500">Xonnect Insights</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Get the latest tips, strategies, and industry insights delivered to your inbox weekly.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Email address for newsletter subscription"
                  aria-invalid={!!error}
                  aria-describedby={error ? "email-error" : undefined}
                />
                
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-red-400 text-sm mb-4"
                id="email-error"
                role="alert"
              >
                <XCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}

            <p className="text-sm text-muted-foreground">
              No spam, unsubscribe at any time.
            </p>
            
            {/* Success Message (alternative to overlay) */}
            {showSuccess && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-sm mt-4"
              >
                🎉 Welcome aboard! Check your email for confirmation.
              </motion.p>
            )}
          </form>

          {/* Stats or additional info */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Join <span className="text-red-400 font-semibold">1,000+</span> users already receiving our insights
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetterSection;
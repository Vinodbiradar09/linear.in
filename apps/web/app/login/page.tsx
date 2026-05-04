"use client";

import { signIn } from "@repo/auth/client";
import { useState } from "react";
import Link from "next/link";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin shrink-0"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap');

        .login-root {
          min-height: 100dvh;
          background: #f5f3ef;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .login-root::after {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,89,255,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .topbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          background: rgba(245,243,239,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 10;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .logo-text {
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          font-size: 15px;
          color: #111;
          letter-spacing: -0.03em;
        }

        .logo-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6359ff;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          font-size: 13px;
          color: rgba(0,0,0,0.38);
          transition: color 0.15s;
          letter-spacing: -0.01em;
        }
        .back-link:hover { color: rgba(0,0,0,0.7); }

        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.09);
          border-radius: 20px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05);
          overflow: hidden;
          animation: slideUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-header {
          padding: 32px 32px 28px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: #fafaf9;
        }

        .card-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #6359ff;
          background: rgba(99,89,255,0.08);
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .card-tag::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6359ff;
          opacity: 0.7;
        }

        .card-title {
          font-family: 'Instrument Serif', serif;
          font-size: 26px;
          font-weight: 400;
          color: #111;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 6px;
        }

        .card-title em {
          font-style: italic;
          color: #6359ff;
        }

        .card-sub {
          font-size: 13.5px;
          color: rgba(0,0,0,0.42);
          line-height: 1.5;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .card-body {
          padding: 28px 32px 32px;
        }

        .google-btn {
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          position: relative;
          overflow: hidden;
        }

        .google-btn:hover:not(:disabled) {
          background: #222;
          transform: translateY(-1px);
        }

        .google-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .google-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          padding: 10px 14px;
          background: #fff5f5;
          border: 1px solid rgba(220,38,38,0.15);
          border-radius: 10px;
          font-size: 13px;
          color: #b91c1c;
          letter-spacing: -0.01em;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(0,0,0,0.07);
        }

        .divider-text {
          font-size: 11px;
          color: rgba(0,0,0,0.28);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .terms {
          margin-top: 22px;
          font-size: 12px;
          color: rgba(0,0,0,0.32);
          line-height: 1.6;
          letter-spacing: -0.01em;
          text-align: center;
        }

        .terms a {
          color: rgba(0,0,0,0.5);
          text-decoration-color: rgba(0,0,0,0.2);
          text-underline-offset: 2px;
        }
        .terms a:hover { color: #111; }

        .footer-text {
          position: relative;
          z-index: 1;
          margin-top: 28px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(0,0,0,0.28);
          letter-spacing: -0.01em;
          text-align: center;
          animation: slideUp 0.45s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <div className="login-root">
        {/* Top bar */}
        <nav className="topbar">
          <Link href="/" className="logo">
            <span className="logo-text">Linear.in</span>
            <span className="logo-dot" />
          </Link>
          <Link href="/" className="back-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              width="13"
              height="13"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
        </nav>

        {/* Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-tag">Secure sign-in</div>
            <h1 className="card-title">
              Welcome to <em>linear.in</em>
            </h1>
            <p className="card-sub">
              Sign in to access your workspace and pick up where you left off.
            </p>
          </div>

          <div className="card-body">
            <button
              className="google-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
              aria-label="Continue with Google"
            >
              {loading ? <Spinner /> : <GoogleIcon />}
              <span>{loading ? "Signing in…" : "Continue with Google"}</span>
            </button>

            {error && (
              <div className="error-box" role="alert">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  width="14"
                  height="14"
                  style={{ flexShrink: 0 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">trusted & secure</span>
              <div className="divider-line" />
            </div>

            <p className="terms">
              By continuing, you agree to our{" "}
              <Link href="/terms">Terms of Service</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>.
              <br />
              We never share your data.
            </p>
          </div>
        </div>

        <p className="footer-text">linear.in — built for focus</p>
      </div>
    </>
  );
}

'use client';
import { useState, useEffect } from "react";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setStep(2);
      setTimer(120);
      setIsLoading(false);
      console.log("Code sent to:", phone);
    }, 1000);
  };

  const handleResend = () => {
    setTimer(120);
    console.log("Code resent to:", phone);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      alert("Please enter the 6-digit code");
      return;
    }
    alert("Logged in successfully!");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 relative"
      style={{
        backgroundImage: `url('images/conveyor-bb.jpg')`, // ← Change this URL to your favorite
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-6 sm:p-8 lg:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 rounded-full mb-4 shadow-lg">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fault Panel</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2 px-4">
              Secure access to monitoring system
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09XX XXX XX XX"
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition text-base sm:text-lg"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">We'll send you a 6-digit verification code</p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3.5 rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base sm:text-lg"
              >
                {isLoading ? "Sending Code..." : "Send Code"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Verification Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="••••••"
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition text-center text-2xl sm:text-3xl tracking-widest font-mono"
                  autoFocus
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Code sent to <span className="font-semibold">{phone}</span>
                  </p>
                  <span className={`text-sm font-medium ${timer > 0 ? "text-indigo-600" : "text-green-600"}`}>
                    {timer > 0 ? formatTime(timer) : "00:00"}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base sm:text-lg"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0}
                className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:text-gray-400 disabled:cursor-not-allowed transition"
              >
                Resend Code
              </button>
            </form>
          )}

          {step === 2 && (
            <button
              onClick={() => {
                setStep(1);
                setCode("");
                setTimer(0);
              }}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-800 mt-6 transition"
            >
              ← Change phone number
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-300 mt-8 px-4">
          © 2025 memseco. All rights reserved.
        </p>
      </div>
    </div>
  );
}
"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RegistrationSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 300000); // 3 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary-dark)]">
      <div className="text-center bg-[var(--background)] rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white">🎉 Registration Successful!</h1>
        <p className="text-gray-200 mt-4">
          Thank you for signing up! A verification link has been sent to your email. Please verify your account to unlock the full features of Yengflix.
        </p>
        <p className="text-gray-200 mt-2">
          You’ll be redirected to the login page shortly.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-700"
          onClick={() => router.push('/login')}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;

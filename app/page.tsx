"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SiGmail } from "react-icons/si";
import { FaChartLine, FaBell, FaShieldAlt } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import transactionsList from "./assets/transaction.png";
import transactionDetails from "./assets/details.png";
import dashboard from "./assets/dashboard.png";

const brands = [
  { name: "Amazon", logo: "/amazon.png" },
  { name: "Uber", logo: "/uber.png" },
  { name: "Flipkart", logo: "/flipkart.png" },
  { name: "Swiggy", logo: "/swiggy.png" },
  { name: "Zomato", logo: "/zomato.png" },
  { name: "Many More", logo: "/more.png", isMore: true },
];

const features = [
  {
    icon: <SiGmail className='w-8 h-8 text-primary' />,
    title: "Gmail Integration",
    description:
      "Connect your Gmail inbox to automatically track your e-commerce purchases and invoices.",
  },
  {
    icon: <FaChartLine className='w-8 h-8 text-primary' />,
    title: "Smart Analytics",
    description:
      "Get detailed insights into your spending patterns across different platforms and categories.",
  },
  {
    icon: <FaBell className='w-8 h-8 text-primary' />,
    title: "Spending Alerts",
    description:
      "Set custom spending limits and receive notifications when you approach or exceed them.",
  },
  {
    icon: <FaShieldAlt className='w-8 h-8 text-primary' />,
    title: "Secure & Private",
    description:
      "Your data is encrypted and secure. We only read the necessary information from your emails.",
  },
];

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email?: string; phone?: string }) => void;
}

function RegistrationModal({
  isOpen,
  onClose,
  onSubmit,
}: RegistrationModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPhone("");
      setError("");
      setIsSubmitted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose]);

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!email && !phone) {
      setError("Please provide email");
      return;
    }
    setError("");

    // Create FormData
    const form = e.target as HTMLFormElement;
    const data = {
      email: (e.target as HTMLFormElement).email.value,
      phone: (e.target as HTMLFormElement).phone.value,
    };

    // Submit to Netlify
    fetch(
      "https://asia-south1-zap-dev-384118.cloudfunctions.net/feedback-service",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({ fields: data }),
      }
    )
      .then(() => {
        console.log("Form submitted successfully");
        setIsSubmitted(true);
        onSubmit({ email, phone });
      })
      .catch((error) => console.error(error));
    e.preventDefault();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/50'
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className='relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md mx-auto z-10'
          >
            {!isSubmitted ? (
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    Register for Early Access
                  </h3>
                  <button
                    onClick={onClose}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='your@email.com'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                  />
                </div>

                {error && (
                  <div className='bg-red-50 text-red-500 text-sm p-3 rounded-lg mt-3'>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  className='mt-3 w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors'
                >
                  Register Now
                </button>
              </div>
            ) : (
              <div className='p-6'>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='py-8 text-center'
                >
                  <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      className='w-8 h-8 text-green-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    Thank You!
                  </h3>
                  <p className='text-gray-600'>
                    We've received your registration. We'll notify you when we
                    launch!
                  </p>
                  <motion.div className='mt-4 h-1 bg-gray-100 rounded-full overflow-hidden'>
                    <motion.div
                      className='h-full bg-primary'
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function MockupDisplay() {
  return (
    <div className='relative w-full max-w-5xl mx-auto mt-12 lg:mt-32'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='relative z-10 flex justify-center'
      >
        {/* Main Phone - Dashboard */}
        <div className='relative w-[280px] h-[580px] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl'></div>
          <div className='h-full w-full overflow-hidden rounded-[2rem]'>
            <Image
              src={dashboard}
              alt='Dashboard'
              className='w-full h-full object-cover'
              priority
            />
          </div>
        </div>

        {/* Left Phone - Transactions List */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className='hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4'
        >
          <div className='relative w-[240px] h-[500px] bg-white rounded-[2.5rem] shadow-xl border-8 border-gray-900 -rotate-12'>
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl'></div>
            <div className='h-full w-full overflow-hidden rounded-[2rem]'>
              <Image
                src={transactionsList}
                alt='Transactions List'
                className='w-full h-full object-cover'
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Right Phone - Transaction Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className='hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4'
        >
          <div className='relative w-[240px] h-[500px] bg-white rounded-[2.5rem] shadow-xl border-8 border-gray-900 rotate-12'>
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl'></div>
            <div className='h-full w-full overflow-hidden rounded-[2rem]'>
              <Image
                src={transactionDetails}
                alt='Transaction Details'
                className='w-full h-full object-cover'
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className='absolute -z-10 w-full h-full'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-accent rounded-full blur-3xl'></div>
        </div>
      </motion.div>
    </div>
  );
}

const BrandLogo = () => (
  <div className='flex items-center space-x-2'>
    <div className='w-8 h-8 bg-primary rounded flex items-center justify-center'>
      <svg
        className='w-5 h-5 text-white'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M13 10V3L4 14h7v7l9-11h-7z' fill='currentColor' />
      </svg>
    </div>
    <span className='font-bold text-2xl text-secondary'>Zap</span>
  </div>
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistration = (data: { email?: string; phone?: string }) => {
    // Just log the data without showing alert
    console.log("Registration data:", data);
    // The modal will automatically close and show thank you message
  };

  function emailIsValid(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !emailIsValid(email)) {
      setError("Please provide email");
      return;
    }
    setError("");
    setLoading(true);

    const data = {
      email: email,
      product: "zap | budget",
    };

    fetch(
      "https://asia-south1-zap-dev-384118.cloudfunctions.net/feedback-service",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then(() => {
        console.log("Form submitted successfully");
        setEmail("");
        alert("Thank you for registering!");
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Navigation */}
      <nav className='py-6'>
        <div className='container mx-auto px-4'>
          <BrandLogo />
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative py-20 lg:py-32'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='max-w-4xl mx-auto text-center'
          >
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
              Smart Budget Tracking
              <span className='text-primary block mt-2'>Made Simple</span>
            </h1>
            <p className='text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              Connect your Gmail inbox and let us automatically track your
              spending across all your favorite platforms.
            </p>
            <div className='flex items-center space-y-4 flex-col '>
              <div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='your@email.com'
                  className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                />
              </div>

              {error && (
                <div className='bg-red-50 text-red-500 text-sm p-3 rounded-lg mt-3'>
                  {error}
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className='bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px]'
              >
                {loading ? (
                  <>
                    <svg
                      className='animate-spin h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Register for Early Access"
                )}
              </button>
            </div>
          </motion.div>

          {/* Mockup Display */}
          <div className='relative w-full max-w-5xl mx-auto mt-12 lg:mt-32'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='relative z-10 flex justify-center'
            >
              {/* Main Phone - Dashboard */}
              <div className='relative w-[280px] h-[580px] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden'>
                <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl'></div>
                <div className='h-full w-full overflow-hidden rounded-[2rem]'>
                  <Image
                    src={dashboard}
                    alt='Dashboard'
                    className='w-full h-full object-cover'
                    priority
                  />
                </div>
              </div>

              {/* Left Phone - Transactions List */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4'
              >
                <div className='relative w-[240px] h-[500px] bg-white rounded-[2.5rem] shadow-xl border-8 border-gray-900 -rotate-12'>
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl'></div>
                  <div className='h-full w-full overflow-hidden rounded-[2rem]'>
                    <Image
                      src={transactionsList}
                      alt='Transactions List'
                      className='w-full h-full object-cover'
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Phone - Transaction Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className='hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4'
              >
                <div className='relative w-[240px] h-[500px] bg-white rounded-[2.5rem] shadow-xl border-8 border-gray-900 rotate-12'>
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl'></div>
                  <div className='h-full w-full overflow-hidden rounded-[2rem]'>
                    <Image
                      src={transactionDetails}
                      alt='Transaction Details'
                      className='w-full h-full object-cover'
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className='py-16 lg:py-40 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='text-3xl md:text-4xl font-bold text-center mb-6'
            >
              Never Lose Track of Your Spending Again
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='text-xl text-gray-600 text-center mb-12 lg:mb-24'
            >
              As great as our email inboxes are, they're not built for expense
              tracking. Good thing, they don't have to be anymore.
            </motion.p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100'
              >
                <h3 className='text-2xl font-bold mb-4'>Our Approach</h3>
                <ul className='space-y-4'>
                  <li className='flex items-start'>
                    <svg
                      className='w-6 h-6 text-green-500 mt-1 mr-3'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span>No manual data entry required</span>
                  </li>
                  <li className='flex items-start'>
                    <svg
                      className='w-6 h-6 text-green-500 mt-1 mr-3'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span>Secure, read-only access to your emails</span>
                  </li>
                  <li className='flex items-start'>
                    <svg
                      className='w-6 h-6 text-green-500 mt-1 mr-3'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span>AI-powered expense categorization</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100'
              >
                <h3 className='text-2xl font-bold mb-4'>What You Get</h3>
                <ul className='space-y-4'>
                  <li className='flex items-start'>
                    <svg
                      className='w-6 h-6 text-primary mt-1 mr-3'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      />
                    </svg>
                    <span>Complete spending history at your fingertips</span>
                  </li>
                  <li className='flex items-start'>
                    <svg
                      className='w-6 h-6 text-primary mt-1 mr-3'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      />
                    </svg>
                    <span>Real-time spending insights and trends</span>
                  </li>
                  <li className='flex items-start'>
                    <svg
                      className='w-6 h-6 text-primary mt-1 mr-3'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                    <span>Smart alerts for unusual spending</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            How It Works
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className='p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
              >
                <div className='mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold mb-3 text-gray-900'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                More Than Just Numbers
              </h2>
              <p className='text-xl text-gray-600'>
                Find any transaction instantly. Understand your spending
                patterns at a glance.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className='relative'
              >
                <div className='space-y-8'>
                  <div>
                    <h3 className='text-2xl font-bold mb-4'>Powerful Search</h3>
                    <p className='text-gray-600 mb-4'>
                      Just type and find any transaction instantly. Search by:
                    </p>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex items-center space-x-2 text-gray-600'>
                        <svg
                          className='w-5 h-5 text-primary'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                          />
                        </svg>
                        <span>Merchant</span>
                      </div>
                      <div className='flex items-center space-x-2 text-gray-600'>
                        <svg
                          className='w-5 h-5 text-primary'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                          />
                        </svg>
                        <span>Category</span>
                      </div>
                      <div className='flex items-center space-x-2 text-gray-600'>
                        <svg
                          className='w-5 h-5 text-primary'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span>Date Range</span>
                      </div>
                      <div className='flex items-center space-x-2 text-gray-600'>
                        <svg
                          className='w-5 h-5 text-primary'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span>Amount</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-2xl font-bold mb-4'>Smart Filters</h3>
                    <div className='flex flex-wrap gap-3'>
                      <span className='px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                        Last 30 Days
                      </span>
                      <span className='px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                        Food & Dining
                      </span>
                      <span className='px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                        Above ₹1000
                      </span>
                      <span className='px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                        Online Shopping
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100'
              >
                <div className='flex items-center space-x-4 mb-6 p-3 bg-gray-50 rounded-lg'>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                  <span className='text-gray-400'>Search transactions...</span>
                </div>

                <div className='space-y-4'>
                  <div className='p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='font-medium'>Amazon.in</span>
                      <span className='text-red-500'>-₹2,499</span>
                    </div>
                    <div className='flex justify-between text-sm text-gray-500'>
                      <span>Shopping</span>
                      <span>Today</span>
                    </div>
                  </div>

                  <div className='p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='font-medium'>Swiggy</span>
                      <span className='text-red-500'>-₹450</span>
                    </div>
                    <div className='flex justify-between text-sm text-gray-500'>
                      <span>Food & Dining</span>
                      <span>Yesterday</span>
                    </div>
                  </div>

                  <div className='p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='font-medium'>Uber</span>
                      <span className='text-red-500'>-₹350</span>
                    </div>
                    <div className='flex justify-between text-sm text-gray-500'>
                      <span>Travel</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Workflow Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8'>
            Why People Love Zap
          </h2>
          <p className='text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto'>
            Join thousands of users who are taking control of their finances
          </p>

          {/* Stats Section */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='text-center p-8 bg-white rounded-2xl shadow-lg'
            >
              <div className='text-5xl font-bold text-primary mb-2'>78%</div>
              <p className='text-gray-600'>
                People who track expenses report improved financial habits
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='text-center p-8 bg-white rounded-2xl shadow-lg'
            >
              <div className='text-5xl font-bold text-primary mb-2'>2min</div>
              <p className='text-gray-600'>
                Average time to set up your account and start tracking
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='text-center p-8 bg-white rounded-2xl shadow-lg'
            >
              <div className='text-5xl font-bold text-primary mb-2'>100%</div>
              <p className='text-gray-600'>
                Automated expense tracking from your email
              </p>
            </motion.div>
          </div>

          {/* Process Flow */}
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className='relative'
              >
                <div className='bg-white p-6 rounded-2xl shadow-lg'>
                  <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto'>
                    <div className='text-3xl font-bold text-primary'>1</div>
                  </div>
                  <h3 className='text-xl font-bold text-center mb-4'>
                    Connect Gmail
                  </h3>
                  <div className='aspect-video bg-gray-50 rounded-lg mb-4 overflow-hidden'>
                    <div className='w-full h-full flex items-center justify-center'>
                      <div className='w-12 h-12 text-primary'>
                        <SiGmail className='w-full h-full' />
                      </div>
                    </div>
                  </div>
                  <p className='text-center text-gray-600'>
                    Securely connect your Gmail account in just one click
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='relative'
              >
                <div className='bg-white p-6 rounded-2xl shadow-lg'>
                  <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto'>
                    <div className='text-3xl font-bold text-primary'>2</div>
                  </div>
                  <h3 className='text-xl font-bold text-center mb-4'>
                    Auto-Track Expenses
                  </h3>
                  <div className='aspect-video bg-gray-50 rounded-lg mb-4 overflow-hidden'>
                    <div className='w-full h-full flex items-center justify-center'>
                      <div className='w-12 h-12 text-primary'>
                        <FaChartLine className='w-full h-full' />
                      </div>
                    </div>
                  </div>
                  <p className='text-center text-gray-600'>
                    AI automatically categorizes your expenses
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className='relative'
              >
                <div className='bg-white p-6 rounded-2xl shadow-lg'>
                  <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto'>
                    <div className='text-3xl font-bold text-primary'>3</div>
                  </div>
                  <h3 className='text-xl font-bold text-center mb-4'>
                    Get Insights
                  </h3>
                  <div className='aspect-video bg-gray-50 rounded-lg mb-4 overflow-hidden'>
                    <div className='w-full h-full flex items-center justify-center'>
                      <div className='w-12 h-12 text-primary'>
                        <FaBell className='w-full h-full' />
                      </div>
                    </div>
                  </div>
                  <p className='text-center text-gray-600'>
                    Get personalized insights and smart alerts
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='mt-20 text-center'
          >
            <div className='inline-flex flex-wrap justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg'>
              <div className='flex items-center gap-2 text-gray-600'>
                <FaShieldAlt className='w-5 h-5 text-primary' />
                <span>Bank-grade security</span>
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <svg
                  className='w-5 h-5 text-primary'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
                <span>256-bit encryption</span>
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
                <svg
                  className='w-5 h-5 text-primary'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section with Visual Cards */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            Coming Soon
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Bank Integration</h3>
              <p className='text-gray-600'>
                Connect your bank accounts for complete financial tracking
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Bill Reminders</h3>
              <p className='text-gray-600'>
                Never miss a payment with smart bill reminders
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-2'>Family Sharing</h3>
              <p className='text-gray-600'>
                Share expenses and budgets with family members
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            Supported Platforms
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto'>
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className='flex items-center justify-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all'
              >
                <div className='text-center'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center'>
                    {brand.isMore ? (
                      <span className='text-2xl font-bold text-primary'>+</span>
                    ) : (
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={32}
                        height={32}
                        className='object-contain'
                      />
                    )}
                  </div>
                  <p className='text-lg font-semibold text-gray-800'>
                    {brand.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className='py-16 lg:py-24 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='space-y-8'
            >
              <h2 className='text-3xl md:text-4xl font-bold'>Our Mission</h2>
              <div className='space-y-6 text-xl text-gray-600 leading-relaxed'>
                <p>
                  We believe managing your money shouldn't be a full-time job.
                  You shouldn't have to spend hours logging into different
                  accounts, manually tracking expenses, or updating
                  spreadsheets.
                </p>
                <p>
                  That's why we built Zap - to give you clarity over your
                  spending without the hassle. By connecting to your Gmail, we
                  automatically track and organize your expenses, so you can
                  focus on what matters most.
                </p>
                <p className='text-primary font-semibold'>
                  Because financial peace of mind should be effortless.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            Help Shape the Future of Zap
          </h2>
          <p className='text-xl text-gray-600 mb-12 max-w-2xl mx-auto'>
            We're building Zap for you! Share your thoughts, feature requests,
            or suggestions.
          </p>

          {/* Feedback Categories */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-3'>Feature Ideas</h3>
              <p className='text-gray-600'>
                Share your innovative ideas for new features that would make Zap
                more useful for you
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 .905.714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-3'>User Experience</h3>
              <p className='text-gray-600'>
                Tell us how we can make Zap more intuitive and easier to use in
                your daily life
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <svg
                  className='w-6 h-6 text-primary'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold mb-3'>General Feedback</h3>
              <p className='text-gray-600'>
                Any other thoughts or suggestions? We'd love to hear from you!
              </p>
            </motion.div>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
            <a
              href='https://forms.gle/7vWHHcLz13jrp7J98'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-white bg-primary px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                />
              </svg>
              Share Feedback
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8'>
            Frequently Asked Questions
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white p-6 rounded-2xl shadow-lg'
            >
              <h3 className='text-xl font-bold mb-3 text-gray-900'>
                Is my data secure?
              </h3>
              <p className='text-gray-600'>
                Absolutely! We use bank-grade encryption and only read
                transaction-related emails. Your personal data stays private and
                secure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='bg-white p-6 rounded-2xl shadow-lg'
            >
              <h3 className='text-xl font-bold mb-3 text-gray-900'>
                How does email scanning work?
              </h3>
              <p className='text-gray-600'>
                Our AI only scans for purchase receipts and invoices in your
                Gmail. We never read personal emails or store email content.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='bg-white p-6 rounded-2xl shadow-lg'
            >
              <h3 className='text-xl font-bold mb-3 text-gray-900'>
                Can I export my data?
              </h3>
              <p className='text-gray-600'>
                Yes! You can export your expense data anytime in multiple
                formats including CSV and PDF for your records.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className='bg-white p-6 rounded-2xl shadow-lg'
            >
              <h3 className='text-xl font-bold mb-3 text-gray-900'>
                What platforms are supported?
              </h3>
              <p className='text-gray-600'>
                We support major e-commerce and service platforms including
                Amazon, Uber, Flipkart, Swiggy, Zomato, and many more are being
                added regularly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            What Our Alpha Testers Say
          </h2>
          <p className='text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto'>
            Early feedback from users who've experienced Zap's potential
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='mb-6'>
                <svg
                  className='w-8 h-8 text-primary/40'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                </svg>
              </div>
              <p className='text-gray-600 mb-6 italic'>
                "The automatic categorization is spot on! I no longer need to
                manually track my online shopping expenses. It's exactly what I
                needed."
              </p>
              <div className='flex items-center'>
                <div className='ml-3'>
                  <p className='text-sm font-semibold text-gray-900'>
                    Priya M.
                  </p>
                  <p className='text-sm text-gray-500'>Product Manager</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='mb-6'>
                <svg
                  className='w-8 h-8 text-primary/40'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                </svg>
              </div>
              <p className='text-gray-600 mb-6 italic'>
                "Setup was incredibly easy, and within minutes I could see all
                my recent purchases. The insights have already helped me
                identify areas where I can save."
              </p>
              <div className='flex items-center'>
                <div className='ml-3'>
                  <p className='text-sm font-semibold text-gray-900'>
                    Rahul S.
                  </p>
                  <p className='text-sm text-gray-500'>Software Engineer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100'
            >
              <div className='mb-6'>
                <svg
                  className='w-8 h-8 text-primary/40'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                </svg>
              </div>
              <p className='text-gray-600 mb-6 italic'>
                "As someone who shops across multiple platforms, having all my
                expenses in one place is a game-changer. The privacy features
                are also really reassuring."
              </p>
              <div className='flex items-center'>
                <div className='ml-3'>
                  <p className='text-sm font-semibold text-gray-900'>
                    Anita K.
                  </p>
                  <p className='text-sm text-gray-500'>Digital Marketer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Update CTA Section */}
      <section className='py-20 bg-primary text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            Be Among the First to Experience It
          </h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto opacity-90'>
            Join our exclusive early access list and get notified when we
            launch.
          </p>
        </div>
      </section>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegistration}
      />
    </div>
  );
}

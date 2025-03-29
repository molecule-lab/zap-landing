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

  const encode = (data) => {
    console.log(data);

    console.log(
      Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&")
    );
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!email && !phone) {
      setError("Please provide either email or phone number");
      return;
    }
    setError("");

    // Create FormData
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    // Submit to Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact-form", ...data }),
    })
      .then(() => {
        console.log("Form submitted successfully");
        setIsSubmitted(true);
        onSubmit({ email, phone });
      })
      .catch((error) => console.error(error));
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

                <form
                  onSubmit={handleSubmit}
                  className='space-y-4'
                  name='early-access'
                  method='POST'
                  data-netlify='true'
                  netlify-honeypot='bot-field'
                >
                  <input type='hidden' name='form-name' value='early-access' />
                  <p className='hidden'>
                    <label>
                      Don't fill this out if you're human:{" "}
                      <input name='bot-field' />
                    </label>
                  </p>
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

                  <div className='relative flex items-center'>
                    <div className='flex-grow border-t border-gray-300'></div>
                    <span className='flex-shrink mx-4 text-gray-600'>or</span>
                    <div className='flex-grow border-t border-gray-300'></div>
                  </div>

                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Phone Number
                    </label>
                    <div className='relative flex'>
                      <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <span className='text-gray-500 select-none'>+91</span>
                      </div>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, "");
                          setPhone(value);
                        }}
                        placeholder='98765 43210'
                        className='w-full pl-14 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className='bg-red-50 text-red-500 text-sm p-3 rounded-lg'>
                      {error}
                    </div>
                  )}

                  <button
                    type='submit'
                    className='w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors'
                  >
                    Register Now
                  </button>
                </form>
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
    <div className='relative w-full max-w-5xl mx-auto mt-16 lg:mt-20'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
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
          transition={{ duration: 0.8, delay: 0.4 }}
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
          transition={{ duration: 0.8, delay: 0.6 }}
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

  const handleRegistration = (data: { email?: string; phone?: string }) => {
    // Just log the data without showing alert
    console.log("Registration data:", data);
    // The modal will automatically close and show thank you message
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
            transition={{ duration: 0.8 }}
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
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg hover:shadow-xl'
            >
              Register for Early Access
            </button>
          </motion.div>

          {/* Mockup Display */}
          <div className='relative w-full max-w-5xl mx-auto mt-16 lg:mt-20'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
                transition={{ duration: 0.8, delay: 0.4 }}
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
                transition={{ duration: 0.8, delay: 0.6 }}
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
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

      {/* Supported Platforms */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            Supported Platforms
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto'>
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='flex items-center justify-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all'
              >
                <div className='text-center'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center'>
                    <span className='text-2xl font-bold text-primary'>
                      {brand.name[0]}
                    </span>
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
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl'
          >
            Register for Early Access
          </button>
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

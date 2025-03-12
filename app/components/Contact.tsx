'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTelegram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formStatus, setFormStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await emailjs.sendForm(
        'service_s787tnh',
        'template_6t0ld21',
        formRef.current!,
        'ELwgW2Y6zKKFRMAnE'
      );

      setFormStatus('sent');
      toast.success('Message sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setTimeout(() => setFormStatus(''), 3000);
    } catch (error) {
      setFormStatus('');
      toast.error('Failed to send message. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'rakibulhasanshuvo206@gmail.com',
      href: 'mailto:rakibulhasanshuvo206@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+88015 21-711716',
      href: 'tel:+8801521711716'
    },
    {
      icon: FaTelegram,
      label: 'Telegram',
      value: '+880 1521-711716',
      href: 'http://t.me/+8801521711716'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Dhaka, Bangladesh',
      href: 'https://goo.gl/maps/your-location'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-[#0A192F] relative overflow-hidden py-20">
      {/* Animated background grid with improved opacity animation */}
      <div className="absolute inset-0 bg-grid-pattern animate-grid opacity-5 bg-blend-overlay"></div>
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-5xl font-bold text-[#CCD6F6] mb-16 text-center"
          variants={itemVariants}
        >
          <span className="text-gradient relative">
            Get In Touch
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#64FFDA] rounded-full"></span>
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            className="space-y-10"
            variants={itemVariants}
          >
            <motion.p 
              className="text-[#8892B0] text-xl leading-relaxed"
              variants={itemVariants}
            >
              I'm always excited to connect with new people and discuss interesting opportunities. 
              Feel free to reach out through any of these channels:
            </motion.p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="flex items-center space-x-6 text-[#8892B0] hover:text-[#64FFDA] group bg-[#112240] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-glow"
                  variants={itemVariants}
                  whileHover={{ x: 10, backgroundColor: "rgba(100, 255, 218, 0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="w-14 h-14 bg-[#0A192F] rounded-full flex items-center justify-center text-[#64FFDA] group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <info.icon className="w-7 h-7" />
                  </motion.div>
                  <div>
                    <h3 className="text-[#CCD6F6] font-semibold text-lg mb-1">{info.label}</h3>
                    <p className="text-[#8892B0] group-hover:text-[#64FFDA] transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-[#112240] p-10 rounded-xl shadow-2xl backdrop-blur-sm"
            variants={itemVariants}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-[#CCD6F6] mb-3 text-lg">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0A192F] text-[#CCD6F6] border-2 border-[#64FFDA]/30 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent transition-all duration-300 placeholder-[#4A5567]"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-[#CCD6F6] mb-3 text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0A192F] text-[#CCD6F6] border-2 border-[#64FFDA]/30 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent transition-all duration-300 placeholder-[#4A5567]"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-[#CCD6F6] mb-3 text-lg">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-[#0A192F] text-[#CCD6F6] border-2 border-[#64FFDA]/30 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent transition-all duration-300 resize-none placeholder-[#4A5567]"
                  placeholder="Your message here..."
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] font-semibold py-4 px-8 rounded-lg hover:bg-[#64FFDA]/10 transition-all duration-300 relative overflow-hidden group text-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === 'sending'}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={formStatus}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 inline-flex items-center"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#64FFDA]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : formStatus === 'sent' ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Sent Successfully!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.span>
                </AnimatePresence>
                <motion.div
                  className="absolute inset-0 bg-[#64FFDA]/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
      
      <ToastContainer />
    </section>
  );
};

export default Contact; 

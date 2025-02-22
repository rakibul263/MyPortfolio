'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTelegram } from 'react-icons/fa';

const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formStatus, setFormStatus] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Add your form submission logic here
    // For demonstration, we'll just simulate a delay
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'rakibulhasanshuvo206@gmail.com',
      href: 'rakibulhasanshuvo206@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+88015 21-711716',
      href: 'tel:+88015 21-711716'
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
    <section id="contact" className="section-padding bg-[#0A192F] relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern animate-grid opacity-5"></div>
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-4xl font-bold text-[#CCD6F6] mb-12 text-center text-gradient"
          variants={itemVariants}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.p 
              className="text-[#8892B0] text-lg leading-relaxed"
              variants={itemVariants}
            >
              I'm always interested in hearing about new opportunities, projects, or just having a chat. 
              Feel free to reach out through any of the following methods:
            </motion.p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="flex items-center space-x-4 text-[#8892B0] hover:text-[#64FFDA] group bg-[#112240] p-4 rounded-lg glow-effect"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-[#0A192F] rounded-full flex items-center justify-center text-[#64FFDA] group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <info.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-[#CCD6F6] font-semibold">{info.label}</h3>
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
            className="bg-[#112240] p-8 rounded-lg glow-effect"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-[#CCD6F6] mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-[#0A192F] text-[#CCD6F6] border border-[#64FFDA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-[#CCD6F6] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-[#0A192F] text-[#CCD6F6] border border-[#64FFDA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-[#CCD6F6] mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full bg-[#0A192F] text-[#CCD6F6] border border-[#64FFDA] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] transition-all duration-300 resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] font-semibold py-3 px-6 rounded-lg hover:bg-[#64FFDA]/10 transition-all duration-300 relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === 'sending'}
              >
                <span className="relative z-10">
                  {formStatus === 'sending' ? 'Sending...' : 
                   formStatus === 'sent' ? 'Message Sent!' : 
                   'Send Message'}
                </span>
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
    </section>
  );
};

export default Contact; 
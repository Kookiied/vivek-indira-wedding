import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { MapPin, ExternalLink, Phone, MessageSquare } from 'lucide-react';

export default function LocationDetails() {
  return (
    <section className="relative w-full bg-[#4A040F] text-[#FAF8F5] py-16 px-4">
      
      {/* Seamless Overlapping Floral Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex justify-center">
        <img 
          src="/flowers-divider.png" 
          alt="Floral Divider" 
          className="w-full scale-110 h-auto object-contain" 
        />
      </div>

      <div className="max-w-md mx-auto text-center">

        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            The Destination
          </span>
          <h2 className="font-script text-5xl sm:text-6xl text-[#F3E5AB]">
            Location & Venue
          </h2>
        </motion.div>

        {/* Venue Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#310209] border-2 border-[#D4AF37]/60 rounded-2xl p-6 shadow-2xl overflow-hidden mb-12"
        >
          {/* Watercolor Venue Sketch */}
          <div className="w-full h-48 rounded-xl border border-[#D4AF37]/30 overflow-hidden mb-6 relative group shadow-lg">
            <img 
              src="/venue-sketch.jpg" 
              alt="Raj Vilas Watercolor Sketch" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
            />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#F3E5AB] mb-2">
            {weddingData.venue.name}
          </h3>
          <p className="font-sans text-xs text-[#FAF8F5]/80 leading-relaxed max-w-xs mx-auto mb-6">
            {weddingData.venue.fullAddress}
          </p>

          {/* View on Google Maps Button */}
          <motion.a 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={weddingData.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#4A040F] font-serif font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-gold-glow transition-all"
          >
            <MapPin className="w-4 h-4 text-[#4A040F]" />
            View On Google Maps
            <ExternalLink className="w-3.5 h-3.5 text-[#4A040F]" />
          </motion.a>

        </motion.div>

        {/* Contact Help Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#310209]/60 border border-[#D4AF37]/30 rounded-xl p-5"
        >
          <span className="font-sans text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            Questions & Assistance
          </span>
          <p className="font-serif text-xs text-[#FAF8F5]/80 italic mb-4">
            For travel inquiries, accommodation, or directions, please reach out to our team:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {weddingData.contacts.map((contact) => (
              <div key={contact.name} className="bg-[#4A040F] border border-[#D4AF37]/30 p-3 rounded-lg text-center">
                <span className="font-serif text-xs font-bold text-[#F3E5AB] block mb-1">
                  {contact.name}
                </span>
                <span className="font-sans text-[11px] text-[#FAF8F5]/90 block mb-2">
                  {contact.phone}
                </span>
                <div className="flex justify-center gap-2">
                  <a 
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                    className="p-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4A040F] transition-colors"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>

    </section>
  );
}

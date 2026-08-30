import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Download, RefreshCw, X, Users, CheckCircle, XCircle, Utensils } from 'lucide-react';
import { getAllRSVPs, exportRSVPsToCSV } from '../services/rsvpService';

export default function AdminDashboard({ isOpen, onClose }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PIN = '25102026'; // Admin Password set to 25102026

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      fetchData();
    } else {
      setPinError(true);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllRSVPs();
    setRsvps(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchData();
    }
  }, [isAuthenticated, isOpen]);

  // Analytics Math
  const totalSubmissions = rsvps.length;
  const attendingList = rsvps.filter(r => r.attending === 'yes');
  const totalAttendingGuests = attendingList.reduce((acc, curr) => acc + (parseInt(curr.guestCount) || 1), 0);
  const vegCount = attendingList.filter(r => r.dietary === 'veg').reduce((acc, curr) => acc + (parseInt(curr.guestCount) || 1), 0);
  const nonVegCount = attendingList.filter(r => r.dietary === 'non-veg').reduce((acc, curr) => acc + (parseInt(curr.guestCount) || 1), 0);
  const declinedCount = rsvps.filter(r => r.attending === 'no').length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#FFF0F5] border-2 border-[#E6A4B4] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#3D061A] via-[#5E0B2B] to-[#3D061A] p-5 text-[#FFF0F5] border-b border-[#E6A4B4]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-[#E6A4B4]/20 border border-[#E6A4B4]">
                <Lock className="w-5 h-5 text-[#F8C8DC]" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#F8C8DC]">
                  RSVP Management Portal
                </h2>
                <p className="font-sans text-[10px] text-[#FFF0F5]/80 uppercase tracking-widest">
                  Vivek & Indira Wedding Database
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#FFF0F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Login Screen (If not authenticated) */}
          {!isAuthenticated ? (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-16 h-16 rounded-full bg-[#5E0B2B] border-2 border-[#E6A4B4] flex items-center justify-center mb-4 text-[#F8C8DC] shadow-lg">
                <Lock className="w-8 h-8" />
              </div>
              
              <h3 className="font-serif text-2xl text-[#5E0B2B] font-bold mb-1">
                Admin Access
              </h3>
              <p className="font-sans text-xs text-[#2D2D2D]/70 mb-6 max-w-xs">
                Enter your password to view guest RSVP responses and download Excel reports.
              </p>

              <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col gap-3">
                <input 
                  type="password"
                  placeholder="Enter Password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 border-[#E6A4B4] text-center font-bold tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-[#5E0B2B] bg-white text-[#2D2D2D]"
                />

                {pinError && (
                  <p className="text-rose-600 text-xs font-bold">
                    Incorrect Password. Please enter the valid admin password.
                  </p>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#5E0B2B] via-[#700933] to-[#5E0B2B] text-[#FFF0F5] border border-[#E6A4B4]/60 font-serif font-bold text-xs uppercase tracking-widest shadow-lg cursor-pointer hover:brightness-110"
                >
                  Unlock Portal
                </button>
              </form>
            </div>
          ) : (
            /* Main Dashboard Content */
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              
              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6A4B4]/30 pb-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={fetchData}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E6A4B4] text-xs font-bold text-[#5E0B2B] shadow-sm hover:bg-[#FFF0F5] cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                <button 
                  onClick={() => exportRSVPsToCSV(rsvps)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5E0B2B] to-[#700933] text-[#F8C8DC] border border-[#E6A4B4] text-xs font-bold shadow-md hover:brightness-110 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Excel Spreadsheet (.CSV)
                </button>
              </div>

              {/* Analytics Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Total Attending */}
                <div className="bg-white border border-[#E6A4B4]/40 rounded-2xl p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between text-[#5E0B2B] mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Total Attending</span>
                    <Users className="w-4 h-4 text-[#B83B5E]" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#5E0B2B]">
                    {totalAttendingGuests}
                  </span>
                  <span className="text-[10px] text-[#2D2D2D]/50 mt-1">Confirmed Guests</span>
                </div>

                {/* Vegetarian */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between text-emerald-700 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Vegetarian</span>
                    <Utensils className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-emerald-800">
                    {vegCount}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1">Veg Meals Needed</span>
                </div>

                {/* Non-Vegetarian */}
                <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between text-amber-700 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Non-Veg</span>
                    <Utensils className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-amber-800">
                    {nonVegCount}
                  </span>
                  <span className="text-[10px] text-amber-600 mt-1">Non-Veg Meals Needed</span>
                </div>

                {/* Declined */}
                <div className="bg-white border border-rose-200 rounded-2xl p-4 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between text-rose-700 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D]/60">Declined</span>
                    <XCircle className="w-4 h-4 text-rose-600" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-rose-800">
                    {declinedCount}
                  </span>
                  <span className="text-[10px] text-rose-600 mt-1">Unable to Attend</span>
                </div>

              </div>

              {/* Responses Data Table */}
              <div className="bg-white border border-[#E6A4B4]/40 rounded-2xl shadow-sm overflow-hidden flex-1">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-pink-50/30">
                  <h4 className="font-serif font-bold text-sm text-[#5E0B2B]">
                    All Submissions ({totalSubmissions})
                  </h4>
                </div>

                <div className="overflow-x-auto max-h-80">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#5E0B2B] text-[#F8C8DC] uppercase text-[10px] tracking-wider sticky top-0 font-serif">
                        <th className="p-3">Guest Name</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Count</th>
                        <th className="p-3">Diet</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Wishes / Message</th>
                        <th className="p-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {rsvps.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-[#2D2D2D]/50 italic">
                            No RSVPs received yet. New guest submissions will appear here automatically!
                          </td>
                        </tr>
                      ) : (
                        rsvps.map((record, index) => (
                          <tr key={record.id || index} className="hover:bg-pink-50/50 transition-colors">
                            <td className="p-3 font-semibold text-[#5E0B2B]">
                              {record.name}
                            </td>

                            <td className="p-3">
                              {record.attending === 'yes' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                  <CheckCircle className="w-3 h-3" /> Attending
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                                  <XCircle className="w-3 h-3" /> Declined
                                </span>
                              )}
                            </td>

                            <td className="p-3 text-center font-bold">
                              {record.attending === 'yes' ? record.guestCount || 1 : 0}
                            </td>

                            <td className="p-3 uppercase font-bold text-[10px]">
                              {record.dietary === 'veg' ? (
                                <span className="text-emerald-700">Veg</span>
                              ) : (
                                <span className="text-amber-700">Non-Veg</span>
                              )}
                            </td>

                            <td className="p-3 text-[#2D2D2D]/70">
                              {record.phone || record.email || '-'}
                            </td>

                            <td className="p-3 max-w-xs truncate text-[#2D2D2D]/80 italic">
                              {record.message ? `"${record.message}"` : '-'}
                            </td>

                            <td className="p-3 text-right text-[#2D2D2D]/50 text-[10px]">
                              {record.submittedAt ? new Date(record.submittedAt).toLocaleDateString() : ''}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

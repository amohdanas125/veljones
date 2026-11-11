'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, X, ThumbsUp, Filter } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  fit: string;
  colorway: string;
  reviewTitle: string;
  reviewText: string;
  date: string;
  helpfulCount: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Kabir Malhotra',
    city: 'Mumbai',
    rating: 5,
    fit: 'True to Size · 6ft 1in (Wearing L)',
    colorway: 'Onyx Black',
    reviewTitle: 'Best straight-fit pants I have ever owned in India.',
    reviewText:
      'Normally Indian streetwear brands deliver thin 220 GSM cotton that sags after a single gentle wash. These VALJONS sweatpants are a completely different animal. The 280 GSM PC fleece has genuine structure, and the straight leg stacks over my Jordan 4s with zero bunching.',
    date: '2 days ago',
    helpfulCount: 24,
  },
  {
    id: 'rev-2',
    name: 'Rohan Deshmukh',
    city: 'Bengaluru',
    rating: 5,
    fit: 'True to Size · 5ft 10in (Wearing M)',
    colorway: 'Heather Melange / Oat',
    reviewTitle: 'The Heather Oat colourway is incredible in person.',
    reviewText:
      'Got the Heather Melange tone. The fabric handfeel is super plush inside with zero lint sticking to my white socks. The encased waistband drawstrings have actual metal hardware instead of cheap plastic caps. Worth every single rupee.',
    date: '1 week ago',
    helpfulCount: 19,
  },
  {
    id: 'rev-3',
    name: 'Arjun Sen',
    city: 'Delhi NCR',
    rating: 5,
    fit: 'Relaxed Fit · 5ft 9in (Wearing M)',
    colorway: 'Vintage Pine / Olive',
    reviewTitle: 'The drape and weight are truly next level.',
    reviewText:
      'Was hesitant because many brands talk about 280 GSM but deliver lightweight terry. When you pull these out of the box, you immediately feel the density. Walked around in Delhi winter all evening and stayed perfectly warm without overheating.',
    date: '2 weeks ago',
    helpfulCount: 14,
  },
  {
    id: 'rev-4',
    name: 'Sameer Verma',
    city: 'Pune',
    rating: 5,
    fit: 'Oversized Drape · 6ft 0in (Wearing XL)',
    colorway: 'Onyx Black',
    reviewTitle: 'Architectural silhouette, matches international standards.',
    reviewText:
      'I usually order from Represent or Cole Buxton overseas. Finding this level of pattern grading, double-needle seam reinforcement, and heavy ribbed hems from an Indian brand is remarkable. Ordering another pair right now.',
    date: '3 weeks ago',
    helpfulCount: 31,
  },
];

interface CustomerReviewsSectionProps {
  productTitle?: string;
}

export default function CustomerReviewsSection({ productTitle }: CustomerReviewsSectionProps) {
  const { addToast } = useStore();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'onyx' | 'oat'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulGiven, setHelpfulGiven] = useState<Record<string, boolean>>({});

  // Form state
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formColorway, setFormColorway] = useState('Onyx Black');
  const [formFit, setFormFit] = useState('True to Size');
  const [formTitle, setFormTitle] = useState('');
  const [formText, setFormText] = useState('');

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5star') return r.rating === 5;
    if (activeFilter === 'onyx') return r.colorway.includes('Onyx');
    if (activeFilter === 'oat') return r.colorway.includes('Oat') || r.colorway.includes('Melange');
    return true;
  });

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const handleHelpful = (id: string) => {
    if (helpfulGiven[id]) return;
    setHelpfulGiven((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    addToast('Thanks for your feedback!');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formText.trim()) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      city: formCity.trim() || 'Verified Buyer',
      rating: formRating,
      fit: formFit,
      colorway: formColorway,
      reviewTitle: formTitle.trim(),
      reviewText: formText.trim(),
      date: 'Just now',
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    addToast('Your verified review was published! Thank you.', 'success');

    // Reset form
    setFormName('');
    setFormCity('');
    setFormTitle('');
    setFormText('');
    setFormRating(5);
  };

  return (
    <section id="customer-reviews" className="w-full py-14 sm:py-24 bg-[#FAF9F7] text-black border-t border-neutral-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-200/60 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified Community Feedback
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-poppins">
              {productTitle ? 'CUSTOMER REVIEWS' : 'COMMUNITY REVIEWS'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-lg">
              Honest impressions from owners across India wearing the 280 GSM PC Fleece silhouettes.
            </p>
          </div>

          {/* Rating Summary Card & Write Review Action */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-3xl font-black font-poppins text-black">{averageRating}</div>
              <div>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                  Based on {reviews.length + 180} verified buyers
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-extrabold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all shadow-md cursor-pointer hover:shadow-lg active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-neutral-200/70 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Reviews' },
            { id: '5star', label: '5-Star Ratings' },
            { id: 'onyx', label: 'Onyx Black' },
            { id: 'oat', label: 'Heather Oat' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-poppins font-bold text-sm text-black">{r.name}</h4>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                    </div>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {r.city} · Verified Owner
                    </p>
                  </div>

                  <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
                    {r.date}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center text-amber-500">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h5 className="font-poppins font-bold text-sm text-black leading-snug">
                    &ldquo;{r.reviewTitle}&rdquo;
                  </h5>
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-montserrat">
                    {r.reviewText}
                  </p>
                </div>
              </div>

              {/* Footer info & helpful button */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <div className="space-y-0.5">
                  <span className="font-bold text-neutral-900 block">
                    {r.colorway}
                  </span>
                  <span className="text-[10px] text-neutral-500">{r.fit}</span>
                </div>

                <button
                  onClick={() => handleHelpful(r.id)}
                  disabled={helpfulGiven[r.id]}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                    helpfulGiven[r.id]
                      ? 'bg-neutral-100 text-neutral-800'
                      : 'hover:bg-neutral-100 text-neutral-600 hover:text-black'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({r.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight font-poppins text-black">
                  Write a Verified Review
                </h3>
                <p className="text-xs text-neutral-500">
                  Share your sizing, fabric feel, and silhouette feedback.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-montserrat">
              {/* Star Rating Selector */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormRating(star)}
                      onMouseEnter={() => setFormHoverRating(star)}
                      onMouseLeave={() => setFormHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (formHoverRating || formRating) >= star
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-neutral-800 text-xs">
                    {formRating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Delhi"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Colorway & Fit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                    Colorway
                  </label>
                  <select
                    value={formColorway}
                    onChange={(e) => setFormColorway(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:border-black focus:outline-none"
                  >
                    <option value="Onyx Black">Onyx Black</option>
                    <option value="Heather Melange / Oat">Heather Melange / Oat</option>
                    <option value="Vintage Pine / Olive">Vintage Pine / Olive</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                    Fit Experience
                  </label>
                  <select
                    value={formFit}
                    onChange={(e) => setFormFit(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:border-black focus:outline-none"
                  >
                    <option value="True to Size">True to Size</option>
                    <option value="Relaxed / Oversized Drape">Relaxed / Oversized Drape</option>
                    <option value="Runs Slightly Large">Runs Slightly Large</option>
                    <option value="Runs Slightly Small">Runs Slightly Small</option>
                  </select>
                </div>
              </div>

              {/* Review Title */}
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                  Headline / Summary *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incredible fabric weight, stacks perfectly"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none"
                />
              </div>

              {/* Review Text */}
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                  Detailed Review *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell others about the heavyweight cotton handfeel, sizing, and styling..."
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:border-black focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-md font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

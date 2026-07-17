import React from 'react';
import Image from 'next/image';

export default function StitchForYou() {
  return (
    <div className="bg-brand-warmWhite min-h-screen pt-[120px] pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl tracking-[0.1em] text-brand-charcoal mb-4">Stitch For You</h1>
          <p className="text-[13px] tracking-widest uppercase opacity-70 mb-8">Custom Tailoring Experience</p>
          <div className="w-12 h-[1px] bg-brand-charcoal mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[3/4] bg-brand-sand/30 relative flex items-center justify-center">
            {/* Placeholder for an image */}
            <p className="text-[11px] uppercase tracking-widest opacity-50">Image Placeholder</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl tracking-[0.05em] mb-6">Perfect Fit, Every Time.</h2>
            <p className="text-sm opacity-80 leading-relaxed mb-8">
              At Label_234, we believe that luxury is in the fit. Our exclusive "Stitch For You" service ensures that the premium fabrics you select are crafted to your exact measurements, providing a silhouette that flatters and empowers.
            </p>
            
            <h3 className="text-[12px] uppercase tracking-widest font-semibold mb-4">How it works</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex gap-4">
                <span className="font-serif text-lg">01</span>
                <span>Choose your preferred fabric from our curated collections.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-lg">02</span>
                <span>Select a silhouette or provide your own design reference.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-lg">03</span>
                <span>Submit your measurements using our detailed guide.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-lg">04</span>
                <span>Receive your custom-stitched masterpiece at your doorstep.</span>
              </li>
            </ul>

            <button className="mt-10 px-8 py-4 bg-brand-charcoal text-white text-[11px] tracking-widest uppercase hover:bg-brand-charcoal/90 transition-colors">
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

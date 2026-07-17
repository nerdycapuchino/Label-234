import React from 'react';

export default function AboutUs() {
  return (
    <div className="bg-brand-warmWhite min-h-screen pt-[120px] pb-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl tracking-[0.1em] text-brand-charcoal mb-4">About Us</h1>
          <p className="text-[13px] tracking-widest uppercase opacity-70 mb-8">Our Story from Panipat</p>
          <div className="w-12 h-[1px] bg-brand-charcoal mx-auto"></div>
        </div>

        <div className="space-y-8 text-sm opacity-80 leading-relaxed text-center">
          <p>
            Born in the heart of India's textile capital, Panipat, Label_234 is a celebration of fine fabrics and timeless elegance. We bridge the gap between traditional craftsmanship and modern sensibilities, curating collections that resonate with the contemporary Indian woman.
          </p>
          <p>
            Our journey began with a simple belief: the right fabric can transform not just an outfit, but the way you feel. We meticulously source our materials, ensuring each weave, each print, and each hue meets our uncompromising standards of luxury and durability.
          </p>
          <p>
            Beyond selling fabrics, we are dedicated to providing a personalized experience. Our "Stitch For You" service is a testament to our commitment to making you look and feel your best, tailored precisely to your unique measurements.
          </p>
        </div>

        <div className="mt-20 pt-16 border-t border-brand-border text-center">
          <h3 className="font-serif text-2xl tracking-[0.05em] mb-6">Visit Our Boutique</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            Label_234<br />
            Model Town, Panipat,<br />
            Haryana - 132103
          </p>
          <p className="text-sm opacity-80 leading-relaxed mt-4">
            Monday - Saturday: 10:00 AM - 8:00 PM<br />
            Sunday: Closed
          </p>
        </div>
      </div>
    </div>
  );
}

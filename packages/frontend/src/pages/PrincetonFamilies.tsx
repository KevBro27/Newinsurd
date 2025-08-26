import React, { useEffect } from "react";

const PrincetonFamilies: React.FC = () => {
  useEffect(() => {
    document.title = "Life Insurance Princeton NJ - Protect Your Family's Legacy | Kevin Brown Jr Insurance";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Secure your family's financial future with comprehensive life insurance in Princeton, NJ. A-rated carriers, estate planning focus, and $1M+ coverage options. Get instant quotes today.");
    }
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="gradient-bg-princeton text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Protect Your Family's <span className="text-yellow-300">Legacy</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Secure your family's financial future with comprehensive whole life and term life insurance from A-rated carriers. Tailored for Princeton's established families with $1M+ coverage options and estate planning expertise.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://apply.ethos.com/k/kevinbrown" className="cta-button-princeton text-white px-8 py-4 rounded-full text-lg font-semibold hover:text-white inline-block">
                <i className="fas fa-bolt mr-2"></i>Instant Decision
              </a>
              <a href="https://app.back9ins.com/apply/KevinBrown" className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-block">
                <i className="fas fa-calculator mr-2"></i>Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Audio Message Section */}
      <section className="audio-section-bg-princeton py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="audio-player-princeton">
              <h2 className="text-3xl font-bold mb-6 text-center">A Personal Message for Princeton Families</h2>

              <div className="mb-6">
                <audio controls preload="auto" className="audio-princeton">
                  <source src="https://cdn1.genspark.ai/user-upload-image/8/7b4397da-7da4-47c7-b62c-e330213ee48a.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
                <h3 className="text-lg font-semibold mb-4 text-yellow-300">Audio Transcript:</h3>
                <p className="text-white leading-relaxed">
                  "Did you know that 70% of wealthy families lose their wealth by the second generation? If you're a Princeton family, you've worked hard to build something meaningful. But without proper life insurance and estate planning, everything you've built could disappear. The good news? Securing your family's legacy is simpler than you think. Our A-rated carriers offer comprehensive policies designed specifically for families like yours. In just minutes, you can get an instant quote that protects your family's future. Don't wait until it's too late – click the button below and take the first step toward lasting financial security."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Why Princeton Families Choose Us</h2>
            <p className="text-xl text-gray-600 text-center mb-16">Comprehensive protection designed for your family's unique needs</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card-princeton p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <i className="fas fa-shield-alt text-4xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">A-Rated Carriers Only</h3>
                <p className="text-gray-600 leading-relaxed">Partner exclusively with financially strong, highly-rated insurance companies to ensure your family's claims are always paid when they matter most.</p>
              </div>

              <div className="feature-card-princeton p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <i className="fas fa-university text-4xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Estate Planning Focus</h3>
                <p className="text-gray-600 leading-relaxed">Specialized in high-value policies ($1M+) with estate planning integration, perfect for Princeton's established families and business owners.</p>
              </div>

              <div className="feature-card-princeton p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <i className="fas fa-mobile-alt text-4xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Instant Digital Process</h3>
                <p className="text-gray-600 leading-relaxed">Get quotes and apply online in minutes. No lengthy appointments or medical exams for many policies – just smart, efficient coverage.</p>
              </div>

              <div className="feature-card-princeton p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <i className="fas fa-map-marker-alt text-4xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Local Princeton Expertise</h3>
                <p className="text-gray-600 leading-relaxed">Deep understanding of New Jersey estate laws, tax implications, and the unique financial needs of Princeton-area families.</p>
              </div>

              <div className="feature-card-princeton p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <i className="fas fa-concierge-bell text-4xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Personalized Service</h3>
                <p className="text-gray-600 leading-relaxed">White-glove service with dedicated support throughout the process. We're here when you need us, not just when you buy.</p>
              </div>

              <div className="feature-card-princeton p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <i className="fas fa-clock text-4xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Fast Approval</h3>
                <p className="text-gray-600 leading-relaxed">Most policies approved within 24-48 hours. Get the protection you need without the wait – your family's security can't wait.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Trusted by Princeton Families</h2>

            <div className="testimonial-card-princeton p-8 rounded-2xl shadow-lg mb-12">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mb-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                "Kevin helped us secure a $2.5M policy that perfectly integrates with our estate plan. The process was incredibly smooth – we had our coverage approved in just 3 days. As busy professionals, we appreciated the digital approach and expert guidance every step of the way."
              </blockquote>
              <cite className="text-lg font-semibold text-indigo-600">— Sarah and Michael Chen, Princeton 08540</cite>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="trusted-badge-princeton">
                <i className="fas fa-award text-3xl text-indigo-600 mb-3"></i>
                <div className="font-semibold text-gray-900">A+ Rated Carriers</div>
              </div>
              <div className="trusted-badge-princeton">
                <i className="fas fa-certificate text-3xl text-indigo-600 mb-3"></i>
                <div className="font-semibold text-gray-900">Licensed in New Jersey</div>
              </div>
              <div className="trusted-badge-princeton">
                <i className="fas fa-handshake text-3xl text-indigo-600 mb-3"></i>
                <div className="font-semibold text-gray-900">FINRA Registered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 text-center mb-16">Three simple steps to protect your family's future</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="step-number-princeton mx-auto mb-6">1</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Get Your Instant Quote</h3>
                <p className="text-gray-600 leading-relaxed">Answer a few quick questions about your family's needs and financial goals. Get personalized quotes from multiple A-rated carriers in minutes.</p>
              </div>

              <div className="text-center">
                <div className="step-number-princeton mx-auto mb-6">2</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Choose Your Coverage</h3>
                <p className="text-gray-600 leading-relaxed">Review your options with expert guidance. Select the policy that best fits your estate planning needs and family protection goals.</p>
              </div>

              <div className="text-center">
                <div className="step-number-princeton mx-auto mb-6">3</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Secure Your Legacy</h3>
                <p className="text-gray-600 leading-relaxed">Complete your digital application and get approved fast. Your family's financial future is protected, often within days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg-princeton py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Protect Your Family's Future?</h2>
            <p className="text-xl mb-8 text-blue-100">Join hundreds of Princeton families who have secured their legacy with comprehensive life insurance coverage. Get started in less than 5 minutes.</p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://apply.ethos.com/k/kevinbrown" className="cta-button-princeton text-white px-8 py-4 rounded-full text-lg font-semibold hover:text-white inline-block">
                <i className="fas fa-bolt mr-2"></i>Instant Decision
              </a>
              <a href="https://app.back9ins.com/apply/KevinBrown" className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-block">
                <i className="fas fa-calculator mr-2"></i>Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="faq-item-princeton bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">How much life insurance coverage do I need as a Princeton family?</h3>
                <p className="text-gray-600 leading-relaxed">For established families in Princeton, we typically recommend 10-15 times your annual income, with a minimum of $1M coverage. This ensures your family can maintain their lifestyle, pay off mortgages, fund children's education, and handle estate taxes. Our assessment considers your specific financial situation, debts, and future goals.</p>
              </div>

              <div className="faq-item-princeton bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">What's the difference between term life and whole life insurance?</h3>
                <p className="text-gray-600 leading-relaxed">Term life provides temporary coverage at lower premiums, ideal for specific obligations like mortgages or until children are independent. Whole life offers permanent coverage with cash value accumulation, perfect for estate planning and wealth transfer strategies. Many Princeton families use a combination of both.</p>
              </div>

              <div className="faq-item-princeton bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Do I need a medical exam for high-value coverage?</h3>
                <p className="text-gray-600 leading-relaxed">Not always. Many policies up to $1M can be approved with just health questions and digital health records review. For larger amounts ($2M+), a simplified medical exam may be required, but we make the process as convenient as possible, often at your home or office.</p>
              </div>

              <div className="faq-item-princeton bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">How does life insurance fit into my estate planning?</h3>
                <p className="text-gray-600 leading-relaxed">Life insurance is crucial for estate planning in New Jersey. It provides liquidity to pay estate taxes, equalizes inheritance among children, and can fund trusts. We work closely with your estate attorney and financial advisor to ensure your coverage integrates seamlessly with your overall wealth transfer strategy.</p>
              </div>

              <div className="faq-item-princeton bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gray-900">What makes your service different from other Princeton insurance agents?</h3>
                <p className="text-gray-600 leading-relaxed">We specialize exclusively in families and offer a unique combination of digital efficiency and personalized service. Our platform provides instant quotes from multiple A-rated carriers, while our expertise ensures you get coverage that truly fits your sophisticated financial needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2">
                <h3 className="text-2xl font-bold mb-4">Kevin Brown Jr Insurance</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">Protecting Princeton families with comprehensive life insurance solutions. Licensed in New Jersey with access to A-rated carriers nationwide.</p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/kevin-brown-jr-insurance" className="text-gray-300 hover:text-white transition-colors duration-300">
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a href="https://www.kevinbrownjrinsurance.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                    <i className="fas fa-globe text-2xl"></i>
                  </a>
                  <a href="https://calendly.com/kevinbrown-jr" className="text-gray-300 hover:text-white transition-colors duration-300">
                    <i className="fas fa-calendar text-2xl"></i>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="https://apply.ethos.com/k/kevinbrown" className="text-gray-300 hover:text-white transition-colors duration-300">Instant Decision</a></li>
                  <li><a href="https://app.back9ins.com/apply/KevinBrown" className="text-gray-300 hover:text-white transition-colors duration-300">Custom Quote</a></li>
                  <li><a href="https://www.kevinbrownjrinsurance.com" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
                  <li><a href="https://calendly.com/kevinbrown-jr" className="text-gray-300 hover:text-white transition-colors duration-300">Schedule Consultation</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><i className="fas fa-phone mr-2"></i>Call for Quote</li>
                  <li><i className="fas fa-envelope mr-2"></i><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="452e20332c2b052e20332c2b27372a322b2f372c2b363037242b26206b262a28">[email&#160;protected]</a></li>
                  <li><i className="fas fa-map-marker-alt mr-2"></i>Princeton, NJ Area</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 Kevin Brown Jr Insurance. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <a href="https://www.kevinbrownjrinsurance.com/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                  <a href="https://www.kevinbrownjrinsurance.com/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500 leading-relaxed">
                Licensed in New Jersey. Insurance products offered through licensed agents and brokers. Policy benefits, features, and availability vary by carrier and state. This material is for informational purposes only and is not intended as tax, legal, or investment advice. Consult with qualified professionals for guidance specific to your situation.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrincetonFamilies;

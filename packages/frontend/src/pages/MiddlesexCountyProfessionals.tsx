import React, { useEffect } from "react";

const MiddlesexCountyProfessionals: React.FC = () => {
  useEffect(() => {
    document.title = "Life Insurance for Middlesex County Professionals - Fast, Digital, Affordable | Kevin Brown Jr Insurance";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get instant life insurance quotes for professionals in Edison, Piscataway, New Brunswick. Designed for busy tech workers, healthcare professionals, and growing families in Middlesex County, NJ.");
    }

    const script = document.createElement('script');
    script.innerHTML = `
      function scrollToAudio() {
          document.getElementById('audio-section').scrollIntoView({
              behavior: 'smooth',
              block: 'center'
          });
      }
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient-middlesex text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⚡ Digital-First Insurance for Middlesex County Professionals
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Life Insurance That Fits Your
            <span className="text-orange-400"> Busy Schedule</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Designed for tech professionals, healthcare workers, and growing families in Edison, Piscataway, and New Brunswick. Get covered in minutes, not weeks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="https://kevinbrownjrinsurance.com/#/quote-and-apply" target="_blank" className="btn-primary-middlesex text-white px-8 py-4 rounded-lg text-lg font-semibold pulse-glow-middlesex no-underline">
              <i className="fas fa-rocket mr-2"></i>
              Get My Quote & Apply
            </a>
            <a href="https://app.ethoslife.com/partner/cca97/q/goals" target="_blank" className="btn-instant-middlesex text-white px-8 py-4 rounded-lg text-lg font-semibold no-underline">
              <i className="fas fa-bolt mr-2"></i>
              Instant Decision
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-400">2 Minutes</div>
              <div className="text-blue-100">Average Application</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">$25/month</div>
              <div className="text-blue-100">Starting Coverage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">A+ Rated</div>
              <div className="text-blue-100">Insurance Carriers</div>
            </div>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="w-64 h-64 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
            <i className="fas fa-shield-alt text-6xl text-orange-400"></i>
          </div>
        </div>
      </section>

      {/* Audio Pod Section */}
      <section id="audio-section" className="audio-section-middlesex py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto audio-player-middlesex">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              <i className="fas fa-headphones text-orange-500 mr-3"></i>
              A Personal Message for Middlesex County Professionals
              <span className="text-lg font-normal text-gray-600 block mt-2">(1 minute, 15 seconds)</span>
            </h2>

            <div className="mb-6">
              <audio controls className="w-full" style={{ borderRadius: '10px' }}>
                <source src="https://cdn1.genspark.ai/user-upload-image/1/7b2a47c8-c795-4e14-bfaf-b2099fbbea40.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <i className="fas fa-file-alt mr-2 text-orange-500"></i>
                Audio Transcript:
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                "Hey! If you're a professional living in Middlesex County - whether you're commuting to Princeton, working in Edison's corporate parks, or building your career in New Brunswick - I know your time is precious. You're juggling a demanding career, maybe supporting aging parents, planning for a family, or paying down that mortgage in one of New Jersey's most expensive counties. The last thing you want is to spend hours filling out insurance paperwork or sitting in someone's office. That's why I've created a completely digital life insurance experience designed specifically for busy Middlesex County professionals. Get quotes from A-rated carriers in under 2 minutes on your phone. No medical exams for most healthy applicants under 45. No confusing jargon. Whether you're first-generation American building wealth for your extended family, or established in your career looking to optimize your coverage, I understand the unique financial responsibilities of our diverse community. Your family's financial security is too important to put off. Click below for your instant quote, or schedule a quick call that fits your schedule. Let's protect what matters most to you."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Built for Middlesex County's Diverse Professional Community
            </h2>
            <p className="text-xl text-gray-600">We understand the unique needs of tech workers, healthcare professionals, and multicultural families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover-middlesex transition-transform">
              <div className="text-blue-500 text-3xl mb-4">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Digital-First Experience</h3>
              <p className="text-gray-600">Complete applications on your phone during your Princeton commute. No paperwork, no waiting rooms.</p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• Mobile-optimized applications</li>
                <li>• E-signatures accepted</li>
                <li>• Real-time status updates</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 card-hover-middlesex transition-transform">
              <div className="text-green-500 text-3xl mb-4">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Competitive Rates</h3>
              <p className="text-gray-600">Affordable coverage that fits Middlesex County budgets, from recent grads to established professionals.</p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• No hidden fees</li>
                <li>• Multiple carrier options</li>
                <li>• Rate locks available</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 card-hover-middlesex transition-transform">
              <div className="text-purple-500 text-3xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Culturally Informed Service</h3>
              <p className="text-gray-600">Understanding of multicultural family structures and financial planning needs in our diverse community.</p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• Multilingual support available</li>
                <li>• Cultural sensitivity training</li>
                <li>• Extended family considerations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Builders Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Middlesex County Professionals</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="trust-badge-middlesex bg-white rounded-lg p-6 text-center">
              <div className="text-blue-600 text-2xl mb-2">
                <i className="fas fa-award"></i>
              </div>
              <div className="font-semibold text-gray-800">A.M. Best A+</div>
              <div className="text-sm text-gray-600">Rated Carriers</div>
            </div>

            <div className="trust-badge-middlesex bg-white rounded-lg p-6 text-center">
              <div className="text-green-600 text-2xl mb-2">
                <i className="fas fa-shield-check"></i>
              </div>
              <div className="font-semibold text-gray-800">NJ Licensed</div>
              <div className="text-sm text-gray-600">State Regulated</div>
            </div>

            <div className="trust-badge-middlesex bg-white rounded-lg p-6 text-center">
              <div className="text-purple-600 text-2xl mb-2">
                <i className="fas fa-clock"></i>
              </div>
              <div className="font-semibold text-gray-800">24/7 Support</div>
              <div className="text-sm text-gray-600">Always Available</div>
            </div>

            <div className="trust-badge-middlesex bg-white rounded-lg p-6 text-center">
              <div className="text-orange-600 text-2xl mb-2">
                <i className="fas fa-star"></i>
              </div>
              <div className="font-semibold text-gray-800">4.9/5 Rating</div>
              <div className="text-sm text-gray-600">Customer Reviews</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                SP
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-lg mb-4 italic">
                  "As a software engineer in Edison with aging parents and a new mortgage, I needed coverage quickly. Kevin's team understood my situation and got me approved in two days. The digital process was perfect for my busy schedule."
                </p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">Sameer Patel</div>
                  <div className="text-gray-600">Software Engineer, Edison, NJ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get Covered in 3 Simple Steps</h2>
            <p className="text-xl text-gray-600">Designed for busy professionals who value efficiency</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Assessment</h3>
              <p className="text-gray-600">Answer a few questions about your family, career, and coverage needs. Takes less than 2 minutes on your phone.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Compare & Choose</h3>
              <p className="text-gray-600">See personalized quotes from A-rated carriers. Choose the coverage that fits your budget and family goals.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Get Protected</h3>
              <p className="text-gray-600">Complete your application digitally. Many applicants get approved and covered within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Protect What Matters Most?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of Middlesex County professionals who've secured their family's future with us
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://kevinbrownjrinsurance.com/#/quote-and-apply" target="_blank" className="btn-primary-middlesex text-white px-8 py-4 rounded-lg text-lg font-semibold no-underline">
              <i className="fas fa-calculator mr-2"></i>
              Get My Free Quote Now
            </a>
            <a href="https://calendly.com/kevin-kevinbrownjrinsurance/30min?month=2025-08" target="_blank" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all no-underline">
              <i className="fas fa-phone mr-2"></i>
              Schedule Quick Call
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Common Questions from Middlesex County Professionals</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <i className="fas fa-question-circle text-blue-500 mr-2"></i>
                Do I need a medical exam for coverage?
              </h3>
              <p className="text-gray-600">Most of our healthy applicants under 45 qualify for simplified issue policies with no medical exam required. Just answer health questions online.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <i className="fas fa-question-circle text-blue-500 mr-2"></i>
                How much coverage do I need as a Middlesex County professional?
              </h3>
              <p className="text-gray-600">Generally 10-12x your annual income. For someone earning $100k in Edison or Piscataway, we typically recommend $1M+ to cover mortgage, family expenses, and future goals.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <i className="fas fa-question-circle text-blue-500 mr-2"></i>
                Can I apply if I'm on a work visa or permanent resident?
              </h3>
              <p className="text-gray-600">Yes! Many of our carriers offer coverage to visa holders and permanent residents. We understand the insurance needs of Middlesex County's diverse professional community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Footer */}
      <section className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Family's Security Starts Today</h2>
          <p className="text-gray-300 mb-8">Don't wait for tomorrow - protect your loved ones now with fast, affordable coverage</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="https://app.ethoslife.com/partner/cca97/q/goals" target="_blank" className="btn-instant-middlesex text-white px-8 py-4 rounded-lg text-lg font-semibold no-underline">
              <i className="fas fa-rocket mr-2"></i>
              Get Instant Decision
            </a>
            <a href="https://calendly.com/kevin-kevinbrownjrinsurance/30min?month=2025-08" target="_blank" className="border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all no-underline">
              <i className="fas fa-calendar mr-2"></i>
              Book Free Consultation
            </a>
          </div>

          <div className="text-sm text-gray-400">
            <p className="mb-4">Kevin Brown Jr. Insurance • Licensed in New Jersey • Serving Middlesex County Professionals</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:908-440-1990" className="hover:text-white transition-colors">📞 908-440-1990</a>
              <a href="mailto:kevin@kevinbrownjrinsurance.com" className="hover:text-white transition-colors">✉️ kevin@kevinbrownjrinsurance.com</a>
              <a href="https://www.linkedin.com/in/kevin-brown-jr/" target="_blank" className="hover:text-white transition-colors flex items-center">
                <i className="fab fa-linkedin mr-2"></i>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiddlesexCountyProfessionals;

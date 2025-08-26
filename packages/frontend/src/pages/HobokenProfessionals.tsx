import React, { useEffect } from "react";

const HobokenProfessionals: React.FC = () => {
  useEffect(() => {
    document.title = "Quick Life Insurance Quotes Hoboken NJ - Fast & Affordable | Kevin Brown Jr Insurance";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get instant life insurance quotes in Hoboken, NJ. Fast, affordable term life coverage for young professionals. A-rated carriers, digital applications, competitive rates.");
    }
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient-hoboken min-h-screen flex items-center">
        <div className="container mx-auto px-6 text-center text-white">
          <div className="fade-in-hoboken">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Life Insurance for<br />
              <span className="text-yellow-300">Hoboken Professionals</span><br />
              Made Simple
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Skip the paperwork, phone calls, and medical exams. Get instant quotes, apply digitally,
              and secure your future in under 10 minutes. A-rated carriers, competitive rates, zero hassle.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <i className="fas fa-star text-yellow-300 mb-2"></i>
                <div className="font-semibold">A+ Rated Carriers Only</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <i className="fas fa-bolt text-yellow-300 mb-2"></i>
                <div className="font-semibold">Instant Decisions</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <i className="fas fa-mobile-alt text-yellow-300 mb-2"></i>
                <div className="font-semibold">100% Digital Process</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://app.back9ins.com/apply/KevinBrown"
                 className="btn-primary-hoboken text-white px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center pulse-animation-hoboken">
                <i className="fas fa-rocket mr-3"></i>
                Get Quote & Apply Now
              </a>

              <a href="https://app.ethoslife.com/partner/cca97/q/goals"
                 className="btn-secondary-hoboken text-white px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center">
                <i className="fas fa-clock mr-3"></i>
                Instant Decision
              </a>
            </div>

            <p className="text-sm opacity-75">
              <i className="fas fa-map-marker-alt mr-2"></i>
              Serving Hoboken, NJ 07030 and surrounding Hudson County
            </p>
          </div>
        </div>
      </section>

      {/* Audio/Podcast Section */}
      <section className="audio-section-hoboken py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto audio-player-hoboken">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Why Hoboken Professionals Choose Us
              <span className="text-lg font-normal text-gray-600 block mt-2">(30 seconds)</span>
            </h2>

            <div className="mb-6">
              <audio controls className="w-full" style={{borderRadius: '10px'}}>
                <source src="https://cdn1.genspark.ai/user-upload-image/8/82b1902b-9666-4544-9560-ef7f182e9cd1.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <i className="fas fa-file-alt mr-2 text-blue-500"></i>
                Audio Transcript:
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                "Here's something that might surprise you: 73% of young professionals in Hoboken have zero life insurance coverage, yet most spend more on coffee than they would on a $500,000 policy. I've helped hundreds of busy professionals right here in Hudson County get covered without the traditional headaches. No medical exams for most applicants, no pushy sales calls, and no endless paperwork. Our digital platform gives you instant quotes from A-rated carriers, and you can apply from your phone during your PATH commute. It takes less time than your lunch break, and costs less than your Netflix subscription. Ready to check this off your adulting list? Click the button below and see how affordable peace of mind really is."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Young Professionals Love Our Process
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card-hoboken p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-bolt text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Get quotes in 30 seconds, apply in 2 minutes. No waiting weeks for approval decisions.
              </p>
            </div>

            <div className="feature-card-hoboken p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-dollar-sign text-3xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Surprisingly Affordable</h3>
              <p className="text-gray-600 leading-relaxed">
                $500K coverage often under $30/month for healthy 30-year-olds. Less than your gym membership.
              </p>
            </div>

            <div className="feature-card-hoboken p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-mobile-alt text-3xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">100% Digital</h3>
              <p className="text-gray-600 leading-relaxed">
                Apply from anywhere, anytime. No office visits, no paper forms, no medical exams for most applicants.
              </p>
            </div>

            <div className="feature-card-hoboken p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-star text-3xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">A+ Rated Carriers</h3>
              <p className="text-gray-600 leading-relaxed">
                Only top-rated insurance companies. Your coverage is backed by financially strong insurers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Trusted by Hudson County Professionals
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="testimonial-card-hoboken p-8 rounded-xl shadow-lg mb-12">
              <div className="flex items-start">
                <i className="fas fa-quote-left text-4xl text-blue-500 mr-6 mt-2"></i>
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    "I kept putting off getting life insurance because I thought it would be this huge hassle. Kevin's platform made it so easy - I literally applied during my lunch break and got approved the same day. As a software engineer, I appreciated how streamlined and tech-forward the whole process was."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Sarah Martinez</div>
                      <div className="text-gray-600">Software Engineer, Jersey City</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="stats-number-hoboken text-4xl font-bold mb-2">500+</div>
                <div className="text-gray-600 font-medium">Local Professionals Covered</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="stats-number-hoboken text-4xl font-bold mb-2">2.5 min</div>
                <div className="text-gray-600 font-medium">Average Application Time</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="stats-number-hoboken text-4xl font-bold mb-2">98%</div>
                <div className="text-gray-600 font-medium">Customer Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            How It Works <span className="text-2xl font-normal text-gray-600">(3 Simple Steps)</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Get Your Quote</h3>
              <p className="text-gray-600 leading-relaxed">
                Answer a few quick questions about your health, lifestyle, and coverage needs. Takes 30 seconds, no personal info required yet.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Apply Online</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your application on your phone or computer. Most healthy applicants skip the medical exam entirely.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Get Covered</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive instant decision or approval within 24-48 hours. Your coverage begins immediately upon approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient-hoboken py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Covered?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join hundreds of Hoboken professionals who've secured their future in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="https://app.back9ins.com/apply/KevinBrown"
               className="btn-primary-hoboken text-white px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center pulse-animation-hoboken">
              <i className="fas fa-rocket mr-3"></i>
              Get Quote & Apply Now
            </a>

            <a href="https://calendly.com/kevin-kevinbrownjrinsurance/30min"
               className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center hover:bg-gray-100 transition-all duration-300">
              <i className="fas fa-calendar mr-3"></i>
              Schedule Free Consultation
            </a>
          </div>

          <p className="text-sm text-white opacity-75">
            <i className="fas fa-lock mr-2"></i>
            Your information is secure and never shared with third parties
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-question-circle text-blue-500 mr-3"></i>
                How much life insurance do I actually need?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A good rule of thumb is 10-12 times your annual income. So if you make $75K, consider $750K-$900K in coverage. This ensures your family can maintain their lifestyle and pay off major debts like student loans or a future mortgage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-stethoscope text-blue-500 mr-3"></i>
                Do I really need a medical exam?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Most healthy applicants under 40 can get up to $1 million in coverage without a medical exam. We use accelerated underwriting that relies on your health questionnaire and existing medical records, making the process much faster.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-chart-line text-blue-500 mr-3"></i>
                What's the difference between term and whole life insurance?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Term life is temporary coverage (10-30 years) that's much more affordable - perfect for young professionals with mortgages, families, or debt. Whole life is permanent but costs 10-20 times more. Most financial experts recommend term life for people in their 20s and 30s.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-clock text-blue-500 mr-3"></i>
                How quickly can I get approved?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With our accelerated underwriting process, many healthy applicants receive instant decisions or approval within 24-48 hours. Traditional applications can take 4-8 weeks, but our digital process eliminates most of that waiting time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-piggy-bank text-blue-500 mr-3"></i>
                Is it cheaper to buy life insurance when I'm young?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! Life insurance rates are based on your age and health when you apply. A healthy 25-year-old might pay $20/month for $500K coverage, while the same person at 35 could pay $30-40/month. Locking in your rate early saves money for the entire term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Kevin Brown Jr Insurance Platform</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Licensed Insurance Producer in New Jersey and New York. All quotes are subject to underwriting approval. Coverage and rates vary by carrier, age, health, and other factors.
              </p>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <p className="text-sm text-gray-400 leading-relaxed">
                This platform provides quotes from multiple A-rated life insurance carriers. We are compensated by insurance companies but this does not affect your rates or coverage options. Individual results may vary.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HobokenProfessionals;

import Header from '@/components/custom/header'
import { UserButton } from '@clerk/clerk-react'
import { Brain, FileText, Sparkles, Zap, ChevronRight, Check, Code, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className=' bg-gradient-to-r from-blue-400 to-blue-100 w-full h-screen '>
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-900">
        <Header />
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-zinc-900/80 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm">AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-blue-400 text-transparent bg-clip-text">
              Create Your Perfect Resume
              <br />With AI Intelligence
            </h1>
            <p className="text-gray-300 text-xl mb-12 max-w-3xl mx-auto">
              Transform your career story into a compelling resume using advanced AI.
              Stand out from the crowd with professionally crafted resumes in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={'/dashboard'}>
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center group transition transform hover:scale-105">
                  Build Your Resume
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
                </button>
              </Link>

            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
                <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI Writing Assistant</h3>
                <p className="text-gray-300">
                  Let AI help you craft compelling descriptions and highlight your achievements effectively.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
                <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Templates</h3>
                <p className="text-gray-300">
                  Choose from dozens of ATS-optimized templates designed for your industry.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
                <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Skill Analysis</h3>
                <p className="text-gray-300">
                  AI-powered skill suggestions and job market analysis to make your resume stand out.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black/50 to-transparent" id="about">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Revolutionizing Resume Creation</h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                At ResumeCraft, we're combining cutting-edge artificial intelligence to transform how people present themselves professionally.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mb-20">
              <div className="text-center">
                <div className="bg-blue-500/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Technology</h3>
                <p className="text-gray-300">
                  Built on state-of-the-art language models and machine learning algorithms to understand and enhance your professional experience.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Expert Team</h3>
                <p className="text-gray-300">
                  Crafted by a dedicated professional with expertise in AI, HR, and career development.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Global Impact</h3>
                <p className="text-gray-300">
                  Helping job seekers land their dream jobs with AI-optimized resumes.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-zinc-900 to-black p-8 md:p-12 rounded-2xl border border-gray-800">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-300 mb-6">
                    We believe everyone deserves a chance to showcase their best professional self. Our mission is to democratize
                    access to high-quality resume creation and career advancement tools through artificial intelligence.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Empowering job seekers with AI technology',
                      'Reducing bias in the hiring process',
                      'Making professional tools accessible to all'
                    ].map((item) => (
                      <li key={item} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer section */}
        <footer className="py-12 px-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Brain className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                  ResumeCraft
                </span>
              </div>
              <div className="text-gray-400 text-sm">
                © 2025 ResumeCraft. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home

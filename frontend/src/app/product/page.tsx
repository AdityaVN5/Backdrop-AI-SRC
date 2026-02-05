'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Play, 
  Settings, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Gamepad2, 
  Search, 
  Smartphone,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function ProductPage() {
  const handleTryNow = () => {
    window.location.href = '/';
  };

  const handleWatchDemo = () => {
    window.open('https://drive.google.com/file/d/179cPbOR6wIf4sscsOP_GtdWjSzavqeAY/view?usp=drive_link', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-backdrop-text bg-white selection:bg-black selection:text-white">
      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          
          {/* Hero Section */}
          <section className="max-w-4xl mx-auto mb-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
              Professional Video Background Removal
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
              Remove backgrounds, replace green screens, and create stunning video compositions, all powered by AI. No subscriptions, no watermarks, just results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" className="h-14 px-10 text-base font-bold uppercase tracking-widest" onClick={handleTryNow}>
                Try It Free
              </Button>
              <Button variant="secondary" className="h-14 px-10 text-base font-bold uppercase tracking-widest flex items-center gap-2" onClick={handleWatchDemo}>
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </Button>
            </div>
          </section>

          {/* About Section */}
          <section className="max-w-4xl mx-auto mb-32 bg-gray-50 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-black/5 rounded-full" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold tracking-tight mb-8">What is Backdrop AI?</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Backdrop AI is an open-source video compositing tool that uses state-of-the-art AI to remove backgrounds from videos in seconds. Whether you're a content creator, filmmaker, or researcher, our tool gives you professional-grade results without the complexity of traditional video editing software.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: Users, label: "Content Creators" },
                  { icon: GraduationCap, label: "Educators" },
                  { icon: Briefcase, label: "Professionals" },
                  { icon: Gamepad2, label: "Gamers" },
                  { icon: Search, label: "Researchers" },
                  { icon: Layers, label: "Filmmakers" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-32">
            <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">Engineered for Precision</h2>
            <div className="max-w-3xl mx-auto">
              {[
                {
                  title: "Precise AI Segmentation",
                  desc: "Our BiRefNet-powered engine detects subjects with exceptional accuracy, handling complex hair, transparent objects, and motion blur.",
                  icon: Layers,
                  list: ["Complex hair and fur", "Transparent objects", "Motion blur", "Varying lighting"]
                }
              ].map((feature, i) => (
                <div key={i} className="p-10 border border-gray-100 rounded-[2rem] hover:border-black transition-all hover:shadow-xl group bg-white">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">{feature.desc}</p>
                  <ul className="space-y-3">
                    {feature.list.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Background Modes */}
          <section className="mb-32 max-w-5xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight mb-4">Unlimited Creative Control</h2>
                <p className="text-gray-500">Choose the perfect mode for your production pipeline.</p>
             </div>
             
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Transparent", desc: "WebM (VP9) export for pro editors", icon: ShieldCheck },
                  { title: "Green Screen", desc: "Instant chroma key replacement", icon: Layers },
                  { title: "Custom", desc: "Solid colors, images, or blur", icon: Settings },
                  { title: "Preview", desc: "Side-by-side original vs. masks", icon: Play }
                ].map((mode, i) => (
                  <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 hover:bg-white transition-all text-center">
                    <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center text-black">
                       <mode.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold mb-2">{mode.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{mode.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* How It Works */}
          <section className="mb-32 max-w-4xl mx-auto">
             <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">How It Works</h2>
             <div className="space-y-4">
                {[
                  { step: "01", title: "Upload Your Video", desc: "Drag and drop MP4, MOV, or WebM files up to 10 minutes long." },
                  { step: "02", title: "AI Processing", desc: "Our model analyzes each frame for semantic segmentation and temporal consistency." },
                  { step: "03", title: "Customize & Export", desc: "Choose your background, preview in real-time, and download lossless results." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 p-8 rounded-3xl hover:bg-gray-50 transition-colors group">
                    <div className="text-4xl font-black text-gray-100 group-hover:text-black transition-colors shrink-0 leading-none">{step.step}</div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                       <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </section>


          {/* Integrations */}
          <section className="mb-32 max-w-xl mx-auto text-center">
             <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
                <Smartphone className="w-6 h-6" />
                Integrations
             </h3>
             <div className="flex flex-wrap justify-center gap-2">
                 {["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro", "OBS Studio", "YouTube", "TikTok", "Instagram"].map((tag, i) => (
                   <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-500">{tag}</span>
                 ))}
             </div>
             <div className="mt-8">
                <p className="text-sm text-gray-500 leading-relaxed italic">
                  "Export directly to any major video editor with lossless alpha channel support."
                </p>
             </div>
          </section>

          {/* FAQ */}
          <section className="mb-32 max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
             <div className="space-y-4">
                {[
                  { q: "How accurate is the background removal?", a: "Our BiRefNet model achieves 89% mIoU on standard benchmarks, outperforming most consumer tools. Quality depends on clarity and lighting." },
                  { q: "Can it handle multiple people?", a: "Yes, optimally for 1-3 subjects. The model treats all foreground subjects as one coherent group." },
                  { q: "What about copyright on output videos?", a: "You retain full rights to processed videos. Our AI does not train on your content." },
                  { q: "Do you support audio?", a: "Audio is preserved in MP4 exports. WebM exports are video-only, intended for professional compositing." }
                ].map((faq, i) => (
                  <div key={i} className="p-6 border border-gray-100 rounded-2xl bg-white">
                    <h4 className="font-bold flex items-center gap-2 mb-3">
                       <Plus className="w-4 h-4 text-gray-300" />
                       {faq.q}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed pl-6">{faq.a}</p>
                  </div>
                ))}
             </div>
          </section>

        </div>

        {/* Final CTA */}
        <section className="bg-black py-32 relative overflow-hidden">
           {/* Visual Flourish */}
           <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-backdrop-blue/30 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-backdrop-red/30 rounded-full blur-[120px]" />
           </div>
           
           <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8">
                Ready to transform <br/> your video production?
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                No signup required. Start removing backgrounds in seconds with our professional-grade AI engine.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Button variant="white" className="h-14 px-12 text-base font-bold uppercase tracking-widest" onClick={handleTryNow}>
                    Start Free
                 </Button>
                 <Button variant="ghost" className="text-white hover:bg-white/10 px-8 py-4 flex items-center gap-2" onClick={() => window.open('https://github.com/AdityaVN5/Backdrop-AI-SRC', '_blank')}>
                    View Documentation <ChevronRight className="w-4 h-4" />
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100">
         <div className="container mx-auto px-6 flex flex-col md:row items-center justify-between gap-6">
            <div className="flex items-center gap-1">
               <span className="font-black text-xl tracking-tighter">backdrop ai</span>
               <span className="text-[10px] text-gray-400 font-medium ml-2 uppercase tracking-widest">© 2026 RESEARCH-DRIVEN</span>
            </div>
            <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
               <a href="/" className="hover:text-black transition-colors">Product</a>
               <a href="/research" className="hover:text-black transition-colors">Research</a>
               <a href="https://github.com/AdityaVN5/Backdrop-AI-SRC" className="hover:text-black transition-colors">GitHub</a>
            </div>
         </div>
      </footer>
    </div>
  );
}

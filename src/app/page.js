"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (response.ok) { setResult(data); } 
      else { setError(data.error); }
    } catch (err) { setError("Gagal terhubung ke server"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-800 dark:text-gray-200 min-h-screen flex flex-col transition-colors duration-300">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      
      {/* Navbar */}
      <nav className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-primary text-3xl">cloud_download</span>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">TikSaver</span>
          </div>
          <button onClick={() => document.documentElement.classList.toggle('dark')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-icons-round text-xl text-gray-400">dark_mode</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
               <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-primary"></span></span>
               Fast & Free TikTok Downloader
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white text-gray-900">
              Download TikTok Videos <br/>
              <span className="text-primary">Without Watermark</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm md:text-base">Masukkan URL video TikTok di bawah ini untuk mengunduh video berkualitas tinggi secara gratis.</p>
          </div>

          {/* Search Box */}
          <div className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl dark:border dark:border-gray-800 p-2 sm:p-3 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons-round text-gray-400">link</span>
              </div>
              <input 
                className="block w-full pl-10 pr-4 py-4 rounded-xl border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-0 outline-none"
                placeholder="Paste link TikTok here..."
                value={url} onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button onClick={handleDownload} disabled={loading} className="bg-primary hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50">
              <span>{loading ? "Memproses..." : "Dapatkan Link"}</span>
              <span className="material-icons-round">arrow_forward</span>
            </button>
          </div>

          {/* Error */}
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-3 rounded-xl">{error}</div>}

          {/* Result Card */}
          {result && (
            <div className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-green-500/10 px-6 py-3 flex items-center gap-2 border-b border-green-500/10">
                <span className="material-icons-round text-green-500 text-sm">check_circle</span>
                <span className="text-green-600 dark:text-green-400 font-bold text-xs uppercase">Video Found! Ready to download</span>
              </div>
              <div className="p-6 md:flex gap-8 items-center">
                <div className="w-40 aspect-[9/16] rounded-lg overflow-hidden shadow-lg flex-shrink-0 mx-auto md:mx-0">
                  <img src={result.cover} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow mt-6 md:mt-0 text-center md:text-left">
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-1">{result.title}</h3>
                  <p className="text-gray-500 text-sm mb-6">@{result.author}</p>
                  <a href={result.videoUrl} target="_blank" className="inline-flex items-center justify-center gap-2 bg-primary text-white w-full py-4 rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all">
                    <span className="material-icons-round">download</span> Download Video
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 w-full">
            <Feature icon="water_drop" title="No Watermark" desc="Clean videos without logo." color="text-blue-500" />
            <Feature icon="bolt" title="Lightning Fast" desc="Convert in seconds." color="text-green-500" />
            <Feature icon="devices" title="All Devices" desc="Works everywhere." color="text-purple-500" />
          </div>
        </div>
      </main>
      <footer className="py-10 text-center text-gray-400 text-xs">© 2026 TikSaver. UAS Project.</footer>
    </div>
  );
}

function Feature({ icon, title, desc, color }) {
  return (
    <div className="text-center group">
      <div className={`w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
        <span className={`material-icons-round ${color}`}>{icon}</span>
      </div>
      <h3 className="font-bold dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}
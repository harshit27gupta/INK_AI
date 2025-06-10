import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { value } = useAppContext();
    const { axios,setToken,setUser} = value;
    const [loading, setLoading] = useState(false);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log('Admin Login Attempt:', email, password);
            const {data}=await axios.post("/api/admin/login",{email,password});
            console.log('API Response:', data);
         if(data.success){
          setLoading(true);
          setTimeout(() => {
            setToken(data.token);
            setUser({ _id: 'admin', role: 'admin' });
            localStorage.setItem("token",data.token);
            localStorage.setItem('user', JSON.stringify({ _id: 'admin', role: 'admin' }));
            axios.defaults.headers.common["Authorization"]=data.token;
            setLoading(false);
            // toast.success("Admin Login Successfully");
          }, 2000);
         }
         else{
          toast.error(data.message);
         }
        }catch(error){
            console.log('API Error:', error);
            toast.error(error.message);
        }
    }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4">
      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <span className="inline-block w-10 h-10 border-4 border-t-transparent border-indigo-400 border-r-purple-400 border-b-pink-400 border-l-indigo-400 rounded-full animate-spin"></span>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Admin Login</h1>
            <p className="font-light text-zinc-200">Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 w-full text-zinc-100">
            <div className="flex flex-col mb-6">
              <label className="mb-1 font-semibold text-zinc-200">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="your email id"
                className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-1 font-semibold text-zinc-200">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="your password"
                  className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all w-full pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black hover:text-indigo-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={0}
                  role="button"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001c2.29 4.019 6.686 6.999 10.066 6.999 3.38 0 7.776-2.98 10.066-6.999a10.477 10.477 0 00-2.046-3.778M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .512-.13.995-.354 1.412M6.53 6.53A9.956 9.956 0 003.98 8.223m0 0A10.477 10.477 0 001.934 12.001c2.29 4.019 6.686 6.999 10.066 6.999 1.676 0 3.37-.497 4.899-1.357M3.98 8.223l12.02 12.02" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 font-bold rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
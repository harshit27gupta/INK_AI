import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import AdminLayout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/Dashboard'
import ListBlog from './pages/Admin/ListBlog'
import AddBlog from './pages/Admin/AddBlog'
import Comments from './pages/Admin/Comments'
import Notfound from './components/Notfound'
import AdminLogin from './components/admin/Login'
import UserLogin from './pages/UserLogin'
import Register from './pages/Register'
import RoleChoice from './pages/RoleChoice'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './Context/AppContext'
import YourBlogs from './pages/User/YourBlogs'
import Newsletter from './components/Newsletter'
import NewsletterConfirm from './components/NewsletterConfirm'
import About from './pages/About'

const App = () => {
  const { value } = useAppContext();
  const { token, user } = value;
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/role-choice' element={<RoleChoice/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/user-login' element={<UserLogin/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* Admin dashboard routes */}
        <Route path='/admin' element={token && user?.role === 'admin' ? <AdminLayout/>: <AdminLogin/>}>
          <Route index element={<Dashboard/>}/>  
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
        </Route>
        {/* User dashboard routes */}
        <Route path='/user' element={token && user?.role === 'user' ? <AdminLayout/>: <UserLogin/>}>
          <Route index element={<Dashboard/>}/>  
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='yourblogs' element={<YourBlogs/>}/>
        </Route>
        <Route path='*' element={<Notfound/>}/>
        <Route path='/newsletter' element={<Newsletter/>}/>
        <Route path='/newsletter/confirm/:token' element={<NewsletterConfirm/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
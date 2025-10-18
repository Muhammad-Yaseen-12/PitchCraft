import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, doc, getDoc, db } from '../config/firebase'
import '@ant-design/v5-patch-for-react-19';
import { message } from 'antd';
function Login() {
    let navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        console.log(e.target)

        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login data:', formData);
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async (userCredential) => {
                // Signed in 
                message.success("Login successfully!");
                const user = userCredential.user;
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("User data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
                // navigate('/dashboard')
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error.message);

            });
    };
    const infoMsg = () => {
        message.info("Comming Soon...")
    }
    return (
        <div className="w-full max-w-md mx-auto pt-15">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="opacity-90">Sign in to your account</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                                ) : (
                                    <FaEye className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                                )}
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    required
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <button onClick={infoMsg} className="cursor-pointer w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <FaGoogle className="text-red-500 text-lg" />
                            </button>
                            <button onClick={infoMsg} className="cursor-pointer w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <FaGithub className="text-gray-800 text-lg" />
                            </button>
                            <button onClick={infoMsg} className="cursor-pointer w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <FaFacebook className="text-blue-600 text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Switch to Signup */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account? <Link className="text-blue-600 hover:text-blue-800 font-semibold" to='/signup'>Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
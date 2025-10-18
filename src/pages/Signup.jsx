import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, collection, addDoc, setDoc, doc, db } from "../config/firebase";
import '@ant-design/v5-patch-for-react-19';
import { message } from 'antd';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;
        // console.log('name:', name);
        // console.log('value:', value);
        // console.log('type:', type);
        // console.log('checked:', checked);


        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.agreeToTerms) {
            message.info("Passwords don't match!")
            return
        }
        if (formData.password !== formData.confirmPassword) {
            message.info("Passwords don't match!")
            return;
        }
        console.log('Signup data:', formData);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const user = userCredential.user;
            console.log(user);
            const userData = {
                ...formData,
                uid: user.uid
            }
            message.success("Account created successfully!");
            await setDoc(doc(db, "users", user.uid), userData);
            setFormData({
                email: "",
                password: "",
                username: "",
                confirmPassword: "",
                agreeToTerms: false,
            });

        } catch (err) {
            message.error(err.message);
        }

    };

    const infoMsg = () => {
        message.info("Comming Soon...")
    }

    return (
        <div className="w-full max-w-md mx-auto pt-15">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Start */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="opacity-90">Join us today</p>
                </div>

                {/* Form Start */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>

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

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MdPassword className="text-gray-400" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                                ) : (
                                    <FaEye className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                                )}
                            </button>
                        </div>

                        {/* Terms and Conditions */}
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                required
                            />
                            <span className="ml-2 text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Terms and Conditions
                                </a>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className=" cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Social Signup */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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

                    {/* Switch to Login */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account? <Link className="text-blue-600 hover:text-blue-800 font-semibold" to='/login'>Login</Link>

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
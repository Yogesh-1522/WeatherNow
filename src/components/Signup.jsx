import  { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", userCredential.user.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="flex flex-col">
          <input type="email" placeholder="Email" className="border p-3 mb-4 rounded" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="border p-3 mb-4 rounded" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition">Sign Up</button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="mt-4 text-center">
          Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

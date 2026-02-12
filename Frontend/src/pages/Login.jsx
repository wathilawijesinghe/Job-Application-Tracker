import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { saveAuth } from "../utils/auth";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/auth/login", form);
      saveAuth(data.token, data.user);
      nav("/jobs");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-white/60 mt-1">Login to manage your job applications.</p>

        {err && <div className="mt-4 rounded-lg bg-red-500/15 border border-red-500/30 p-3 text-red-200">{err}</div>}

        <div className="mt-5 space-y-3">
          <input className="w-full rounded-xl bg-white/10 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/30"
            name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
          <input className="w-full rounded-xl bg-white/10 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/30"
            name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        </div>

        <button className="mt-5 w-full rounded-xl bg-white text-slate-900 font-semibold py-3 hover:opacity-90">
          Login
        </button>

        <p className="mt-4 text-sm text-white/70">
          New here? <Link className="underline" to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
}

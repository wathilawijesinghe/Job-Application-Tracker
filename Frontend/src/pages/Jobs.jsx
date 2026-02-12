import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { logout } from "../utils/auth";

export default function Jobs() {
  const nav = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const { data } = await api.get("/jobs", { params: { status, q } });
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, [status]);

  const filtered = useMemo(() => {
    if (!q) return jobs;
    const s = q.toLowerCase();
    return jobs.filter(j => (j.company + " " + j.position).toLowerCase().includes(s));
  }, [jobs, q]);

  const remove = async (id) => {
    await api.delete(`/jobs/${id}`);
    setJobs(prev => prev.filter(j => j._id !== id));
  };

  const signOut = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">My Applications</h1>
          <div className="flex gap-2">
            <Link to="/jobs/new" className="rounded-xl bg-white text-slate-900 px-4 py-2 font-semibold">+ Add Job</Link>
            <button onClick={signOut} className="rounded-xl border border-white/15 px-4 py-2 text-white/80 hover:bg-white/5">
              Logout
            </button>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search company or role..."
            className="rounded-xl bg-white/5 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20" />
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 p-3 outline-none">
            <option value="">All Status</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button onClick={fetchJobs} className="rounded-xl border border-white/15 p-3 hover:bg-white/5">Refresh</button>
        </div>

        <div className="mt-6">
          {loading ? (
            <p className="text-white/60">Loading...</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              No applications found. Add your first job.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((j) => (
                <div key={j._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{j.position}</h2>
                      <p className="text-white/70">{j.company} • {j.location || "—"}</p>
                      <span className="inline-block mt-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                        {j.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/jobs/${j._id}/edit`} className="rounded-lg border border-white/15 px-3 py-2 hover:bg-white/5">
                        Edit
                      </Link>
                      <button onClick={() => remove(j._id)} className="rounded-lg bg-red-500/15 border border-red-500/30 px-3 py-2 text-red-200">
                        Delete
                      </button>
                    </div>
                  </div>

                  {j.notes && <p className="mt-3 text-white/70">{j.notes}</p>}
                  {j.jobLink && (
                    <a className="mt-3 inline-block underline text-white/80" href={j.jobLink} target="_blank" rel="noreferrer">
                      Job Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

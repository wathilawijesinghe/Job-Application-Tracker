export default function JobForm({ form, setForm, onSubmit, title }) {
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-white p-4">
      <form onSubmit={onSubmit} className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="mt-5 grid md:grid-cols-2 gap-3">
          <input className="rounded-xl bg-white/5 border border-white/10 p-3 outline-none"
            name="company" placeholder="Company" value={form.company} onChange={onChange} required />
          <input className="rounded-xl bg-white/5 border border-white/10 p-3 outline-none"
            name="position" placeholder="Role / Position" value={form.position} onChange={onChange} required />
          <input className="rounded-xl bg-white/5 border border-white/10 p-3 outline-none"
            name="location" placeholder="Location (optional)" value={form.location} onChange={onChange} />
          <select className="rounded-xl bg-white/5 border border-white/10 p-3 outline-none"
            name="status" value={form.status} onChange={onChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <input className="md:col-span-2 rounded-xl bg-white/5 border border-white/10 p-3 outline-none"
            name="jobLink" placeholder="Job link (optional)" value={form.jobLink} onChange={onChange} />
          <textarea className="md:col-span-2 rounded-xl bg-white/5 border border-white/10 p-3 outline-none min-h-28"
            name="notes" placeholder="Notes (optional)" value={form.notes} onChange={onChange} />
        </div>

        <button className="mt-5 w-full rounded-xl bg-white text-slate-900 font-semibold py-3 hover:opacity-90">
          Save
        </button>
      </form>
    </div>
  );
}

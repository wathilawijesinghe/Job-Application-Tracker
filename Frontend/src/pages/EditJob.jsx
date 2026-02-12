import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import JobForm from "../components/JobForm";

export default function EditJob() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/jobs");
      const job = data.find(j => j._id === id);
      setForm(job || null);
    })();
  }, [id]);

  if (!form) return <div className="min-h-screen grid place-items-center bg-slate-950 text-white">Loading...</div>;

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/jobs/${id}`, form);
    nav("/jobs");
  };

  return <JobForm title="Edit Job" form={form} setForm={setForm} onSubmit={onSubmit} />;
}

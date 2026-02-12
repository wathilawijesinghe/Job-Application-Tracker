import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import JobForm from "../components/JobForm";

export default function AddJob() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    company: "", position: "", location: "", status: "Applied", jobLink: "", notes: ""
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post("/jobs", form);
    nav("/jobs");
  };

  return <JobForm title="Add Job" form={form} setForm={setForm} onSubmit={onSubmit} />;
}

import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, userId: req.user.id });
  res.status(201).json(job);
};

export const getJobs = async (req, res) => {
  const { status, company, q } = req.query;

  const filter = { userId: req.user.id };
  if (status) filter.status = status;
  if (company) filter.company = new RegExp(company, "i");
  if (q) {
    filter.$or = [
      { company: new RegExp(q, "i") },
      { position: new RegExp(q, "i") }
    ];
  }

  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  res.json(jobs);
};

export const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!job) return res.status(404).json({ message: "Not found" });
  res.json(job);
};

export const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!job) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};

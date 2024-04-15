const Agent = require('../models/Agent');

// Controller functions
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (agent) {
      res.json(agent);
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAgent = async (req, res) => {
  const agent = new Agent(req.body);
  try {
    const newAgent = await agent.save();
    res.status(201).json(newAgent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (agent) {
      Object.assign(agent, req.body);
      const updatedAgent = await agent.save();
      res.json(updatedAgent);
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (agent) {
      await agent.remove();
      res.json({ message: 'Agent deleted' });
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

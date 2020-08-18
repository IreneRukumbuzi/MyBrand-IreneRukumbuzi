import Query from '../models/query';

exports.storeQueries = async (req, res) => {
  const queries = await Query.find();
  res.send({ data: queries });
};

exports.getOneQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    res.send({ data: query });
  } catch (error) {
    res.status(404).send({ error: 'Query not found' });
  }
};
exports.createQuery = async (req, res) => {
  const query = new Query(req.body);
  await query.save();
  res.send({ data: query });
};

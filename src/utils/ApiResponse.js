function success(data, meta = {}) {
  return {
    success: true,
    data,
    ...meta,
  };
}

module.exports = { success };

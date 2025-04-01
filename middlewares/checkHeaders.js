module.exports = (req, res, next) => {
  const requiredHeaders = ["authorization", "content-type"];

  const missingHeaders = requiredHeaders.filter(
    (header) => !req.headers[header]
  );

  if (missingHeaders.length > 0) {
    console.log({
      message: "Missing required headers",
      missingHeaders: missingHeaders,
    });
  }

  next();
};

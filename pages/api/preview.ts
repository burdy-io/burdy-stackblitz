const expiry = process.env.PREVIEW_EXPIRY || '15'; // The preview mode cookies expire in 15 minutes
const PREVIEW_EXPIRY = parseInt(expiry, 10);

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS in production
  if (
    (process.env.NODE_ENV === 'production' && req.query.secret !== process.env.BURDY_PREVIEW_SECRET) ||
    !req.query.slugPath
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData(
    {
      token: req.query.token,
    },
    {
      maxAge: PREVIEW_EXPIRY,
    }
  );

  res.redirect(req?.query?.slugPath);
}

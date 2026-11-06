/**
 * Host redirects handled in Pages (no zone Redirect Rules required):
 * - www.jessehuss.com → https://jessehuss.com (301)
 */
export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  if (url.hostname === 'www.jessehuss.com') {
    url.hostname = 'jessehuss.com';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
};

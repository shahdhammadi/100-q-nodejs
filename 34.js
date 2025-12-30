const safe = async fn => {
  try { return [null, await fn()]; }
  catch(e) { return [e, null]; }
};
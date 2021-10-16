module.exports = (id, operation, interval = 1000) => {

  let runner = null;
  const run = () => runner = setInterval(operation, interval);
  const stop = () =>  { if (runner != null) clearInterval(runner) };

  return {
    id,
    run,
    stop
  }

}
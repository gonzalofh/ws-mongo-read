module.exports = (msg) => {

  let ok = true;

  const operation = msg['operation'];

  if (!operation || !['start', 'stop'].includes(operation)) {
    console.error('invalid operation');
    ok = false;
  }

  if (operation === 'start' && !msg['collection']) {
      console.error('missing field "collecton"');
      ok = false;

  } else if (operation === 'close' && !msg['emitterId']) {
    console.error('missing field "emitterId"');
    ok = false;
  }

  return ok;
  
}
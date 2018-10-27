export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion ( question, users ) {
  const questionUser = Object.values(users).filter(x=> x.id === question.author)[0];
    console.log('helper', questionUser);
  const {author, optionOne, optionTwo, timestamp, id} = question
  const { avatarURL } = questionUser
  return {
    id,
    author,
    text1: optionOne.text,
    text2: optionTwo.text,
    votes1: optionOne.votes,
    votes2: optionTwo.votes,
    avatar: avatarURL,
    date: formatDate(timestamp)
}
}

// function for dynamic sorting
export function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
        return 0; 
    }

    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}
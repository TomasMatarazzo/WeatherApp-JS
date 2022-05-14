// To capitalize the first letter of the words.
function capitalize(words) {
    const separateWord = words.toLowerCase().split(' ');
    for (let i = 0; i < separateWord.length; i++) {
        separateWord[i] =
            separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}

// From unix timestamp ----> to hour:min:sec

function formatDate(time, offset) {
    return new Date((time + offset) * 1000);
}

function formatDay(time, offset) {
    const dateObject = formatDate(time, offset);
    return dateObject.toLocaleString("en-US", { month: "long", weekday: "long", day: "numeric" }) // Monday
}


function formatHour(time, offset) {
    const dateObject = formatDate(time, offset);
    return dateObject.toLocaleTimeString('en-US', {
        // en-US can be set to 'default' to use user's browser settings
        hour: '2-digit',
        minute: '2-digit',
    });
}



export { capitalize, formatHour, formatDay }
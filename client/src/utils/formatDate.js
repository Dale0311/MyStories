export function formatDateTime(input) {
  const inputDate = new Date(input);

  // Format time
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${ampm}`;

  // Format date
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  return `${formattedTime} on ${formattedDate}`;
}
export function formatJoinedDateTime(input) {
  const inputDate = new Date(input);
  // Format date
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();
  const formattedDate = `${month} ${year}`;

  return formattedDate;
}

export function formatCommentDate(inputDateTime) {
  const currentDate = new Date();
  const inputDate = new Date(inputDateTime);

  const timeDifferenceInSeconds = Math.floor((currentDate - inputDate) / 1000);
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  const timeDifferenceInWeeks = Math.floor(timeDifferenceInDays / 7);

  if (timeDifferenceInSeconds === 0) {
    return 'just now';
  }

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds}s `;
  } else if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes}m `;
  } else if (timeDifferenceInHours < 24) {
    return `${timeDifferenceInHours}h `;
  } else if (timeDifferenceInDays < 7) {
    return `${timeDifferenceInDays}d `;
  } else {
    // If more than a week, format as "Feb 27, 2024"
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return inputDate.toLocaleDateString('en-US', options);
  }
}

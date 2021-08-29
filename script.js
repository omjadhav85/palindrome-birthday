function reverseStr(s) {
  s = s.split("");

  let x = s.reverse();

  x = x.join("");

  return x;
}

function isPalindrome(s) {
  const x = reverseStr(s);

  if (x === s) {
    return true;
  }

  return false;
}

function convertDateToStr(date) {
  var dateStr = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormat(date) {
  var allDateFormats = getAllDateFormats(date);

  for (let i = 0; i < allDateFormats.length; i++) {
    if (isPalindrome(allDateFormats[i])) {
      return true;
    }
  }
  return false;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }

  return false;
}

function getNextDate(date) {
  var nextDate = {
    day: 0,
    month: 0,
    year: 0,
  };

  nextDate.day = date.day + 1;
  nextDate.month = date.month;
  nextDate.year = date.year;

  const monthEnds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (nextDate.month === 2) {
    if (isLeapYear(nextDate.year)) {
      if (nextDate.day > 29) {
        nextDate.day = 1;
        nextDate.month += 1;
      }
    } else {
      if (nextDate.day > 28) {
        nextDate.day = 1;
        nextDate.month += 1;
      }
    }
  } else {
    if (nextDate.day > monthEnds[nextDate.month - 1]) {
      nextDate.day = 1;
      nextDate.month += 1;
    }
  }

  if (nextDate.month > 12) {
    nextDate.day = 1;
    nextDate.month = 1;
    nextDate.year += 1;
  }

  return nextDate;
}

function findNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var count = 0;

  while (true) {
    count += 1;
    if (checkPalindromeForAllFormat(nextDate)) {
      break;
    } else {
      nextDate = getNextDate(nextDate);
    }
  }

  return [count, nextDate];
}

const birthDate = document.querySelector("#birth-date");
const btnCheck = document.querySelector("#btn-check");
const output = document.querySelector("#output");

function clickHandler() {
  var dateInput = birthDate.value;

  if (dateInput === "") {
    output.innerText = "Please enter your birth-date!";
  } else {
    dateInput = dateInput.split("-");

    var date = {
      day: Number(dateInput[2]),
      month: Number(dateInput[1]),
      year: Number(dateInput[0]),
    };

    if (checkPalindromeForAllFormat(date)) {
      output.innerText = "Yay! Your bithdate is a Palindrome!!";
    } else {
      var [count, nextDate] = findNextPalindromeDate(date);
      output.innerText = `Oops! The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days!`;
    }
  }
}

btnCheck.addEventListener("click", clickHandler);
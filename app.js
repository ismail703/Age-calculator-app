// ************** SELECT ELEMENTS ****************
const form = document.querySelector(".birthday");

const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");

const outputDay = document.querySelector(".days");
const outputMonth = document.querySelector(".months");
const outputYear = document.querySelector(".years");


// ************** EVENT LISTENER ****************
form.addEventListener('submit', (e) => {
    e.preventDefault();


    const validDay = (day.value <= 31 && day.value > 0);
    const validMonth = (month.value <= 12 && month.value > 0);
    const validYear = (year.value <= new Date().getFullYear() && year.value >= 1900);
    const is31day = ((month.value < 8 && month.value % 2 === 0 && day.value > 30) || (month.value >= 8 && month.value % 2 === 1 && day.value > 30));
    const validFebDay = (month.value === '2' && day.value > 29);
    const isLeap = (!leapYear(Number(year.value)) && day.value > 28)
    // console.log(is31day);
    
    let flag = 0;

    if (!validYear || !validMonth || !validDay || is31day || validFebDay || isLeap) {
        flag = 1;
    }
    // check if the day is valid
    let d, m, y;
    if (day.value === "") {
        displayError(day, "This field is required");
    } else {
        backToDefault(day);
        if (validDay) {
            if (flag) {
                displayError(day, "");
            }

            (is31day || validFebDay || isLeap) ? 
            displayError(day, "Must be a valid day") 
            : d = Number(day.value);
        } else {
            displayError(day, "Must be a valid day");
        }
    }

     // check if the month is valid
    if (month.value === "") {
        displayError(month, "This field is required");
    } else {
        backToDefault(month);
        if (validMonth) {
            if (flag) {
                displayError(month, "");
            }
            m = Number(month.value);
        }
        else {
            displayError(month, "Must be a valid month");
        }
    }

     // check if the year is valid
    if (year.value === "") {
        displayError(year, "This field is required");
    } else {
        backToDefault(year);
        if (validYear) {
            if (flag) {
                displayError(year, "");
            }
            y = Number(year.value);
        } else {
            displayError(year, "Must be a valid year");
        }
    }

    if (d && m && y) {
        day.value = "";
        month.value = "";
        year.value = "";

        backToDefault(day);
        backToDefault(month);
        backToDefault(year);

        displayAge(d, m, y);
    }
});

// ************** FUNCTIONS ****************
// Display Error 
function displayError(element, msg) {
    element.classList.add("input-error");
    element.nextElementSibling.textContent = msg;
    element.previousElementSibling.classList.add("error");
}

// Set Down Error
function backToDefault(element) {
    element.classList.remove("input-error");
    element.nextElementSibling.textContent = "";
    element.previousElementSibling.classList.remove("error");
}

// display the age
function displayAge(d, m, y) {
    const todayDate = new Date();
  
    let tempYear = todayDate.getFullYear();
    let tempMonth = todayDate.getMonth() + 1;
    let tempDate = todayDate.getDate();

     
    let yy = tempYear - y
    let mm = tempMonth - m;
    let dd = tempDate - d;

    let prevMonth;
   (tempMonth == 1) ? prevMonth = 12 : prevMonth = tempMonth - 1;

    if (dd < 0) {
        mm--
        if ((prevMonth) === 2) {
            if (leapYear(y)) {
                dd = 29 - d + tempDate;
            } else {
                dd = 28 - d + tempDate;
            }
        } else if(((prevMonth) < 8 && (prevMonth) % 2 === 1) || ((prevMonth) >= 8 && (prevMonth) % 2 === 0)) {
            dd = 31 - d + tempDate;
        }
        else {
            dd = 30 - d + tempDate;
        }
    }
    if (mm < 0) {
        yy--;
        mm += 12;
    }
    
    outputDay.innerHTML = `${dd}`;
    outputMonth.innerHTML = `${mm}`;
    outputYear.innerHTML = `${yy}`;
}

function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}






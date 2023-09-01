const form = document.querySelector(".birthday");

const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");

const ageDay = document.querySelector(".days");
const ageMonth = document.querySelector(".months");
const ageYear = document.querySelector(".years");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validDay = (day.value <= 31 && day.value > 0);
    const validMonth = (month.value <= 12 && month.value > 0);
    const validYear = (year.value <= new Date().getFullYear() && year.value >= 1900);
    const is31day = (month.value % 2 === 0 && day.value > 30)
    
    let flag = 0;

    if (!validYear || !validMonth || !validDay || is31day) {
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

            (is31day) ? 
            displayError(day, "Must be a valid day") 
            : d = day.value;
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
            m = month.value;
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
            y = year.value;
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
    const date = new Date();

    const birthday = new Date(y, m - 1, d);
    let age = date.getTime() - birthday.getTime();

    let oneYear = 1000 * 60 * 60 * 24 * 365.2425;
    let oneMonth = 1000 * 60 * 60 * 24 * 30.4167;
    let oneDay = 1000 * 60 * 60 * 24;
    
    let yy = Math.floor(age / oneYear);
    let mm = Math.floor((age % oneYear) / oneMonth);
    let dd = Math.floor(((age % oneYear) % oneMonth) / oneDay);
    
    ageDay.innerHTML = `${dd}`;
    ageMonth.innerHTML = `${mm}`;
    ageYear.innerHTML = `${yy}`;
}
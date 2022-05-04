const list = document.querySelector('.js-list');
const links = document.querySelectorAll('.js-link');
const titles = document.querySelectorAll('.js-title');
const currentDates = document.querySelectorAll('.js-current');
const previousDates = document.querySelectorAll('.js-previous');

const fetchData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/pqhung3007/fem-time-tracking-dashboard/main/data.json')
    const data = await response.json()
    console.log(...data);
    return data
}

list.addEventListener('click', (e) => {
    if (e.target.textContent.trim() === 'Daily')
        setTimeFrame(
            ({ timeframes }) => timeframes.daily.current,
            ({ timeframes }) => timeframes.daily.previous,
            'Yesterday'
        );

    if (e.target.textContent.trim() === 'Weekly')
        setTimeFrame(
            ({ timeframes }) => timeframes.weekly.current,
            ({ timeframes }) => timeframes.weekly.previous,
            'Last Week'
        );

    if (e.target.textContent.trim() === 'Monthly')
        setTimeFrame(
            ({ timeframes }) => timeframes.monthly.current,
            ({ timeframes }) => timeframes.monthly.previous,
            'Last Month'
        );
});

const setTitlesText = async () => {
    const data = await fetchData()
    data.map((el, i) => (titles[i].textContent = el.title));
}

const setTimeFrame = async (current, previous, time) => {
    const data = await fetchData();
    setCurrentDateText(data.map(current));
    setPreviousDateText(data.map(previous), time);
};

const setCurrentDateText = (timeframe) => {
    [...currentDates].forEach((el, i) =>
        el.textContent = `${timeframe[i]}` + getSingular(timeframe[i]));
}

const setPreviousDateText = (timeframe, time) => {
    [...previousDates].forEach((el, i) =>
        el.textContent = `${time} - ${timeframe[i]}` + getSingular(timeframe[i]))
};

const getSingular = (timeframe) => {
    if (timeframe > 1) {
        return 'hrs'
    } else
        return 'hr'
}

const setActiveState = function () {
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            links.forEach(l => {
                // remove active state of other/previous links
                l.classList.remove('content__link--active')
                e.target.classList.add('content__link--active')
            });
        });
    });
};

// default time frame
setTimeFrame(
    ({ timeframes }) => timeframes.daily.current,
    ({ timeframes }) => timeframes.daily.previous,
    'Yesterday'
);
setTitlesText()
setActiveState()
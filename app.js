

const fetchData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/pqhung3007/fem-time-tracking-dashboard/main/data.json')
    const data = await response.json()
    return data
}
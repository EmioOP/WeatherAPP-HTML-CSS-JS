const getWhetherBtn = document.getElementById("getWhetherBtn")
const cityInput = document.getElementById("city")
const displayItems = document.getElementById("result")

const API_KEY = "65b94bf3a724386273a0c87c9c1ee517"

getWhetherBtn.addEventListener("click", async () => {
    try {
        const city = cityInput.value.trim()

        if (!city) {
            throw new Error("Invalid city")
        }

        const whetherData = await fetchData(city) // whether data came here after this we have provide this data to displaydata function
        displayWhetherData(whetherData)

    } catch (error) {
        console.log("Cannot retrive whether data", error)
    }

})


async function fetchData(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    return await response.json() //it will return a json containing whether data

}

function displayWhetherData(data) {
    // console.log("data", data.weather[0].description)
    try {
        if (data && data.cod !== "404") {
            document.getElementById("errorMsg").classList.add("hidden")
            displayItems.classList.remove("hidden")

            document.getElementById("location").textContent = ` Location: ${data.name}`
            document.getElementById("weather").textContent = ` Weather: ${data.weather[0].main}`
            document.getElementById("temp").innerHTML = ` Temp: ${Math.trunc(data.main.temp)}&deg;C` //using innerHtml for adding degree sign to it
        } else {
            throw new Error("Invalid Location")
        }
    } catch (error) {
        displayItems.classList.add("hidden")
        document.getElementById("errorMsg").classList.remove("hidden")
        console.log("Error while dispaying data", error.message)
    }

    // displayItems.textContent = `Condition: ${data.weather[0].description} Temp: ${data.main.temp}`
}
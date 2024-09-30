const baseurl = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.text = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if( select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}


const updateflag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateexchangerate();
});


const updateexchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval < 1){
        amtval = 1;
        amount.value = 1;
    }


    const URL = `${baseurl}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    let finalAmount = (data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};

window.addEventListener("load", () => {
    updateexchangerate();
})
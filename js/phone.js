const loadPhones = async (searchText, showAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    // console.log(data);
    const phones = data.data;
    displayPhones(phones,showAll)
}

const displayPhones = (phones,showAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // console.log(phones.length);
    const showAllBtn = document.getElementById('show-all-btn');

    if(phones.length > 12 && !showAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden')
    }


if(!showAll){
    phones = phones.slice(0,12);
}




    phones.forEach(phone =>{
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card bg-gray-100 shadow-xl`
        phoneDiv.innerHTML = `
        <figure class="px-10 pt-10">
        <img
        src="${phone.image}"
        alt="Shoes"
        class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title text-3xl">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h2 class="card-title text-3xl">$999</h2>
        <div class="card-actions">
        <button onclick= 'handleShowDetails("${phone.slug}")' class="btn btn-success text-white">Show details</button>
        </div>
        </div>
        `;

        phoneContainer.appendChild(phoneDiv)
    });
    toggleLoading(false);


}

const toggleLoading = (isLoading) =>{
    const loading = document.getElementById('loading')
    if(isLoading){
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
}
const handleSearch = (showAll) =>{
    // console.log('search clicked');
    toggleLoading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhones(searchText, showAll)
}

const handleShowDetails = async (id) =>{
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    console.log(phone);

    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML = `
    <div class = 'flex justify-center pt-5 mb-6'>
    <img src="${phone.image}">
    </div>
    <h2 class ='text-3xl font-bold'>${phone.name}</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class = 'font-bold'>Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class = 'font-bold'>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class = 'font-bold'>Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class = 'font-bold'>Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class = 'font-bold'>Slug: </span>${phone?.slug}</p>
    <p><span class = 'font-bold'>Release date: </span>${phone?.releaseDate}</p>
    <p><span class = 'font-bold'>Brand: </span>${phone?.brand}</p>
    <p><span class = 'font-bold'>GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
    `

    // show modal
    show_details_modal.showModal()
}
const handleShowAll = () =>{
    handleSearch(true);
}


// loadPhones()
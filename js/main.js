window.addEventListener("DOMContentLoaded", function () {

  document.getElementById("find-me").addEventListener("click", geoFindMe);
  document.getElementById("shareBtn").addEventListener("click", share);

})


function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  const iframe = document.querySelector('#iframe');
  

  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation) {
    status.textContent = 'מיקום גיאוגרפי אינו נתמך על ידי הדפדפן שלך';
  } else {
    status.textContent = 'מאתר את מיקומך...';
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
    iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
    iframe.classList.remove('d-none');
    

  }


  function error() {
    status.textContent = 'לא ניתן לאחזר את המיקום שלך';
  }

}



function share() {
  const shareData = {
    title: 'שיתוף מיקומך',
    text: 'קישור למיקום',
    url:'https://maps.google.com/?q=${latitude},${longitude}' 
  }
  
  const btn = document.querySelector('#shareBtn');
  
  // Share must be triggered by "user activation"
  btn.addEventListener('click', async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
  
    }
  });

}
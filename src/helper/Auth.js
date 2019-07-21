export let isAuthenticated = false;
if(localStorage.getItem('auth') !== null && localStorage.getItem('auth') !== ''){
    isAuthenticated = true;
}
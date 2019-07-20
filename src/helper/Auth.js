export let isAuthenticated = false;
if(localStorage.getItem('auth') !== ''){
    isAuthenticated = true;
}
<template>
    <div>
        <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://i.imgur.com/dwusU4d.png" class="h-8" alt="Flowbite Logo">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Local stogate</span>
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <div v-if="!isWalletConnected">
      <button @click="connectWallet" type="button" class="flex items-center text-black bg-white hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-white dark:hover:bg-blue-700 hover:text-white">
        <img src="https://i.imgur.com/Sd71Dw3.png" alt="MetaMask Logo" class="mr-2 h-5 w-5" />
        <span>Connect Wallet</span>
      </button>
    </div>
    <div v-else>
      <span class="flex items-center cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700" @click="confirmDisconnect">{{ formattedWalletAddress }}</span>
    </div>
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            <nuxt-link to="/login">Login</nuxt-link></a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            <nuxt-link to="/register">register</nuxt-link></a>
      </li>
    </ul>
  </div>
  </div>
  <slot />
</nav>  
    </div>
</template>

<script>
export default {
  name: 'NuxtNavbar',
  data() {
    return {
      isWalletConnected: false,
      walletAddress: '',
      formattedWalletAddress: ''
    };
  },

  methods: {
    async connectWallet() {
      if (window.ethereum) {
        try {
          // Yêu cầu mở ví MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Lấy địa chỉ ví
          const account = accounts[0];
          this.walletAddress = account;
          this.isWalletConnected = true;
          // Định dạng địa chỉ ví
          this.formattedWalletAddress = this.formatAddress(account);
        } catch (error) {
          console.error('Không thể kết nối với ví MetaMask', error);
        }
      } else {
        console.log('Vui lòng cài đặt MetaMask!');
      }
    },
    formatAddress(address) {
      return address.substring(0, 6) + '...' + address.substring(address.length - 4);
    },
    confirmDisconnect() {
      if (window.confirm('Bạn có chắc chắn muốn ngắt kết nối ví không?')) {
        this.disconnectWallet();
      }
    },
    disconnectWallet() {
      this.isWalletConnected = false;
      this.walletAddress = '';
      this.formattedWalletAddress = '';
    }
  }
};
</script>
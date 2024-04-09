<template>
    <div>
        <div class="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
        <div class="bg-white shadow-md rounded-md p-6">
            <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
            <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up for an account
            </h2>
            <form @submit.prevent="registerUser" class="space-y-6" method="POST">
                <div>
                    <label for="new-password" class="block text-sm font-medium text-gray-700">Username</label>
                    <div class="mt-1">
                        <input v-model="username" name="username" type="text"
                            class=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-b-slate-300 focus:ring-white sm:text-sm sm:leading-5 text-black transition-colors duration-300 ease-in-out  focus:text-black" 
                            :class="{ 'is-invalid': errors.username }"
                            />
                            <div class="validation-feedback">{{ errors.username }}</div>
                        </div>
                </div>
                <div>
                    <label  for="password" class="block text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1">
                        <input v-model="email" name="email" type="email-address" autocomplete="email-address"  
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-b-slate-300 focus:ring-white sm:text-sm sm:leading-5 text-black transition-colors duration-300 ease-in-out  focus:text-black" 
                            :class="{ 'is-invalid': errors.email }"
                            />
                        <div class="validation-feedback">{{ errors.email }}</div>
                        </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                        <input v-model="password"  name="password" type="password" autocomplete="password"  
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-b-slate-300 focus:ring-white sm:text-sm sm:leading-5 text-black transition-colors duration-300 ease-in-out  focus:text-black" 
                            :class="{ 'is-invalid': errors.password }"
                            />
                            <div class="validation-feedback">{{ errors.password }}</div>
                        </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div class="mt-1">
                        <input v-model="password2" name="confirm_password" type="password" autocomplete="confirm-password"  
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-b-slate-300 focus:ring-white sm:text-sm sm:leading-5 text-black transition-colors duration-300 ease-in-out  focus:text-black" 
                            :class="{ 'is-invalid': errors.password2 }"
                            />
                            <div class="validation-feedback">{{ errors.password2 }}</div>
                        </div>
                </div>
                <div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">Register
                        Account
                        </button>
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400 my-4">already have an account?<a
            class="font-bold text-blue-600 hover:underline dark:text-blue-500 p-2" href="/login">Login to Here</a>
        </p>
                </div>
                <a href="#"
                class=" flex justify-center my-2 font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                <span class="">←</span><nuxt-link to="/">back to Home</nuxt-link>
            </a>
            </form>
        </div>
    </div>
</div>  
    </div>
</template>
<script>
import validatorRegister from '../validation/validatorRegister'
export default {
    name: 'NuxtLogin',

    data() {
        return {
            username: "",
            email:"",
            password:"",
            password2:"",
            errors: {},
            user: []
        };
    },
    mounted() {

    },
    methods: {
    registerUser() {
        let user = {
            username: this.username,
            email: this.email,
            password: this.password,
            password2: this.password2,
        };
        const {isInvalid, errors} = validatorRegister(user);
        if (isInvalid) {
            this.errors = errors;
        } else {
            this.errors = {};
            if (process.client) { // Kiểm tra xem code đang chạy ở phía client
                if (localStorage.getItem("users")) {
                    this.users = JSON.parse(localStorage.getItem("users"));
                } else {
                    this.users = []; // Khởi tạo mảng nếu chưa có
                }
                this.users.push(user);
                localStorage.setItem("users", JSON.stringify(this.users));
            }
            // Xóa dữ liệu form sau khi đăng ký thành công
            this.username = "";
            this.email = "";
            this.password = "";
            this.password2 = "";
        }
    },
},
};
</script>
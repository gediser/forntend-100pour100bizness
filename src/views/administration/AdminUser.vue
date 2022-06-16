<template>
  <div class="p-12 pb-32">
    <form @submit.prevent="search" class="mb-6">
        <input 
            class=" h-8  border-2 border-belge rounded-l-full lg:rounded-r-0 pl-4 m-0 focus:outline-2 focus:ring focus:border-belge" 
            type="email"
            placeholder="Entrez l'email"
            v-model="email"
            @keydown.prevent.enter="search"
        />
        <button class="relative -top-[1px] h-8 bg-belge text-white px-2 border border-belge hover:text-red-500">Chercher</button>
    </form>
    <table v-if="data.length >0" class="w-full text-center">
        <thead>
            <tr class="border-b-2 border-gray-300 h-12">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="item, index in data" :key="index" class="border-b-2 border-gray-300 h-12">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.email}}</td>
                <td>{{showRole(item.roles)}}</td>
                <td>
                    <button 
                        @click="makeAdmin(item.id)"
                        v-if="showRole(item.roles) === 'user'"
                        class="h-8 bg-belge text-white px-2 rounded-md border border-belge hover:text-red-500 hover:scale-110"
                    >Devenir Admin</button>
                    <button 
                        @click="makeUser(item.id)"
                        v-if="showRole(item.roles) === 'admin'"
                        class="h-8 bg-belge text-white px-2 rounded-md border border-belge hover:text-red-500 hover:scale-110"
                    >Devenir User</button>
                </td>
            </tr>
        </tbody>
        
    </table>
    <div v-else>
        <h3 class="border-b-2 border-gray-300 h-12 text-center font-bold">
           Pas de resultats
        </h3>
    </div>
  </div>
</template>

<script>
import { data } from "autoprefixer"
import axiosClient from "../../axios"

export default {
    components: {

    },
    methods:{
        getUsers(email){
            email = email.trim()
            const self = this
            axiosClient.get(`/users/search?email=${email}`)
                .then(({data})=>{
                    self.data = data
                })
        },
        showRole(roles){
            let role = 'user'
            if (roles.findIndex(item => item.name === 'admin') >=0){
                role = 'admin'
            }
            if (roles.findIndex(item => item.name === 'manager') >=0){
                role = 'manager'
            } 
            return role
        },
        search(){
            this.getUsers(this.email)
        },
        makeAdmin(id){
            const self = this
            axiosClient.post('/users/make/admin', {id})
                .then(() => {
                    self.getUsers(this.email)
                })
        },
        makeUser(id){
            const self = this
            axiosClient.post('/users/make/user', {id})
                .then(() => {
                    self.getUsers(this.email)
                })
        }
    },
    mounted(){
        this.getUsers(this.email)
    },
    data(){
        return {
            data: [],
            email: ''
        }
    }
}
</script>

<style>

</style>
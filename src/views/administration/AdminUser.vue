<template>
  <form>
    <input  
        type="text"
        placeholder="Entrez l'email"
        v-model="email"
    />
    <button>Chercher</button>
  </form>
  <table>
    <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item, index in data" :key="index">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.email}}</td>
            <td>{{showRole(item.roles)}}</td>
            <td><button>Devenir Admin</button></td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import { data } from "autoprefixer"
import axiosClient from "../../axios"

export default {
    components: {

    },
    mounted(){
        const self = this
        axiosClient.get('/users/search', {email:this.email})
            .then(({data})=>{
                self.data = data
            })
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
<template>
    <div 
        v-if="data.data == null || data.data==undefined || data.data.length==0"
        class="pl-32"
    >Vous n'avez pas de publications.</div>
    <div v-else class="pb-32">
            <div  class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <PublicationListItem 
                    v-for="(pub, ind) in data.data"
                    :key="pub.id"
                    :publication="pub"
                    :publique="'admin'"
                    class="opacity-0 animate-fade-in-down"
                    :style="{animationDelay: `${ind*0.1}s`}"
                    @activate="activate(pub)"
                    @desactivate="desactivate(pub)"
                />
            </div>
            <div class="flex justify-center mt-5">
                <nav
                    class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <a
                        v-for="(link, i) of data.meta.links"
                        :key="i"
                        :disabled="!link.url"
                        v-html="link.label"
                        href="#"
                        @click="getForPage($event, link)"
                        aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                        :class="[
                            link.active 
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                            i===0 ? 'rounded-l-md' : '',
                            i===data.links.length-1 ? 'rounded-r-md' : ''
                        ]"
                    >

                    </a>
                </nav>
            </div>
        </div>
</template>

<script>
import axiosClient from "../../axios"
import PublicationListItem from "../../components/PublicationListItem.vue"

export default {
    components:{
        PublicationListItem,
    },
    methods:{
        getPublications(url){
            url = url || 'view/publication'
            const self = this
            axiosClient.get(url)
                .then(({data})=>{
                    self.data = data
                    console.log("publications", data)
                })
        },
        getForPage(event, link){
            event.preventDefault();
            if (!link.url || link.active){
                return;
            }
            this.getPublications(link.url )
        },
        activate(pub){
            const self = this
            axiosClient.post(`/publication/activate`, {id:pub.id})
                .then(()=>{
                    let updatedData = self.data.data.map(item => {
                        if (item.id == pub.id){
                            item.activate = true
                            return item
                        }
                        return item
                    })
                    self.data = {...self.data, data:updatedData}
                })
        },
        desactivate(pub){
            const self = this
            axiosClient.post(`/publication/desactivate`, {id:pub.id})
                .then(()=>{
                    let updatedData = self.data.data.map(item => {
                        if (item.id == pub.id){
                            item.activate = false
                            return item
                        }
                        return item
                    })
                    self.data = {...self.data, data:updatedData}
                })
        }
    },
    mounted(){
        this.getPublications()
    },
    data(){
        return {
            data:{},
        }
    }
}
</script>

<style scoped>

</style>

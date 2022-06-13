<template>
  <page-component>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Accueil</h1>
                
            </div>
        </template>

        <div>
            <h2 class="text-xl font-bold text-gray-900 mb-3">Pour vos affaires</h2>
            <pour-vos-affaires></pour-vos-affaires>

            <h2 class="text-xl font-bold text-gray-900 mb-3">Meilleur classement</h2>
            <meilleur-classement></meilleur-classement>

            <h2 class="text-xl font-bold text-gray-900 mb-3">Juste pour vous</h2>
            <juste-pour-vous></juste-pour-vous>
        </div>
    </page-component>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import JustePourVous from '../components/accueil/JustePourVous.vue';
import MeilleurClassement from '../components/accueil/MeilleurClassement.vue';
import PourVosAffaires from '../components/accueil/PourVosAffaires.vue';

</script>

<style>

</style>
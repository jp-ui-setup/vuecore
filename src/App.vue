<template>
  <v-app>
    <PageLoader v-if="isLoading" />
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import PageLoader from './components/PageLoader.vue'
import { isLoading } from './router'

export default {
  name: 'App',
  components: {
    PageLoader,
  },
  data() {
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [
        { title: 'Home', path: '/', icon: 'home' },
        { title: 'Vue', path: '/vue', icon: 'face' },
        { title: 'throttle', path: '/throttle', icon: 'face' },
        { title: 'React', path: '/box-shadow', icon: 'lock_open' },
        { title: 'TankStack', path: '/tank-stack', icon: 'lock_open' },
        { title: 'Pinia', path: '/pinia-store', icon: 'lock_open' },
      ],
    }
  },
  computed: {
    isLoading() {
      return isLoading.value
    },
  },
}
</script>

<template>
  <div>
    <template v-if="user">
      <div class="p-4">
        <div class="flex items-center">
          <router-link :to="`/profile`">
            <img class="w-10 h-10 rounded-full mr-4" :src="user.photo" />
          </router-link>
          <div class="flex-auto text-sm">
            <p class="text-gray-900 leading-none">
              <router-link :to="`/profile`">{{ user.name }}</router-link>
            </p>
            <p class="text-gray-600">{{ user.job_title }}</p>
          </div>
          <button type="button" class="text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded" @click="signOut">Logout</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    // authLoading: 'auth/loading'
    user: 'auth/user'
  }),

  methods: {
    signOut () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

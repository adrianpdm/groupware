<template>
  <div class="messages">
    <div class="container mx-auto">
      <template v-if="user && !loading">
        <template v-if="!error">
          <div class="bg-white m-0 sm:rounded shadow">
            <div class="text-center p-6  border-b">
              <a :href="item['photo']">
                <img class="h-40 w-40 rounded-full mx-auto" :src="item['photo']" :alt="item['name']" />
              </a>

              <p class="pt-4 text-lg font-semibold">
                {{ item['name'] }}
              </p>
              <p v-if="item['job_title']" class="text-gray-600">
                {{ item['job_title'] }}
              </p>
            </div>
            <div class="border-b">
              <a href="#" class="px-2 py-3 hover:bg-gray-200 flex">
                <div class="pl-3">
                  <p class="font-semibold">
                    Email
                  </p>
                  <p class="text-gray-600">
                    {{ item['email'] ? item['email'] : '-' }}
                  </p>
                </div>
              </a>
              <a href="#" class="px-2 py-3 hover:bg-gray-200 flex">
                <div class="pl-3">
                  <p class="font-semibold">
                    Phone
                  </p>
                  <p class="text-gray-600">
                    {{ item['phone'] ? item['phone'] : '-' }}
                  </p>
                </div>
              </a>
              <a href="#" class="px-2 py-3 hover:bg-gray-200 flex">
                <div class="pl-3">
                  <p class="font-semibold">
                    Birth Date
                  </p>
                  <p class="text-gray-600">
                    {{ item['birthdate'] ? formatDateLong(item['birthdate'].toDate()) : '-' }}
                  </p>
                </div>
              </a>
              <a href="#" class="px-2 py-3 hover:bg-gray-200 flex">
                <div class="pl-3">
                  <p class="font-semibold">
                    Last Online
                  </p>
                  <p class="text-gray-600">
                    {{ formatDateTimeShort(item['last_seen_at'].toDate()) }}
                  </p>
                </div>
              </a>
            </div>
            <div class="border-b">
              <div class="px-4 py-4 text-center">
                <router-link to="/profile/edit" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">
                  Edit Profile
                </router-link>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="bg-red-100 border border-red-400 text-red-700 mx-2 sm:mx-0 px-4 py-3 relative" role="alert">
            <strong class="font-bold">Holy smokes! </strong>
            <span class="block sm:inline">Something seriously bad happened.</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="bg-white shadow p-4">
          <content-loader
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="15" rx="0" ry="0" width="100%" height="15" />
            <rect x="0" y="45" rx="0" ry="0" width="100%" height="75" />
          </content-loader>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { formatDateTimeShort, formatDateLong } from '@/lib/date'
import { analytics } from '@/lib/firebase'

export default {
  middleware: 'auth',

  components: {
    ContentLoader
  },

  metaInfo: {
    title: 'My Profile'
  },

  computed: mapGetters({
    user: 'auth/user',
    loading: 'profile-detail/loading',
    item: 'profile-detail/item',
    error: 'profile-detail/error'
  }),

  mounted () {
    this.fetchItem()
  },

  methods: {
    formatDateTimeShort,
    formatDateLong,

    async fetchItem () {
      await this.$store.dispatch('profile-detail/fetchItem')

      analytics.logEvent('profile_detail_view')
    }
  }
}
</script>

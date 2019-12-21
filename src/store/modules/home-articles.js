import * as types from '../mutation-types'
import { db } from '@/lib/firebase'

// state
export const state = {
  loading: true,
  items: []
}

// getters
export const getters = {
  loading: state => state.loading,
  items: state => state.items
}

// mutations
export const mutations = {
  [types.HOME_ARTICLES_INIT] (state) {
    state.loading = true
  },

  [types.HOME_ARTICLES_LOADED] (state, { items }) {
    state.items = items
    state.loading = false
  }
}

// actions
export const actions = {
  async fetchItems ({ commit }) {
    const querySnapshot = await db.collection('articles')
      .orderBy('published_at', 'desc')
      .limit(5)
      .get()

    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    commit(types.HOME_ARTICLES_LOADED, { items: documents })
  }
}

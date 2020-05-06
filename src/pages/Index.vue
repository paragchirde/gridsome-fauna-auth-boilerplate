<template>
  <div>
    <nav>
      <div class="bg-gray-900 w-full h-12 px-4 py-2">
        <div class="flex flex-wrap justify-between items-center">
          <div class="text-white font-mono text-2xl">Wallet</div>
          <button class="text-white font-mono text-base bg-indigo-500 px-2 py-1 rounded-md" @click="logout()">Logout</button>
        </div>
      </div>
    </nav>
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/5">
        <div class="bg-gray-300 h-screen  p-6">
          <p>Hello, {{ this.$store.state.user.name }}</p>
        </div>
      </div>
      <div class="w-full md:w-4/5 p-6">
        <div>
          Side
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.GRIDSOME_FAUNA_SECRET})
const q = faunadb.query
export default {
  metaInfo: {
    title: 'Dashboard'
  },
  methods:{
    logout() {
      client.query(q.Logout(true)).then(res => {
        client
          .query(
            q.Update(q.Ref(q.Collection("users"), this.$store.state.id), {
              data: {
                token: null
              }
            })
          )
          .then(res => {
            localStorage.removeItem("token");
            this.$router.push({ path: "/login" });
          });
      });
    }
  }
}
</script>

<style>

</style>

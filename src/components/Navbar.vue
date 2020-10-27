<template>
  <div>
    <nav class="navbar navbar-primary sticky-top bg-primary flex-md-nowrap p-0 shadow">
        <router-link :class="{'text-secondary': activity === 'home'}" 
        to="/">
        <div class="logo" @click="activity = 'home'">
        <img src="https://i.imgur.com/kTzDx8b.png" alt="logo" style="transform: scale(.5, .5)">
        </div>
        </router-link>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
            <a class="nav-link text-white" href="#" @click.prevent="signout">Sign out</a>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
        return {
            activity: 'home'
        }
    },
  methods: {
    signout() {
      const url = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(url).then((response) => {
          console.log(response.data);
          if (response.data.success) {
              vm.$router.push("/login");
          };
      });
    }
  }
}
</script>
<template>
  <article class="frame-view">
    <header class="frame-view-header">
      <header>JIRA-Log</header>
      <nav>
        <router-link to="/project-issue-user">项目-问题-用户</router-link>
        <router-link to="/user-project-issue">用户-项目-问题</router-link>
      </nav>
    </header>

    <section>
      <router-view></router-view>
    </section>
  </article>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "FrameView",
  setup() {
    console.log("setup, frame-view");
  },
});
</script>

<style lang="scss" scoped>
.frame-view {
  height: 100%;
  display: flex;
  flex-direction: column;

  > section {
    flex: 1;
    overflow: auto;
  }
}
.frame-view-header {
  padding: 10px 0px;
  border-bottom: 1px solid #42b983;
  box-shadow: 4px 0px 10px 0px #42b983;
  display: flex;
  align-items: center;

  > header {
    padding: 0px 30px;
    font-size: 2em;
    text-align: center;
  }
  > nav {
    padding: 0px 20px;
  }

  a {
    margin: 0px 10px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

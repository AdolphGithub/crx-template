<template>
  <div id="siderbar-home">
    <h1>Inject Demo</h1>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">主要按钮</van-button>
      <van-button type="default">主要按钮</van-button>
      <van-button type="warning">主要按钮</van-button>
      <van-button type="danger">主要按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InjectHome',
  methods: {
    show() {
      console.log('show')
    }
  }
}
</script>

<style lang="scss">
#popup-home {
  width: 150px;
  text-align: center;
  h1 {
    font-size: 32px;
  }

  button {
    margin: 10px 10px 0 0;
  }
}
</style>

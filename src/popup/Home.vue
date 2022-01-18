<template>
  <div id="popup-home">
    <h1>Demo</h1>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">主要按钮</van-button>
      <van-button type="default">主要按钮</van-button>
      <van-button type="warning">主要按钮</van-button>
      <van-button type="danger">主要按钮</van-button>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="单元格" value="内容" @click="show" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupHome',
  methods: {
    show() {
      console.log('show')
    }
  }
}
</script>

<style lang="scss">
#popup-home {
  width: 300px;
  text-align: center;
  h1 {
    font-size: 32px;
  }

  button {
    margin: 10px 10px 0 0;
  }
}
</style>

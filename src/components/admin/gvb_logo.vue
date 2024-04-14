<template>
  <div class="gvb_logo">
    <img src="/image/logo.jpg" />
    <div class="logo_head">
      <div>肖晓知道</div>
      <div>xiaoxiaozhidao</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.gvb_logo{
  height: 90px;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--bg);
  transition: all .3s;
  img{
    height: 60px;
    width: 60px;
    border-radius: 50%;
    transition: all .3s;
  }
  .logo_head{
    margin-left: 22px;
    transition: all .3s;
    >div:nth-child(1){
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    >div:nth-child(2){
      font-size: 12px;
    }
  }
}
.collapsed{
  .gvb_logo{
    padding: 2px;
    img{
      width: 42px;
      height: 42px;
    }
    .logo_head{
      display: none;
    }
  }
}
</style>
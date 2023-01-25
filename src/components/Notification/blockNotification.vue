<template>
  <div class="block-notification">
    <div class="block-notification-top">
      <div class="flex gap-x-4 items-center">
        <img src="@/assets/icon/public.svg" alt="">
        <h3 class="font-bold grow">Update chính sách Bonus nội bộ</h3>
      </div>
      <div class="flex flex-wrap items-center gap-x-4 block-notification-action">
        <img src="@/assets/icon/edit.svg" alt="" @click="handleEdit">
        <img src="@/assets/icon/delete.svg" alt="" @click="handleDelete">
      </div>
    </div>
    <div class="block-notification-footer flex flex-wrap mt-4 items-center font-medium">
      <div class="block-notification-footer-user flex flex-wrap items-center">
        <el-image class="img-user mr-2" src="@/assets/icon/log111o.svg">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
        Trần Thị Nhung
      </div>
      <div v-click-outside="() => { isListUser = false }" class="flex flex-wrap mx-4">
        <div class="relative mr-2 flex">
          <div @click="openListUser" class="flex">
            <img class="mr-2" src="@/assets/icon/eye.svg" alt=""> 22/40
          </div>
          <div v-if="isListUser" class="absolute top-8 right-0 popup-list-user">
            <div class="popup-list-user-bg  bg-white">
              <div class="flex justify-between items-center pb-4 popup-list-user-bg-title">
                <p class="grow font-semibold">Số người đã xem thông báo</p>
                <p class="flex"><img class="mr-2" src="@/assets/icon/eye.svg" alt=""> 22/40</p>
              </div>
              <div class="mt-6 flex flex-wrap items-center">
                <el-image class="img-user mr-2" src="@/assets/icon/log111o.svg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <p class="font-semibold text-sm"> Trần Thị Nhung</p>
              </div>
              <div class="popup-list-user mt-6 flex flex-wrap items-center">
                <el-image class="img-user mr-2" src="@/assets/icon/log111o.svg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <p class="font-semibold text-sm"> Trần Thị Nhung</p>
              </div>
              <div class="popup-list-user mt-6 flex flex-wrap items-center">
                <el-image class="img-user mr-2" src="@/assets/icon/log111o.svg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <p class="font-semibold text-sm"> Trần Thị Nhung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center"> <img class="mr-2" src="@/assets/icon/calendar.svg" alt="">  20-06-2022   <span class="ml-2">15:23</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlockNotification',
  data() {
    return {
      isListUser: false
    }
  },
  methods: {
    handleEdit() {
      this.$emit('editItem')
    },
    handleDelete() {
      this.$emit('editItem')
    },
    openListUser() {
      this.isListUser = !this.isListUser
    }
  }
}
</script>

<style lang="scss">
</style>

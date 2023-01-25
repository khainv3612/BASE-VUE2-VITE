<template>
  <div>
    <Vue2OrgTree label-class-name="orglabel" name="test" :data="dataProp" :pan="pan" :zoom="zoom"
      :horizontal="horizontal" :collapsable="collapsable" :render-content="renderContent" @on-expand="onExpand"
      @on-node-click="onNodeClick" />
  </div>
</template>

<script>
export default {
  name: 'TreeComponent',
  props: ['dataProp', 'isShow'],
  data() {
    return {
      horizontal: false,
      collapsable: true,
      expandAll: true,
      labelClassName: 'bg-white',
      zoom: true,
      pan: true,
      dependenceForm: {
        originNode: '',
        targetNode: ''
      },
      visible: false,
      deleteDialogVisible: false,
      childVisible: false,
      deleteNode: ''
    }
  },
  watch: {
    isShow() {
      if (this.isShow) {
        setTimeout(() => {
          if (this.dataProp.children.length > 0) {
            [...document.getElementsByClassName('org-tree-node-btn')][0].click()
            this.$emit('show')
          }
        }, 500)
      }
    }
  },
  mounted() {

  },
  methods: {
    renderContent(h, data) {
      const temp = `<div class='rich-media-node'>
          <div class='row_info'>
            <span class='title'>Name:</span>
            <span class='value'>${data.user ? data.user.name : data.name}</span>
          </div>
          <div class='row_info'>
            <span class='title'>Email:</span>
            <span class='value'>${data.user ? data.user.email : ''}</span>
          </div>
        </div>`
      return h('div', {
        domProps: { innerHTML: temp }
      })
    },
    onClick(type, node) {
      this.$message.info('点击事件')
      if (type === 'del') {
        if (node.children && node.children.length > 0) {
          this.$message.info('当前节点存在子部门，请先删除子节点')
          return false
        }
        // this.deleteDialogVisible = true
        this.$refs.deleteDialaog.changeDialogStatus(true)
        this.deleteNode = node.label
      }
      if (type === 'addChild') {
        this.childVisible = true
        this.$refs.childDialog.changeDialogStatus(true)
      }
      // if (keyObj.key === 'del') {
      //   if (node.children && node.children.length > 0) {
      //     this.$message.info('当前部门存在子部门，请先删除子部门')
      //   } else {
      //     this.$http.get('/rdDept/del', { params: { id: node.value } })
      //       .then(res => {
      //         if (res.success && res.data) {
      //           this.$message.success('删除成功')
      //           this.loadTree()
      //         } else {
      //           this.$message.error(res.errorMessage)
      //         }
      //       })
      //   }
      // } else {
      //   this.$refs.modifyDept.showModal(keyObj.key, node)
      // }
    },
    onExpand(e, data) {
      if ('expand' in data) {
        data.expand = !data.expand
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    onNodeClick(e, data) {
      if (data.url == null) {
        return false
      } else {
        window.open(data.url)
      }
    },
    collapse(list) {
      const _this = this
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false
        }
        child.children && _this.collapse(child.children)
      })
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll)
    },
    toggleExpand(data, val) {
      const _this = this
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, 'expand', val)
          if (item.children) {
            _this.toggleExpand(item.children, val)
          }
        })
      } else {
        this.$set(data, 'expand', val)
        if (data.children) {
          _this.toggleExpand(data.children, val)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.tree-container {
  background-color: #fff;
  width: 1100px;
  overflow: auto;
  height: 100%;

  .addBtn {
    margin-left: 1000px;
  }
}
</style>

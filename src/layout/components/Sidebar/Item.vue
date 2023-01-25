<script lang="jsx">
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, badge } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      if (badge) {
        const numBadge = badge < 100 ? badge : '99+'
        vnodes.push(<span slot='title'>{(title)} <span class='badge menu_title_sidebar'>{{ numBadge }}</span></span>)
      } else {
        vnodes.push(<span slot='title' class='menu_title_sidebar'>{(title)}</span>)
      }
    }

    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.badge {
  display: inline-flex;
  width: 25px;
  height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  align-items: center;
  border-radius: 50%;
  padding: 5px;
  font-size: 11px;
  color: #fff;
  background-color: #930606;
}
</style>

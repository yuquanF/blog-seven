import Blog from '@theme/plugins/Blog'
import baiDu from '@theme/plugins/PartyC/baiDu'
import customer from '@theme/plugins/PartyC/customer'
import Translation from '@theme/plugins/Translation'
import '@theme/styles/index.less'
import Mixin from '@theme/utils/mixin'
import routes from '@theme/utils/route'
import 'ant-design-vue/dist/antd.less'
import Ant from 'ant-design-vue/es'
import {
  Alert,
  Button,
  Card,
  Input,
  Loading,
  Message,
  RadioButton,
  RadioGroup,
  Upload,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(routes, { router })
  Vue.use(Mixin)
  Vue.use(Translation)
  Vue.use(Blog)
  customer(router, siteData)
  baiDu(router, siteData)
  Vue.use(Ant)
  Vue.use(Alert)
  Vue.use(Button)
  Vue.use(Input)
  Vue.use(Loading.directive)
  Vue.component(Message.name, Message)
  Vue.use(Upload)
  Vue.use(Card)
  Vue.use(RadioGroup)
  Vue.use(RadioButton)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message
}

if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  console.log('\n%c(づ￣ ³￣)づヾ Author：yuquanfeng%c VuePress Theme - Yur \n', 'color: #fadfa3; background: #030307; padding:5px;', 'background: #fadfa3; padding:5px 0;')
}

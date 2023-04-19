import { createApp } from 'vue'
import App from './app.vue'
import router from '../../routers/inject'
import { Button, Cell, CellGroup } from 'vant'

// 直接加载进来. 这里可能就是需要多个入口了哦.

const app = createApp(App)

console.log('inject script run')

app.use(router)
app.use(Button)
app.use(Cell)
app.use(CellGroup)
app.mount('#qg_container')
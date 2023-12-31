import { createApp } from 'vue';
import {
    Button,
    Card,
    Dropdown,
    Menu,
    Modal,
    Select,
    Input,
    Typography,
    Spin,
    Switch,
    TimePicker,
    DatePicker,
    Tabs,
    Divider,
    Statistic,
    ConfigProvider,
    Carousel,
    Popconfirm,
    Slider,
    Tooltip,
    Checkbox,
    Cascader,
    Table,
    Pagination,
    InputNumber
} from 'ant-design-vue';
import store from '@/store';
import App from '@/App.vue';
import { i18n } from '@/locales';



const app = createApp(App);

app.use(store);
app.use(i18n);

// ant-design-vue components
app.use(Button);
app.use(Card);
app.use(Dropdown);
app.use(Menu);
app.use(Modal);
app.use(Select);
app.use(Input);
app.use(Typography);
app.use(Spin);
app.use(Switch);
app.use(TimePicker);
app.use(DatePicker);
app.use(Tabs);
app.use(Divider);
app.use(Statistic);
app.use(ConfigProvider);
app.use(Carousel);
app.use(Slider);
app.use(Popconfirm);
app.use(Tooltip);
app.use(Checkbox);
app.use(Cascader);
app.use(Table);
app.use(Pagination);
app.use(InputNumber);

app.mount('#app');

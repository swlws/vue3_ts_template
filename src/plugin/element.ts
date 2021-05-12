import { App } from "vue";
import "element-plus/packages/theme-chalk/src/base.scss";

import lang from "element-plus/lib/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale";

// 设置语言
locale.use(lang);

import {
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  // ElCalendar,
  ElCard,
  // ElCarousel,
  // ElCarouselItem,
  // ElCascader,
  // ElCascaderPanel,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  // ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElColorPicker,
  // ElContainer,
  ElDatePicker,
  ElDialog,
  // ElDivider,
  // ElDrawer,
  // ElDropdown,
  // ElDropdownItem,
  // ElDropdownMenu,
  // ElFooter,
  ElForm,
  ElFormItem,
  // ElHeader,
  ElIcon,
  // ElImage,
  ElInput,
  ElInputNumber,
  ElLink,
  // ElMain,
  // ElMenu,
  // ElMenuItem,
  // ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElProgress,
  // ElRadio,
  // ElRadioButton,
  // ElRadioGroup,
  // ElRate,
  // ElRow,
  ElScrollbar,
  ElSelect,
  // ElSlider,
  // ElStep,
  // ElSteps,
  // ElSubmenu,
  ElSwitch,
  // ElTabPane,
  ElTable,
  ElTableColumn,
  // ElTabs,
  ElTag,
  ElTimePicker,
  ElTimeSelect,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  // ElTransfer,
  ElTree,
  ElUpload,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from "element-plus";

const components = [
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  // ElCalendar,
  ElCard,
  // ElCarousel,
  // ElCarouselItem,
  // ElCascader,
  // ElCascaderPanel,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  // ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElColorPicker,
  // ElContainer,
  ElDatePicker,
  ElDialog,
  // ElDivider,
  // ElDrawer,
  // ElDropdown,
  // ElDropdownItem,
  // ElDropdownMenu,
  // ElFooter,
  ElForm,
  ElFormItem,
  // ElHeader,
  ElIcon,
  // ElImage,
  ElInput,
  ElInputNumber,
  ElLink,
  // ElMain,
  // ElMenu,
  // ElMenuItem,
  // ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElProgress,
  // ElRadio,
  // ElRadioButton,
  // ElRadioGroup,
  // ElRate,
  // ElRow,
  ElScrollbar,
  ElSelect,
  // ElSlider,
  // ElStep,
  // ElSteps,
  // ElSubmenu,
  ElSwitch,
  // ElTabPane,
  ElTable,
  ElTableColumn,
  // ElTabs,
  ElTag,
  ElTimePicker,
  ElTimeSelect,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  // ElTransfer,
  ElTree,
  ElUpload,
];

const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
];

export default function install(app: App) {
  components.forEach((component) => {
    app.component(component.name, component);
  });

  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}
